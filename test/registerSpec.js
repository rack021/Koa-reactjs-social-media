const mongorito = require("mongorito");
const Membership = require("../membership");
const should = require("should");
const config = require("../config");
const run = config.run;
const mailer = require("../membership/libs/Mail");

describe("Membership", function() {
    describe("Registeration", function() {
        let database;
        before(function(done) {
            run(function*() {
                database = yield mongorito.connect(config.db.URI);
                done();
            });
        });
        after(function(done) {
            run(function*() {
                yield mongorito.disconnect();
                done();
            });
        });

        it("should have valid application", function(done) {
            run(function*() {
                yield mongorito.connect(config.db.URI);
                let member = new Membership(
                    "racss",
                    "racrac",
                    "racrac",
                    "rack021@gmail.com"
                );
                yield member.register.process();
                done();
            });
        });
    });
});
