const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app.js");

chai.should();
chai.use(chaiHttp);

describe("Test Authorization required", () => {
  it("should return 401 Unauthorized", done => {
    chai
      .request(app)
      .post(`/api/campaigns`)
      .send({ name: "New Test Campaign", ownedBy: "A user" })
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});
