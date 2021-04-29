import { slideToggle, slideUp } from './helpers/animation.js';

class HeaderTab {
	constructor() {
		this.tabs = document.querySelectorAll('[data-header-tab]');
		this.dropdowns = document.querySelectorAll('.header-dropdown');
		this.addListener();
	}

	addListener() {
		this.tabs.forEach(tab => {
			tab.addEventListener('click', () => {
				const targetTab = document.querySelector(tab.getAttribute('data-header-tab'));
				slideToggle(targetTab);
				tab.classList.toggle('active');
				this.toggleActive(tab);
				this.closeAllDropdowns(targetTab);
			});
		})
	}

	closeAllDropdowns(exceptionNode) {
		this.dropdowns.forEach(el => !el.isSameNode(exceptionNode) ? slideUp(el) : null);
	}

	toggleActive(exceptionNode) {
		this.tabs.forEach(tab => !tab.isSameNode(exceptionNode) ? tab.classList.remove('active') : null);
	}
}

export default HeaderTab;