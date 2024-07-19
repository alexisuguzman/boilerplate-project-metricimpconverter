const chaiHttp = require("chai-http");
const chai = require("chai");
let assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
	suite("Routes tests", function () {
		suite("GET /api/convert -> Converted Object ", function () {
			test("Convert 10L", function (done) {
				chai
					.request(server)
					.get("/api/convert")
					.query({ input: "10L" })
					.end(function (err, res) {
						assert.equal(res.status, 200);
						assert.equal(res.body.initNum, 10);
						assert.equal(res.body.initUnit, "L");
						assert.equal(res.body.returnUnit, "gal");
						assert.approximately(res.body.returnNum, 2.64172, 0.1);
						done();
					});
			});

			test("32g invalid input", function (done) {
				chai
					.request(server)
					.get("/api/convert")
					.query({ input: "32g" })
					.end(function (err, res) {
						assert.equal(res.status, 200);
						assert.equal(res.body.initUnit, undefined);
						done();
					});
			});

			test("3/7.2/4kg invalid number", function (done) {
				chai
					.request(server)
					.get("/api/convert")
					.query({ input: "3/7.2/4kg" })
					.end(function (err, res) {
						assert.equal(res.status, 200);
						assert.equal(res.body.initNum, undefined);
						done();
					});
			});

			test("3/7.2/4kilomegagram Invalid number AND unit", function (done) {
				chai
					.request(server)
					.get("/api/convert")
					.query({ input: "3/7.2/4kilomegagram" })
					.end(function (err, res) {
						assert.equal(res.status, 200);
						assert.equal(res.body.initNum, undefined);
						assert.equal(res.body.initUnit, undefined);
						done();
					});
			});

			test("Kg with no number", function (done) {
				chai
					.request(server)
					.get("/api/convert")
					.query({ input: "kg" })
					.end(function (err, res) {
						assert.equal(res.status, 200);
						assert.equal(res.body.initNum, "1");
						done();
					});
			});
		});
	});
});
