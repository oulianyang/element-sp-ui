<template>
  <!-- <Popover
    class="sp-input-search"
    placement="bottom"
    trigger="manual"
    width="200"
    v-model="visible"
  >
    <div slot="reference" class="sp-input-search__reference">
      <template v-if="trigger==='manual'">
        <slot v-if="'options' in $slots" name="options" />
        <Select v-else v-model="option">
          <Option
            v-for="(o,i) in options"
            :key="i"
            :label="o[selectLabelKey]"
            :value="o[selectValueKey]"
          />
        </Select>
      </template>
      <Input :placeholder="placeholder" v-model="model" @focus="focused=true" @blur="focused=false">
        <i slot="prefix" v-if="trigger==='auto'" class="sp-input-search__icon sp-icon-search" />
      </Input>
      <template v-if="trigger==='manual'">
        <iv-if="trigger==='auto'" class="sp-input-search__icon sp-icon-search" />
      </template>
    </div>
    <slot />
  </Popover> -->
  <Autocomplete ref="autocomplete" :class="['sp-input-search',`is-${trigger}`]" :popper-class="popperClass" :placeholder="placeholder" :fetch-suggestions="onFetchSuggestions" :clearable="clearable" v-bind="$attrs" v-model="model" @focus="onFocus()" @blur="focused=false">
    <i slot="prefix" v-if="trigger==='auto'" class="sp-input-search__icon sp-icon-search" />
    <Select slot="prepend" v-else-if="trigger==='manual'&&selectOptions.length" :placeholder="selectPlaceholder" v-model="selectModel">
      <Option
        v-for="(o,i) in selectOptions"
        :key="i"
        :label="o[selectLabelKey]"
        :value="o[selectValueKey]"
      />
    </Select>
    <template slot="append" v-if="trigger==='manual'">
      <i class="sp-input-search__icon sp-icon-search" :text="searchText" @click.stop="onSearch()"/>
    </template>
    <template slot-scope="{item}"> 
      <div class="sp-input-search__item">
        <slot :item="item">{{item.value}}</slot>
        <span v-if="trigger==='manual'" class="sp-input-search__remove" @click.stop="onRemoveHistory(item)">╳</span> 
      </div>
      <!-- 最后一项 -->
      <template v-if="item===lastItem">
        <div v-if="trigger==='auto'&&fetchLoading" class="sp-input-search__loading">
          <i class="sp-icon-loading" :loading-text="loadingText"/>
        </div>
        <div v-if="trigger==='manual'" class="sp-input-search__clear" @click.stop>
          <Button v-if="$children.length" type="text" @click="onClearHistory()">{{clearText}}</Button>
        </div>
      </template>
    </template>
  </Autocomplete>
</template>

<script>
import Locale from '../../../src/mixins/locale';

import Popover from '../../popover';
import Input from '../../input';
import Button from '../../button';
import Select from '../../select';
import Option from '../../select/src/option';
import Autocomplete from '../../autocomplete';

