export enum CATEGORIES {
	cars = "cars",
	tech = "tech",
}

export enum DIFFICULTIES {
	easy = "easy",
	medium = "medium",
	hard = "hard",
	default = "default",
}

export interface Item {
	id: number;
	difficulty: DIFFICULTIES;
	category: CATEGORIES[];
	content: string;
	clue: string;
}

export interface Card {
	id: number;
	difficulty: DIFFICULTIES[];
	category: CATEGORIES[];
	noItems: number;
	items: Item[];
}
