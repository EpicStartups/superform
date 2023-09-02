// place files you want to import through the `$lib` alias in this folder.
export const adjustTextareaHeight = (element: any) => {
	if (element) {
		element.style.height = 'auto';
		element.style.height = `${element.scrollHeight + 25}px`;
	}

	// console.log(element.scrollHeight, 'element.scrollHeight')
	// console.log(element.clientHeight,'element.clientHeight' )
};

export const checkTextareaHeight = async (id: any) => {
	const textarea = document.getElementById(`myTextarea-${id}`);
	const button = document.getElementById(`showMoreButton-${id}`);
	let textareaHeight;
	let clientHeight;

	if (textarea) {
		textareaHeight = textarea.scrollHeight;
		clientHeight = textarea.clientHeight;
	}

	if (button && textarea) {
		if (textareaHeight > clientHeight) {
			button.style.display = 'inline-block';
		} else {
			button.style.display = 'none';
		}
	}
};

export const fullTextareaHeight = async (id: any) => {
	const textarea = document.getElementById(`myTextarea-${id}`);
	let textareaHeight;
	let clientHeight;

	if (textarea) {
		textareaHeight = textarea.scrollHeight;
		clientHeight = textarea.clientHeight;
	}

	if (textarea) {
		if (textareaHeight < clientHeight) {
			textareaHeight = clientHeight;
		}
	}
};