export default {
  name: 'ElInputSearch',

  components: { Popover, Input, Button, Select, Option, Autocomplete },

  mixins: [Locale],

  props: {
    value: {
      type: String,
      default: ''
    },
    trigger: {
      type: String,
      default: 'auto',
      validator(value) {
        return (
          ['auto', 'manual'].includes(value) ||
          console.warn('搜索框触发类型只能是 “auto” 或 “manual”') ||
          false
        );
      }
    },
    placeholder: {
      type: String,
      default: '搜索'
    },
    selectPlaceholder: {
      type: String,
      default: '请选择'
    },
    selectOptions: {
      type: Array,
      default: () => []
    },
    selectLabelKey: {
      type: String,
      default: 'label'
    },
    selectValueKey: {
      type: String,
      default: 'value'
    },
    selectValue: {
      type: [Number, String],
      default: null
    },
    searchText: {
      type: String,
      default: null
    },
    clearable: {
      type: Boolean,
      default: true
    },
    clearText: {
      type: String,
      default: Locale.methods.t('el.inputSearch.clear')
    },
    historyPrefix: {
      type: String,
      default: 'search-history:'
    },
    historyKey: {
      type: String,
      default: () => location.pathname
    },
    showHistory: {
      type: Boolean,
      default: false
    },
    loadingText: {
      type: String,
      default: Locale.methods.t('el.inputSearch.loading')
    }
  },

  data() {
    return {
      focused: false,
      fetchIndex: 0,
      fetchLoading: false,
      historyItems: []
    };
  },

  computed: {
    model: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      }
    },
    selectModel: {
      get() {
        return this.selectValue;
      },
      set(value) {
        const changed = value !== this.selectValue;
        this.$emit('update:selectValue', value);
        if (changed) this.$emit('option-change', value);
      }
    },
    visible() {
      return this.focused;
    },
    lastItem() {
      const { suggestions } = this.$refs.autocomplete;
      return suggestions[suggestions.length - 1];
    },
    popperClass() {
      return ['sp-input-search__popper', `is-${this.trigger}`].join(' ').trim().replace(/\s{2,}/, ' ');
    }
  },

  mounted() {
    this.initHistory();
  },

  methods: {
    initHistory() {
      if (!this.showHistory) {
        return;
      }
      if (this.trigger === 'auto') {
        const $suggestions = document.getElementById(this.$refs.autocomplete.id);
        if ($suggestions) {
          $suggestions.parentNode.addEventListener('scroll', (e) => {
            if (!this.fetchLoading) {
              const { offsetHeight, scrollHeight, scrollTop } = e.target;
              const style = window.getComputedStyle(e.target);
              const marginHeight = parseFloat(style.marginTop) + parseFloat(style.marginBottom);
              if (scrollTop + marginHeight >= scrollHeight - offsetHeight) {
                this.fetchLoading = true;
                e.target.scrollTop = scrollHeight - offsetHeight - marginHeight - 2;
                const done = (list) => {
                  if (list && list.length) {
                    const { suggestions } = this.$refs.autocomplete;
                    suggestions.push(...list);
                    this.fetchIndex++;
                  }
                  this.fetchLoading = false;
                };
                try {
                  const result = this.$listeners.fetch ? this.$listeners.fetch(this.value, this.fetchIndex) : [];
                  result instanceof window.Promise ? result.then(done) : done(result);
                } catch (error) {
                  done([]);
                }
              }
            }
          });
        }
      } else if (this.trigger === 'manual') {
        this.onLoadHistory();
      }
    },
    onFocus() {
      this.focused = true;
      this.fetchIndex = 0;
      this.onLoadHistory();
    },
    onSearch() {
      this.$refs.autocomplete.close();
      this.$emit('search', this.value);
      if (this.value.trim()) this.onAddHistory({ value: this.value });
    },
    onFetchSuggestions(queryString, callback) {
      if (!this.showHistory) { // 搜索历史不显示
        return callback([]);
      }
      ({
        auto() {
          try {
            const result = this.$listeners.fetch ? this.$listeners.fetch(queryString, this.fetchIndex = 0) : [];
            const done = (list) => {
              callback(list);
              this.fetchIndex++;
            };
            result instanceof window.Promise ? result.then(done) : done(result);
          } catch (error) {
            callback([]);
          }
        },
        manual() {
          callback(this.historyItems);
        }
      }[this.trigger] || (() => {})).bind(this)();
    },
    onLoadHistory() {
      this.historyItems = JSON.parse(localStorage.getItem(`${this.historyPrefix}${this.historyKey}`) || '[]');
    },
    onUpdateHistory() {
      try {
        localStorage.setItem(`${this.historyPrefix}${this.historyKey}`, JSON.stringify(this.historyItems));
      } catch (error) { }
    },
    onAddHistory(item) {
      const index = this.historyItems.findIndex(o => o.value === item.value);
      if (index === -1) {
        this.historyItems.unshift(item);
      } else {
        const item = this.historyItems.splice(index, 1)[0];
        item && this.historyItems.unshift(item);
      }
      this.onUpdateHistory();
    },
    onRemoveHistory(item) {
      const index = this.historyItems.findIndex(o => o.value === item.value);
      index === -1 || this.historyItems.splice(index, 1);
      this.onUpdateHistory();
    },
    onClearHistory() {
      this.historyItems.splice(0, this.historyItems.length);
      this.onUpdateHistory();
    }
  }
};
</script>
