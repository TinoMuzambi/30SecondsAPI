export enum CATEGORY {
	cars = "cars",
	tech = "tech",
	places = "places",
	kids = "kids",
	music = "music",
	science = "science",
	animals = "animals",
	nature = "nature",
	celebrities = "celebrities",
	sports = "sports",
	tv = "tv",
	politics = "politics",
	bible = "bible",
	all = "all",
}

export enum DIFFICULTY {
	easy = "easy",
	medium = "medium",
	hard = "hard",
	all = "all",
}

export const BASE_URL =
	process.env.NODE_ENV === "production"
		? "https://30-seconds-api.vercel.app"
		: "http://localhost:3000";

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
