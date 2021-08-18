// Return true if there is an intersection, else false.
export const intersection = (array1: any[], array2: any[]): boolean => {
	return array1.filter((value) => array2.includes(value)) !== [];
};
