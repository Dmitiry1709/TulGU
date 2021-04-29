import Tooltip from 'tooltip.js';
import Popper from 'popper.js';
import IMask from 'imask';
import moment from 'moment';
// import { slideUp, slideDown, slideToggle, toggle, fadeOut } from './helpers/animation.js';
// import { getNextElements, togglePlusIcon } from './helpers/common.js';
import objectFitImages from 'object-fit-images';


/**
 * DOM manipulation and actions.
 */
class DomActions {
	constructor(){
		this.getElements('.header-top-link', this.headerTopNavigation);
		this.getElements('[data-tooltip]', this.dataTooltip);
		this.getElements('[data-popover-placement]', this.dataPopover);
		this.getElements('[data-mask]', this.dataMask);
		this.getElements('[data-mask-date]', this.dataMaskDate);
		this.getElements('[data-dropdown]', this.dataDropdown);
		this.getElements('a[href="#"]', this.preventEmptyLinkAction);

		objectFitImages();
	}

	/**
	 * Wrapper function for getting elements by CSS and apply callback (optional);
	 * 
	 * @param  {string}   selector  CSS selector
	 * @param  {Function} callback  Callback function
	 * @return {mixed}            
	 */
	getElements(selector, callback) {
		const elements = document.querySelectorAll(selector);

		return elements.forEach(element => callback(element, elements));
	}

	/**
	 * Showing tooltip around blocks (using tooltip.js).
	 * 
	 * Place your text into [data-tooltip] attribute in DOM element (top placement using
	 * by default). You can also use [data-tooltip-placement] attribute to change tooltip placement.
	 *
	 * For example: <button data-tooltip="Great tooltip" data-tooltip-pacement="right">Button</button>
	 * 
	 * @param  {Object}  element  Node
	 * @return {void}
	 */
	dataTooltip(element) {
		new Tooltip(element, {
			placement: element.getAttribute('data-tooltip-placement') || 'top',
			title: element.getAttribute('data-tooltip')
		})
	}

	/**
	 * Showing popover after block with [data-tooltip-placement] attribute (using popper.js).
	 *
	 * Add new element with [data-tooltip-placement] attribute, 
	 * then place <div class="popover">...</div> after the first.
	 *
	 * For example: 
	 * <button data-popover-placement="top">Button</button>
	 * <div class="popover">...</div>
	 * 
	 * @param  {Object}  element  Node
	 * @return {void}
	 */
	dataPopover(element) {
		element.addEventListener('click', (e) => {
			const popover = element.nextElementSibling;

			if(!popover || !popover.classList.contains('popover'))
				return false;

			hideAllPopovers()
				.then(() => {
					// Showing popover.
					new Popper(element, popover, {
						placement: element.getAttribute('data-popover-placement') || 'top'
					});
					popover.style.display = 'block';

					// Hiding popover
					popover.querySelector('[data-popover-dismiss]').addEventListener('click', () => {
						return element.getAttribute('data-popover-once') !== null
							? popover.remove()
							: popover.style.display = 'none';
					})
				});
		});

		const hideAllPopovers = () => {
			return new Promise((resolve, reject) => {
				document.querySelectorAll('.popover').forEach(el => el.style.display = 'none');
				resolve();
			})
		}

		// Hiding by Escape
		document.addEventListener('keyup', e => e.keyCode === 27 ? hideAll() : null);
	}

	headerTopNavigation(element, elements) {
		element.addEventListener('click', e => {
			// elements.forEach(el => el.classList.remove('active'));
			const submenu = element.nextElementSibling;
			if (submenu.classList.contains('header-top-submenu'))
				element.classList.toggle('active')
		})
	}

	/**
	 * Handler for dropdown menus
	 * 
	 * @param  {Object} element Node
	 * @return {mixed}
	 */
	dataDropdown(element) {
		// element.addEventListener('click', (event) => {
		// 	const dropdown = element.nextElementSibling;

		// 	if(!dropdown || !dropdown.classList.contains('dropdown-menu') || dropdown.style.display == 'block')
		// 		return false;

		// 	hideAllDropdowns()
		// 		.then(() => {
		// 			new Popper(element, dropdown, {
		// 				placement: 'bottom'
		// 			});
		// 			toggle(dropdown, 0);
		// 		})
		// })

		// const hideAllDropdowns = () => {
		// 	return new Promise((resolve, reject) => {
		// 		document.addEventListener('click', () => {
		// 			document.querySelectorAll('.dropdown-menu').forEach(el => {
		// 				el.style.display = 'none';
		// 			});
		// 			resolve();
		// 		})
		// 	})
		// }
	}

	/**
	 * Mask for input's.
	 * 
	 * Read more about IMask plugin: 
	 * https://unmanner.github.io/imaskjs/
	 * 
	 * @param  {Object} element Node
	 * @return {void}
	 */
	dataMask(element) {
		const maskPattern = element.getAttribute('data-mask');
		const mask = new IMask(element, {
			mask: maskPattern
		});
	}

	/**
	 * Date mask for input's.
	 * 
	 * Read more about IMask plugin: 
	 * https://unmanner.github.io/imaskjs/
	 * 
	 * @param  {Object} element Node
	 * @return {void}
	 */
	dataMaskDate(element) {
		const maskPattern = element.getAttribute('data-mask-date');
		const mask = new IMask(element, {
			mask: Date,
			pattern: maskPattern,
			lazy: false,
			min: new Date(1900, 0, 1),
			max: new Date(2100, 0, 1),
			format: date => moment(date).format(maskPattern),
			parse: str => moment(str, maskPattern),
			blocks: {
				YYYY: {
					mask: IMask.MaskedRange,
					from: 1970,
					to: 2030
				},
				MM: {
					mask: IMask.MaskedRange,
					from: 1,
					to: 12
				},
				DD: {
					mask: IMask.MaskedRange,
					from: 1,
					to: 31
				},
				HH: {
					mask: IMask.MaskedRange,
					from: 0,
					to: 23
				},
				mm: {
					mask: IMask.MaskedRange,
					from: 0,
					to: 59
				},
				ss: {
					mask: IMask.MaskedRange,
					from: 0,
					to: 59
				}
			}
		});
	}

	/**
	 * Prevent event on empty link.
	 * For example: <a href="#">Link</a>
	 * 
	 * @param  {Object} element DOM node
	 * @return {void}
	 */
	preventEmptyLinkAction(element) {
		element.addEventListener('click', e => e.preventDefault());
	}
}

export default DomActions;