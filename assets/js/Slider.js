import { tns } from 'tiny-slider/src/tiny-slider';

class Slider {
	constructor(){
		if (!document.querySelector('.slider-container')) 
			return null; 
		
		const slider = tns({
		    container: '.slider-container',
		    items: 1,
		    mouseDrag: true,
		    autoplay: true,
		    controls: true,
		    nav: true,
		    navPosition: 'bottom',
		    autoplayButtonOutput: false,
		    prevButton: '.slider-prev',
		    nextButton: '.slider-next'
		});
	}
}

export default Slider;