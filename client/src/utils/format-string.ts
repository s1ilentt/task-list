export const formatLastWord = (str: string) => {
	const words = str.split(' ');

	if (words.length === 0) return str;

	const lastIndex = words.length - 1;

	words[lastIndex] =
		words[lastIndex].charAt(0).toUpperCase() + words[lastIndex].slice(1);

	return words.join(' ');
};
