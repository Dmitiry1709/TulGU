import { slideToggle, slideUp } from './helpers/animation.js';

class Navigation {
	constructor() {
		this.element = document.querySelector('.navigation');
		this.triggers = document.querySelectorAll('[data-navigation-toggle]')
		this.addListener();
	}

	addListener() {
		this.triggers.forEach(el => {
			el.addEventListener('click', () => {
				slideToggle(this.element);
			});
		})
		document.addEventListener('keyup', (e) => {
			if (this.element.style.display == 'block' && e.keyCode == 27)
				slideToggle(this.element);
		})
	}
}

export default Navigation;