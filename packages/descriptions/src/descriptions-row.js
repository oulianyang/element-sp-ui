import ElTooltip from '@fe/element-sp-ui/packages/tooltip';

export default {
  name: 'ElDescriptionsRow',
  props: {
    row: {
      type: Array
    }
  },
  inject: ['elDescriptions'],
  components: {
    tdDefault: {
      props: {
        item: Object
      },
      components: {
        ElTooltip
      },
      data() {
        return {
          contentUnfold: false, // 是否展开
          hasViewHiden: false // 当前视图未显示完全
        };
      },
      computed: {
        maxRow() {
          return this.item.props.maxRow === undefined ? this.elDescriptions.maxRow : this.item.props.maxRow;
        },
        showTooltip() {
          return this.item.props.showTooltip === undefined ? this.elDescriptions.showTooltip : this.item.props.showTooltip;
        },
        rowHeight() {
          return this.item.props.rowHeight === undefined ? this.elDescriptions.rowHeight : this.item.props.rowHeight;
        },
        showUnFold() {
          return this.item.props.showUnFold === undefined ? this.elDescriptions.showUnFold : this.item.props.showUnFold;
        },
        tipAutoOverFlowShow() {
          return this.item.props.tipAutoOverFlowShow === undefined ? this.elDescriptions.tipAutoOverFlowShow : this.item.props.tipAutoOverFlowShow;
        }
      },
      inject: ['elDescriptions'],
      mounted() {
        this.updateViewHiden();
      },
      methods: {
        updateViewHiden() {
          if (this.maxRow) {this.hasViewHiden = this.$refs.content.scrollHeight > this.$refs.content.clientHeight;}
        },
        inlineStyle() {
          let contentStyle = {
          };
          if (this.maxRow && !this.contentUnfold) {
            contentStyle = { ...contentStyle, 'max-height': `${this.rowHeight * this.maxRow}px` };
          }

          return contentStyle;
        }
      },
      render() {
        const { elDescriptions, item } = this;
        return (
          <td class={[
            'sp-descriptions-item', 'sp-descriptions-item__cell',
            {
              'sp-descriptions-item__content-unfolld': this.contentUnfold,
              'sp-descriptions-item__show-fold': this.showUnFold
            }
          ]} colSpan={item.props.span}>
            <div class="sp-descriptions-item__container">
              <span
                class={{
                  'sp-descriptions-item__label': true,
                  'has-colon': elDescriptions.colon,
                  [item.labelClassName]: true
                }}
                style={item.labelStyle}
              >{item.label}</span>
              <el-tooltip disabled={!this.showTooltip} autoOverflowShow={this.tipAutoOverFlowShow} content={ item.slots.default }>
                <span
                  ref="content"
                  class={['sp-descriptions-item__content', item.contentClassName]}
                  style={{
                    ...this.inlineStyle(),
                    ...item.contentStyle
                  }}
                >
                  {item.slots.default}
                  {
                    this.maxRow && this.hasViewHiden
                      ? this.contentUnfold
                        ? (
                          <span class="sp-descriptions-item__unfold">
                            <span class="sp-descriptions-item__unfold-btn" {...{
                              on: {
                                click: () => {
                                  this.contentUnfold = false;
                                }
                              }
                            }}>[收起]</span>
                          </span>
                        )
                        : (
                          <span class="sp-descriptions-item__unfold">...
                          {this.showUnFold && (<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>)}
                          {
                            this.showUnFold && (
                              <span class="sp-descriptions-item__unfold-btn" {...{
                                on: {
                                  click: () => {
                                    this.contentUnfold = true;
                                  }
                                }
                              }}
                              >[展开]</span>
                            )

                          }
                          </span>
                        )
                      : ''
                  }
                </span>
              </el-tooltip>

            </div>
          </td>
        );
      }
    }
  },
  render(h) {
    const { elDescriptions } = this;
    const row = (this.row || []).map(item => {
      return {
        ...item,
        label: item.slots.label || item.props.label,
        ...['labelClassName', 'contentClassName', 'labelStyle', 'contentStyle'].reduce((res, key) => {
          res[key] = item.props[key] || elDescriptions[key];
          return res;
        }, {})
      };
    });
    if (elDescriptions.direction === 'vertical') {
      return (
        <tbody>
          <tr class="sp-descriptions-row">
            {
              row.map(item => {
                return (
                  <th
                    class={{
                      'sp-descriptions-item__cell': true,
                      'sp-descriptions-item__label': true,
                      'has-colon': elDescriptions.border ? false : elDescriptions.colon,
                      'is-bordered-label': elDescriptions.border,
                      [item.labelClassName]: true
                    }}
                    style={item.labelStyle}
                    colSpan={item.props.span}
                  >{item.label}</th>
                );
              })
            }
          </tr>
          <tr class="sp-descriptions-row">
            {
              row.map(item =>{
                return (
                  <td
                    class={['sp-descriptions-item__cell', 'sp-descriptions-item__content', item.contentClassName]}
                    style={item.contentStyle}
                    colSpan={item.props.span}
                  >{item.slots.default}</td>
                );
              })
            }
          </tr>
        </tbody>
      );
    }
    if (elDescriptions.border) {
      return (
        <tbody>
          <tr class="sp-descriptions-row">
            {
              row.map(item=> {
                return ([
                  <th
                    class={{
                      'sp-descriptions-item__cell': true,
                      'sp-descriptions-item__label': true,
                      'is-bordered-label': elDescriptions.border,
                      [item.labelClassName]: true
                    }}
                    style={item.labelStyle}
                    colSpan="1"
                  >{item.label}</th>,
                  <td
                    class={['sp-descriptions-item__cell', 'sp-descriptions-item__content', item.contentClassName]}
                    style={item.contentStyle}
                    colSpan={item.props.span * 2 - 1}
                  >{item.slots.default}</td>
                ]);
              })
            }
          </tr>
        </tbody>
      );
    }
    return (
      <tbody>
        <tr class="sp-descriptions-row">
          {
            row.map(item => {
              return (<td-default {
                ...{
                  props: {
                    item
                  }
                }
                }></td-default>);
            })
          }
        </tr>
      </tbody>
    );
  }
};
