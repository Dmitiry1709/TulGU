import { slideToggle, slideUp } from './helpers/animation.js';

class NavigationAccordion {
	constructor() {
		this.elements = document.querySelectorAll('.navigation-accordion');
		this.addListener();
	}

	addListener() {
		this.elements.forEach(el => {
			el.addEventListener('click', () => {
				slideToggle(el.querySelector('.navigation-accordion-content'));
				el.classList.toggle('active');
				this.closeAllAccordions(el);
			});
		})
	}

	closeAllAccordions(exceptionNode) {
		this.elements.forEach(el => !el.isSameNode(exceptionNode) ? slideUp(el.querySelector('.navigation-accordion-content')) : null);
	}
}

export default NavigationAccordion;