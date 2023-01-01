require("dotenv").config();
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

let Schema = mongoose.Schema;

const personSchema = new Schema({
	name: { type: String, required: true },
	age: Number,
	favoriteFoods: [{ type: String }],
});

const Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
	const person = new Person({
		name: "HARRY",
		age: 43,
		favoriteFoods: ["chicken", "carbonara"],
	});

	person.save(function (err, data) {
		if (err) {
			return console.error(err);
		}
		return done(null, data);
	});
};

const createManyPeople = (arrayOfPeople, done) => {
	Person.create(arrayOfPeople, function (err, data) {
		if (err) {
			return console.error(err);
		}
		return done(null, data);
	});
};

const findPeopleByName = (personName, done) => {
	Person.find({ name: personName }, function (err, data) {
		if (err) {
			return console.error(err);
		}
		return done(null, data);
	});
};

const findOneByFood = (food, done) => {
	Person.findOne({ favoriteFoods: food }, function (err, data) {
		if (err) {
			return console.error(err);
		}
		return done(null, data);
	});
};

const findPersonById = (personId, done) => {
	Person.findById({ _id: personId }, function (err, data) {
		if (err) {
			return console.error(err);
		}
		return done(null, data);
	});
};

const findEditThenSave = (personId, done) => {
	const foodToAdd = "hamburger";

	Person.findById({ _id: personId }, function (err, person) {
		if (err) {
			return console.error(err);
		}

		person.favoriteFoods.push(foodToAdd);

		person.save((err, uppdatedPerson) => {
			if (err) return console.log(err);
			done(null, uppdatedPerson);
		});
	});
};

const findAndUpdate = (personName, done) => {
	const ageToSet = 20;

	Person.findOneAndUpdate(
		{ name: personName },
		{ age: ageToSet },
		{ new: true },
		function (err, updatedDoc) {
			if (err) {
				return console.error(err);
			}
			done(null, updatedDoc);
		}
	);
};

const removeById = (personId, done) => {
	Person.findByIdAndRemove(personId, function (err, person) {
		if (err) {
			return console.error(err);
		}
		return done(null, person);
	});
};

const removeManyPeople = (done) => {
	const nameToRemove = "Mary";

	Person.remove({ name: nameToRemove }, function (err, result) {
		if (err) console.error(err);

		return done(null, result);
	});
};

const queryChain = (done) => {
	const foodToSearch = "burrito";

	const query = Person.find({ food: foodToSearch })
		.sort("name")
		.limit(2)
		.select("-age");

	query.exec(function (err, data) {
		if (err) console.error(err);

		return done(null, data);
	});
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
