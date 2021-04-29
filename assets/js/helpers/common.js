/**
 * Toggle icons.
 * 
 * @param  {Object} node FontAwesome icon
 * @return {void}
 */
export const togglePlusIcon = (node) =>{
	if (!node)
		return null;

	if (node.classList.contains('fa-minus')) {
		node.classList.remove('fa-minus');
		node.classList.add('fa-plus');
	} else if (node.classList.contains('fa-plus')) {
		node.classList.add('fa-minus');
		node.classList.remove('fa-plus');
	}
}

/**
 * A recursive method for getting next elements and apply callback.
 * 
 * @param  {Object}   node     
 * @param  {Function} callback 
 * @return {void}
 */
export const getNextElements = (node, callback) => {
	if (node.nextElementSibling){
		callback(node.nextElementSibling);
		getNextElements(node.nextElementSibling, callback);
	}
}