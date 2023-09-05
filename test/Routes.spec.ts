import { handleQuestions } from "../src/Routes/handleQuestions";
import { expect } from "chai";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { axiosInstance } from "../test/axios_instance";

const mock = new MockAdapter(axiosInstance, { onNoMatch: "throwException" });
qafterEach(() => {
  mock.reset();
});

describe("Testing Question Routes", () => {
  it("should return 200", async () => {
    expect(handleQuestions).to.be.a("function");
  });
  it("should return a correct query", async () => {
    const result = await axios.get(
      "http://localhost:3000/questions/?product_id=1&count=50"
    );
    expect(result.data).to.be.a("array");
    expect(result.data[0]).to.be.a("object");
  });
});
