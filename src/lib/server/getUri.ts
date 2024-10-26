export function getUri(input: string) {
	return input
		.trim() // Remove whitespace from both ends of the string
		.toLowerCase() // Convert all characters to lowercase
		.replace(/[^\w\s-]/g, '') // Remove special characters except for hyphens
		.replace(/\s+/g, '-') // Replace all sequences of whitespace characters with a hyphen
		.replace(/-+/g, '-'); // Replace multiple hyphens with a single hyphen
}
