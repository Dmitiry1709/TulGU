import { getNextElements } from './helpers/common.js';

class Table {
	constructor() {
		this.tables = document.querySelectorAll('.table');
		this._format();
	}

	_format() {
		this.tables.forEach(table => {
			const head = table.querySelector('.table-head');
			const headItems = head.querySelectorAll('.table-row-item');
			const rows = [];
			getNextElements(head, row => {
				if (row.classList.contains('table-row')) 
					rows.push(row);
			});

			rows.forEach(row => {
				row.querySelectorAll('.table-row-item').forEach((item, i) => {
					item.className = headItems[i].classList.value;
				})
			})

		})
	}
}

export default Table;