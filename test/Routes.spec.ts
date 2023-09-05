import {
  handleQuestionget,
  handleQuestionpost,
} from "../src/Routes/handleQuestions";
import { expect } from "chai";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { axiosInstance } from "../test/axios_instance";

const mock = new MockAdapter(axiosInstance, { onNoMatch: "throwException" });
const url = "http://localhost:3000/qa";
afterEach(() => {
  mock.reset();
});

describe("Testing Question Get Route", () => {
  it("should return 200", async () => {
    expect(handleQuestionget).to.be.a("function");
  });
  it("should return a correct query", async () => {
    const result = await axios.get(
      "http://localhost:3000/qa/questions/product_id=1"
    );
    expect(result.data).to.be.a("array");
    expect(result.data[0]).to.be.a("object");
    expect(result.data[0]).to.have.property("id");
    expect(result.data[0]).to.have.property("body");
    expect(result.data[0]).to.have.property("date");
    expect(result.data[0]).to.have.property("account_name");
    expect(result.data[0]).to.have.property("helpful_rating");
    expect(result.data[0]).to.have.property("reported");
  });
});

describe("Testing Question Post Route", async () => {
  const result = await axios.post(url + "/questions", {
    product_id: 1,
    question_body: "test",
    question_date: "test",
    asker_name: "test",
    asker_email: "test",
    reported: false,
    question_helpfulness: 0,
  });

  it("should return 201", async () => {
    expect(result.status).to.equal(201);
  });

  it("should return error for incorrect params", async () => {
    const faultyResult = await axios.post(url + "/questions", {
      question_body: "test",
      question_date: "test",
      asker_name: "test",
      asker_email: "test",
      reported: false,
    });
    expect(faultyResult.status).to.equal(400);
  });
});

describe("Testing Answers Post Route", async () => {
  const result = await axios.post(url + "/questions/1/answers", {
    body: "test",
    name: "test",
    email: "test",
    photos: ["test"],
  });
  it("should return 201", async () => {
    expect(result.status).to.equal(201);
  });
  it("should return error for incorrect params", async () => {
    const faultyResult = await axios.post(url + "/questions/1/answers", {
      body: "test",
      name: "test",
      email: "test",
    });
    expect(faultyResult.status).to.equal(400);
  });
});

describe("Testing Answers Get Route", async () => {
  const result = await axios.get(url + "/questions/1/answers");
  it("should return 200", async () => {
    expect(result.status).to.equal(200);
  });
  it("should return an array", async () => {
    expect(result.data).to.be.a("array");
  });
  it("should return an object", async () => {
    expect(result.data[0]).to.be.a("object");
  });
  it("should return correct properties", async () => {
    expect(result.data[0]).to.have.property("id");
    expect(result.data[0]).to.have.property("body");
    expect(result.data[0]).to.have.property("date");
    expect(result.data[0]).to.have.property("account_name");
    expect(result.data[0]).to.have.property("helpful_rating");
    expect(result.data[0]).to.have.property("reported");
    expect(result.data[0]).to.have.property("photos");
  });
});

describe("Testing Mark Question Helpful Route", async () => {
  const result = await axios.put(url + "/questions/1/helpful");
  it("should return 204", async () => {
    expect(result.status).to.equal(204);
  });
});

describe("Testing Mark Question Report Route", async () => {
  const result = await axios.put(url + "/questions/1/report");
  it("should return 204", async () => {
    expect(result.status).to.equal(204);
  });
});

describe("Testing Mark Answer Helpful Route", async () => {
  const result = await axios.put(url + "/answers/1/helpful");
  it("should return 204", async () => {
    expect(result.status).to.equal(204);
  });
});

describe("Testing Mark Answer Report Route", async () => {
  const result = await axios.put(url + "/answers/1/report");
  it("should return 204", async () => {
    expect(result.status).to.equal(204);
  });
});
