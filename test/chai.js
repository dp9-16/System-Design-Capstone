import {handleQuestions} from "../src/Routes/handleQuestions";
import {expect} from 'chai'
import MockAdapter from "axios-mock-adapter";
import axios from "axios";

describe('Testing Question Routes', () => {

    it('Questions Is receiving request correctly', () => {
        tester.onGet("/questions").reply(200)
    })
})