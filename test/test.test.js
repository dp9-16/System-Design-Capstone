const chai = require('chai');
const chaiHttp = require('chai-http');
const { app } = require('../server/index.js');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Reviews API', () => {
  it('should return a list of reviews', function (done) {
    chai.request(app)
      .get('/reviews')
      .query({ product_id: 1 })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should return metadata for a product', function (done) {
    this.timeout(5000);
    chai.request(app)
      .get('/reviews/meta')
      .query({ product_id: 1 })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should create a new review', function (done) {
    this.timeout(5000);
    const reviewData = {
      product_id: 1,
      rating: 5,
      summary: 'Great product',
      body: 'I love this product!',
      recommend: true,
      name: 'John Doe',
      email: 'john@example.com',
      photos: ['photo1.jpg', 'photo2.jpg'],
      characteristics: { '1': 5, '2': 4 },
    };

    chai.request(app)
      .post('/reviews')
      .send(reviewData)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});