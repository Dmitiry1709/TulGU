import { slideToggle, slideUp } from './helpers/animation.js';

class EventBox {
	constructor() {
		this.images = document.querySelectorAll('.event-box-bg');
		this.addListener();
	}

	addListener() {
		this.images.forEach(el => {
			el.parentNode.classList.add('text-white');
		})
	}
}

export default EventBox;