export enum CATEGORY {
	cars = "cars",
	tech = "tech",
	all = "all",
}

export enum DIFFICULTY {
	easy = "easy",
	medium = "medium",
	hard = "hard",
	all = "all",
}

export interface Item {
	_id: string;
	id: string;
	difficulty: DIFFICULTY;
	categories: CATEGORY[];
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
