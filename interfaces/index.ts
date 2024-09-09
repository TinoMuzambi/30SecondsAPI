/**
 * Enum of all the item categories.
 */
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
	generalKnowledge = "general-knowledge",
	all = "all",
}

/**
 * Enum of all the item difficulties
 */
export enum DIFFICULTY {
	easy = "easy",
	medium = "medium",
	hard = "hard",
	all = "all",
}

/**
 * Base url encoded for the right environment.
 */
export const BASE_URL =
	process.env.NODE_ENV === "production"
		? "https://30-seconds-api.vercel.app"
		: "http://localhost:3000";

/**
 * One item on a card.
 */
export interface Item {
	_id: string;
	id: string;
	difficulty: DIFFICULTY;
	categories: CATEGORY[];
	content: string;
	clue: string;
}

/**
 * A 30 seconds card which can have multiple items of given difficulties and categories.
 */
export interface Card {
	id: string;
	difficulties: DIFFICULTY[];
	categories: CATEGORY[];
	noItems: number;
	items: Item[];
}
