import mongoose, { Schema } from "mongoose";

import { CATEGORY, DIFFICULTY, Item } from "../interfaces";

const ItemSchema: Schema = new mongoose.Schema(
	{
		id: {
			type: String,
			required: [true, "Item needs an ID."],
			trim: true,
			unique: true,
		},
		difficulty: {
			type: String,
			enum: DIFFICULTY,
			required: [true, "Item needs a difficulty"],
			trim: true,
		},
		categories: {
			type: [String],
			enum: CATEGORY,
			required: [true, "Item needs at least one category."],
			trim: true,
		},
		content: {
			type: String,
			required: [true, "Item needs content."],
			unique: true,
			trim: true,
		},
		clue: {
			type: String,
			required: [true, "Item needs a clue"],
			trim: true,
		},
	},
	{
		timestamps: true,
		strict: true,
	}
);

export default mongoose.models.Item || mongoose.model<Item>("Item", ItemSchema);
