import { t, t2 } from '@fe/element-sp-ui/src/locale';

export default {
  methods: {
    t(...args) {
      return t.apply(this, args);
    },
    t2(path) {
      return t2(path);
    }
  }
};
