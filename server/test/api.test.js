import request from "supertest";
import app from "../index.js";

describe('Get /reviews', () => {
  test('Should get reviews data', () => {
    const parameters = 'product_id=5';
    const response = await request(app).get('/review?')
  })
})