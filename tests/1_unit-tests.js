const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
	suite("Test getNum(input)", function () {
		test("Whole number input", function (done) {
			let input = "10L";
			assert.equal(convertHandler.getNum(input), 10);
			done();
		});

		test("Decimal input", function (done) {
			let input = "10.5L";
			assert.equal(convertHandler.getNum(input), 10.5);
			done();
		});

		test("Fraction input", function (done) {
			let input = "3/4L";
			assert.equal(convertHandler.getNum(input), 3 / 4);
			done();
		});

		test("Fraction with decimal input", function (done) {
			let input = "3.25/4L";
			assert.equal(convertHandler.getNum(input), 3.25 / 4);
			done();
		});

		test("Double Fraction input", function (done) {
			let input = "1/2/3L";
			assert.equal(convertHandler.getNum(input), undefined);
			done();
		});

		test("No number input", function (done) {
			let input = "L";
			assert.equal(convertHandler.getNum(input), 1);
			done();
		});
	});

	suite("Test getUnit(input)", function () {
		test("Each valid unit input", function (done) {
			let inputs = [
				"kg",
				"gal",
				"lbs",
				"km",
				"mi",
				"l",
				"KG",
				"GAL",
				"LBS",
				"KM",
				"MI",
				"L",
			];

			let output = [
				"kg",
				"gal",
				"lbs",
				"km",
				"mi",
				"L",
				"kg",
				"gal",
				"lbs",
				"km",
				"mi",
				"L",
			];
			inputs.forEach((input, index) => {
				assert.equal(convertHandler.getUnit(input), output[index]);
			});
			done();
		});

		test("Unknown unit input", function (done) {
			let input = "34kilometers";
			assert.equal(convertHandler.getUnit(input), undefined);
			done();
		});
	});

	suite("Test getReturnUnit(initUnit)", function () {
		test("Each unit returns correctly", function (done) {
			let inputs = ["kg", "gal", "lbs", "km", "mi", "l"];
			let expect = ["lbs", "L", "kg", "mi", "km", "gal"];

			inputs.forEach((input, index) => {
				assert.equal(convertHandler.getReturnUnit(input), expect[index]);
			});
			done();
		});
	});

	suite("Test spellOutUnit(unit)", function () {
		test("Each unit returns correctly", function (done) {
			let inputs = ["kg", "gal", "lbs", "km", "mi", "l"];
			let expect = [
				"kilograms",
				"gallons",
				"pounds",
				"kilometers",
				"miles",
				"liters",
			];
			inputs.forEach((input, index) => {
				assert.equal(convertHandler.spellOutUnit(input), expect[index]);
			});
			done();
		});
	});

	suite("Test convertHandler.convert(num, unit)", function () {
		test("Converting gal to L", function (done) {
			let input = [10, "gal"];
			let expect = 37.8541;
			assert.approximately(
				convertHandler.convert(input[0], input[1]),
				expect,
				0.1
			);
			done();
		});

		test("Converting L to gal", function (done) {
			let input = [37.8541, "L"];
			let expect = 10;
			assert.approximately(
				convertHandler.convert(input[0], input[1]),
				expect,
				0.1
			);
			done();
		});

		test("Converting mi to km", function (done) {
			let input = [10, "mi"];
			let expect = 16.0934;
			assert.approximately(
				convertHandler.convert(input[0], input[1]),
				expect,
				0.1
			);
			done();
		});

		test("Converting km to mi", function (done) {
			let input = [16.0934, "km"];
			let expect = 10;
			assert.approximately(
				convertHandler.convert(input[0], input[1]),
				expect,
				0.1
			);
			done();
		});

		test("Converting lbs to kg", function (done) {
			let input = [22.0462, "lbs"];
			let expect = 10;
			assert.approximately(
				convertHandler.convert(input[0], input[1]),
				expect,
				0.1
			);
			done();
		});

		test("Converting kg to lbs", function (done) {
			let input = [10, "kg"];
			let expect = 22.0462;
			assert.approximately(
				convertHandler.convert(input[0], input[1]),
				expect,
				0.1
			);
			done();
		});
	});
});
