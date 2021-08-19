import { v4 as uuidv4 } from "uuid";

import { CATEGORY, DIFFICULTY, Item } from "../interfaces";

const items: Item[] = [
	{
		id: uuidv4(),
		categories: [CATEGORY.cars],
		difficulty: DIFFICULTY.standard,
		content: "Maserati",
		clue: "Fork Logo",
	},
	{
		id: uuidv4(),
		categories: [CATEGORY.cars],
		difficulty: DIFFICULTY.standard,
		content: "Ferrari",
		clue: "Red horse",
	},
	{
		id: uuidv4(),
		categories: [CATEGORY.cars],
		difficulty: DIFFICULTY.standard,
		content: "Bugatti",
		clue: "Very fast",
	},
];

export default items;
