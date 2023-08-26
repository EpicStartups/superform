export function formatNumberWithCommas(number) {
	if (typeof number !== 'number') {
		return number; // Return original input if it's not a number
	}

	return number.toLocaleString();
}
