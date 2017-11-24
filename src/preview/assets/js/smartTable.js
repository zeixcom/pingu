export default class SmartTable {
  /**
   * Creates an instance of SmartTable.
   * @param {node} el the smartTable node
   * @memberof SmartTable
   */
  constructor(el) {
    this.el = el;

    this.init();
    this.initListeners();
  }

  /**
   * init all the options, classes and node referenzes
   *
   * @memberof SmartTable
   */
  init() {
    this.options = {};

    this.classes = {
      dom: {
        searchInput: 'pew_smart-table__search-input',
        table: 'pew_smart-table__table',
        tableBody: 'pew_smart-table__body',
        sortTrigger: 'pew_smart-table__sort-trigger',
        sortKey: 'pew_smart-table__sort-value',
      },
      state: {
        sortTriggerUp: 'pew_smart-table__sort-trigger--up',
        sortTriggerDown: 'pew_smart-table__sort-trigger--down',
      },
    };

    this.nodes = {
      searchInput: this.el.querySelector(`.${this.classes.dom.searchInput}`),
      tableBody: this.el.querySelector(`.${this.classes.dom.tableBody}`),
      sortTriggers: this.el.querySelectorAll(`.${this.classes.dom.sortTrigger}`),
    };
  }

  /**
   * init all the event listeners
   *
   * @memberof SmartTable
   */
  initListeners() {
    this.nodes.searchInput.addEventListener('keyup', (e) => {
      e.preventDefault();
      this.searchEntries(e.target.value.toLowerCase());
    });

    this.nodes.sortTriggers.forEach((sortTrigger) => {
      sortTrigger.addEventListener('click', (e) => {
        e.preventDefault();
        const cellIndex = sortTrigger.parentElement.cellIndex;
        const sortDown = sortTrigger.classList.contains(this.classes.state.sortTriggerDown);

        this.nodes.sortTriggers.forEach((trigger, index) => {
          if (index === cellIndex) return;
          trigger.classList.remove(
            this.classes.state.sortTriggerDown,
            this.classes.state.sortTriggerUp,
          );
        });

        sortTrigger.classList
          .add(sortDown ? this.classes.state.sortTriggerUp : this.classes.state.sortTriggerDown)
          .remove(sortDown ? this.classes.state.sortTriggerDown : this.classes.state.sortTriggerUp);

        this.sortEntries(cellIndex, sortDown);
      });
    });
  }

  sortEntries(column, isReverse) {
    const rows = [...this.nodes.tableBody.rows].slice(0);
    const reverse = -((+isReverse) || -1);

    rows.sort((a, b) => reverse * (a.cells[column].textContent.trim().localeCompare(b.cells[column].textContent.trim()))); // eslint-disable-line

    rows.forEach(row => this.nodes.tableBody.appendChild(row));
  }

  /**
   *
   *
   * @param {any} searchString
   * @memberof SmartTable
   */
  searchEntries(searchString) {
    [...this.nodes.tableBody.rows].forEach((row) => {
      const node = row;
      const name = row.innerHTML.replace(/(<([^>]+)>)/ig, ' ');
      node.style.display = new RegExp(searchString, 'g').test(name.toLowerCase()) ? '' : 'none';
    });
  }
}
