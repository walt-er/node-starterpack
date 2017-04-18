// Declaritive code to run on DOM load
const onPageLoad = () => {

	let message = 'Loaded!!!';
	console.log(message);

};

// Wait for page to load before running JS
window.onload = onPageLoad; 