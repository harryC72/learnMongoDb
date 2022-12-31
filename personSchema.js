let mongoose = require("mongoose");
let Schema = mongoose.Schema;

const personSchema = new Schema({
	name: { type: String, required: true },
	age: Number,
	favoriteFoods: [{ type: String }],
});

export default personSchema;
