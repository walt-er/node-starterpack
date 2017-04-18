import logSomething from './other';

// Declaritive code to run on DOM load
const onPageLoad = () => {

	const dinner = 'Dinner';
	logSomething( dinner );

};

// Wait for page to load before running JS
window.onload = onPageLoad; 