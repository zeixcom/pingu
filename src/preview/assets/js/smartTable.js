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
        filterInput: 'pew_smart-table__filter-input',
        table: 'pew_smart-table__table',
        tableBody: 'pew_smart-table__body',
        sortTrigger: 'pew_smart-table__sort-trigger',
        sortKey: 'pew_smart-table__sort-value',
        resetFilterTrigger: 'pew_smart-table__filter-reset-trigger',
      },
      state: {
        sortTriggerUp: 'pew_smart-table__sort-trigger--up',
        sortTriggerDown: 'pew_smart-table__sort-trigger--down',
        filterActive: 'pew_smart-table__filter--active',
      },
    };

    this.nodes = {
      filterInput: this.el.querySelector(`.${this.classes.dom.filterInput}`),
      tableBody: this.el.querySelector(`.${this.classes.dom.tableBody}`),
      sortTriggers: this.el.querySelectorAll(`.${this.classes.dom.sortTrigger}`),
      resetFilterTrigger: this.el.querySelector(`.${this.classes.dom.resetFilterTrigger}`),
    };
  }

  /**
   * init all the event listeners
   *
   * @memberof SmartTable
   */
  initListeners() {
    this.nodes.filterInput.addEventListener('keyup', (e) => {
      e.preventDefault();

      const filterContainer = this.nodes.filterInput.parentElement;

      if (e.keyCode === 27) this.resetFilter();

      if (e.target.value.trim() !== '') filterContainer.classList.add(this.classes.state.filterActive);
      else filterContainer.classList.remove(this.classes.state.filterActive);

      this.filterEntries(e.target.value.toLowerCase());
    });

    this.nodes.resetFilterTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      this.resetFilter();
      this.filterEntries();
    });

    this.nodes.sortTriggers.forEach((sortTrigger) => {
      sortTrigger.addEventListener('click', (e) => {
        e.preventDefault();
        const cellIndex = sortTrigger.parentElement.cellIndex;
        const sortDown = sortTrigger.classList.contains(this.classes.state.sortTriggerDown);

        this.resetSort(cellIndex);

        sortTrigger.classList
          .add(sortDown ? this.classes.state.sortTriggerUp : this.classes.state.sortTriggerDown);
        sortTrigger.classList
          .remove(sortDown ? this.classes.state.sortTriggerDown : this.classes.state.sortTriggerUp);

        this.sortEntries(cellIndex, sortDown);
      });
    });
  }

  /**
   * to sort the entries
   *
   * @param {number} column
   * @param {boolean} isReverse
   * @memberof SmartTable
   */
  sortEntries(column, isReverse) {
    const rows = [...this.nodes.tableBody.rows].slice(0);
    const reverse = -((+isReverse) || -1);

    rows.sort((a, b) => reverse * (a.cells[column].textContent.trim().localeCompare(b.cells[column].textContent.trim()))); // eslint-disable-line

    rows.forEach(row => this.nodes.tableBody.appendChild(row));
  }

  /**
   * to remove all the sort classes from the column
   *
   * @param {number} column
   * @memberof SmartTable
   */
  resetSort(column) {
    this.nodes.sortTriggers.forEach((trigger, index) => {
      if (index === column) return;
      trigger.classList.remove(
        this.classes.state.sortTriggerDown,
        this.classes.state.sortTriggerUp,
      );
    });
  }

  /**
   * to filter the entries
   *
   * @param {string} filterString
   * @memberof SmartTable
   */
  filterEntries(filterString) {
    [...this.nodes.tableBody.rows].forEach((row) => {
      const node = row;
      const name = row.innerHTML.replace(/(<([^>]+)>)/ig, ' ');
      node.style.display = new RegExp(filterString, 'g').test(name.toLowerCase()) ? '' : 'none';
    });
  }

  /**
   * to reset the filter value
   *
   * @memberof SmartTable
   */
  resetFilter() {
    this.nodes.filterInput.parentElement.classList.remove(this.classes.state.filterActive);
    this.nodes.filterInput.value = '';
  }
}
