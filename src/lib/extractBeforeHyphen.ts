export const extractBeforeHyphen = (inputString: string) => {
	// Find the position of the first hyphen
	const hyphenIndex = inputString.indexOf('-');

	// If a hyphen is found, return the substring before it
	if (hyphenIndex !== -1) return inputString.substring(0, hyphenIndex);

	// If no hyphen is found, return the original string
	return inputString;
};
