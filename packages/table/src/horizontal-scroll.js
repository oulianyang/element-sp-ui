import LayoutObserver from './layout-observer';
import { mapStates } from './store/helper';

const getAllColumns = (columns) => {
  const result = [];
  columns.forEach((column) => {
    if (column.children) {
      result.push(column);
      result.push.apply(result, getAllColumns(column.children));
    } else {
      result.push(column);
    }
  });
  return result;
};

const convertToRows = (originColumns) => {
  let maxLevel = 1;
  const traverse = (column, parent) => {
    if (parent) {
      column.level = parent.level + 1;
      if (maxLevel < column.level) {
        maxLevel = column.level;
      }
    }
    if (column.children) {
      let colSpan = 0;
      column.children.forEach((subColumn) => {
        traverse(subColumn, column);
        colSpan += subColumn.colSpan;
      });
      column.colSpan = colSpan;
    } else {
      column.colSpan = 1;
    }
  };

  originColumns.forEach((column) => {
    column.level = 1;
    traverse(column);
  });

  const rows = [];
  for (let i = 0; i < maxLevel; i++) {
    rows.push([]);
  }

  const allColumns = getAllColumns(originColumns);

  allColumns.forEach((column) => {
    if (!column.children) {
      column.rowSpan = maxLevel - column.level + 1;
    } else {
      column.rowSpan = 1;
    }
    rows[column.level - 1].push(column);
  });

  return rows;
};

export default {
  name: 'ElTableHorizontalScroll',

  mixins: [LayoutObserver],

  render(h) {
    const originColumns = this.store.states.originColumns;
    const columnRows = convertToRows(originColumns, this.columns);
    return (
      <table
        class="sp-table__horizontal"
        cellspacing="0"
        cellpadding="0"
        border="0">
        <colgroup>
          {
            this.columns.map(column => <col name={ column.id } key={column.id} />)
          }
          {
            this.hasGutter ? <col name="gutter" /> : ''
          }
        </colgroup>
        <tbody class={ [{'has-gutter': this.hasGutter }] }>
          {
            this._l(columnRows, (columns, rowIndex) =>
              <tr>
                {
                  columns.map((column, cellIndex) => (<td
                    colspan={ column.colSpan }
                    rowspan={ column.rowSpan }
                    key={ column.id }>

                  </td>))
                }
                {
                  this.hasGutter ? <td class="sp-table__cell gutter"></td> : ''
                }
              </tr>
            )
          }
        </tbody>
      </table>
    );
  },

  props: {
    fixed: String,
    store: {
      required: true
    },
    border: Boolean
  },

  computed: {
    table() {
      return this.$parent;
    },

    hasGutter() {
      return !this.fixed && this.tableLayout.gutterWidth;
    },

    ...mapStates({
      columns: 'columns'
    })
  },

  created() {
  },

  beforeDestroy() {
  },

  data() {
    return {
    };
  }
};
