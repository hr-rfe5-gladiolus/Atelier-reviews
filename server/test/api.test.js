request = require("supertest");
app = require("../index.js");

describe('Post /reviews', () => {
  test('Should post review', async () => {
    const review = {"product_id": 3, "rating": 4, "summary": "STOP", "body": "STOP", "recommend": true, "name": "HEHE", "email": "hehe@gmail.com", "photos":[], "characteristics": {"6": 2, "7": 3, "8": 4, "9": 5}};
    const response = await request(app).post('/reviews').send(review);
    expect(response.statusCode).toBe(200);
  })
})


describe('Get /reviews', () => {
  test('Should get reviews data', async () => {
    const parameters = 'product_id=3';
    const response = await request(app).get('/reviews?' + parameters).send({});
    expect(response.body.results).toBeInstanceOf(Array);
    expect(response.body.results.length).toBeGreaterThan(0);
  })
})



describe('Get /reviews/meta', () => {
  test('Should get reviews meta data', async () => {
    const parameters = 'product_id=3';
    const response = await request(app).get('/reviews/meta?' + parameters).send({});
    expect(response.body.product_id).toBe(3);
    expect(response.body.ratings).toBeInstanceOf(Object);
    expect(response.body.recommended).toBeInstanceOf(Object);
    expect(response.body.characteristics).toBeInstanceOf(Object);
    expect(Object.keys(response.body.characteristics).length).toBeGreaterThan(0);
  })
})

describe('Update /reviews', () => {
  test('Should update reviews reported', async () => {
    const response = await request(app).put('/reviews/5/report').send({});
    expect(response.statusCode).toBe(200);
  })

  test('Should update reviews helpful', async () => {
    const response = await request(app).put('/reviews/5/helpful').send({});
    expect(response.statusCode).toBe(200);
  })
})
