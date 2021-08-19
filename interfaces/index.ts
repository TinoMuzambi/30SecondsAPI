export enum CATEGORIES {
	cars = "cars",
	tech = "tech",
	all = "all",
}

export enum DIFFICULTIES {
	easy = "easy",
	medium = "medium",
	hard = "hard",
	default = "default",
}

export interface Item {
	id: string;
	difficulty: DIFFICULTIES;
	category: CATEGORIES[];
	content: string;
	clue: string;
}

export interface Card {
	id: string;
	difficulties: DIFFICULTIES[];
	categories: CATEGORIES[];
	noItems: number;
	items: Item[];
}
