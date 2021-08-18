import { Card, CATEGORIES, DIFFICULTIES } from "../interfaces";

const cards: Card[] = [
	{
		id: 1,
		category: [CATEGORIES.cars],
		difficulty: [DIFFICULTIES.default],
		items: [
			{
				id: 1000,
				category: [CATEGORIES.cars],
				difficulty: DIFFICULTIES.default,
				content: "Maserati",
				clue: "Fork Logo",
			},
		],
		noItems: (function () {
			return (this as any).items.length;
		})(),
	},
];

export default cards;
