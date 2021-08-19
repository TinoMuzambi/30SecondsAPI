export enum CATEGORY {
	cars = "cars",
	tech = "tech",
	all = "all",
}

export enum DIFFICULTY {
	easy = "easy",
	medium = "medium",
	hard = "hard",
	standard = "standard",
}

export interface Item {
	id: string;
	difficulty: DIFFICULTY;
	category: CATEGORY[];
	content: string;
	clue: string;
}

export interface Card {
	id: string;
	difficulties: DIFFICULTY[];
	categories: CATEGORY[];
	noItems: number;
	items: Item[];
}
