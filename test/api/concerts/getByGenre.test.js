const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Concert = require('../../../models/concerts.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts/genre/:genre', () => {
  before(async () => {
    const testConcertOne = new Concert({
      _id: '6490d43da695654c300795f1',
      performer: 'John Doe',
      genre: 'Rock',
      price: 25,
      day: 1,
      image: '/img/uploads/1fsd324fsdg.jpg',
    });
    await testConcertOne.save();

    const testConcertTwo = new Concert({
      _id: '6490d43da695654c300795f2',
      performer: 'John Doe',
      genre: 'Rock',
      price: 20,
      day: 1,
      image: '/img/uploads/1fsd324fsdg.jpg',
    });
    await testConcertTwo.save();

    const testConcertThree = new Concert({
      _id: '6490d43da695654c300795f3',
      performer: 'Amanda Doe',
      genre: 'POP',
      price: 35,
      day: 2,
      image: '/img/uploads/1fsd324fsdg.jpg',
    });
    await testConcertThree.save();

    const testConcertFour = new Concert({
      _id: '6490d43da695654c300795f4',
      performer: 'Amanda Doe',
      genre: 'POP',
      price: 45,
      day: 3,
      image: '/img/uploads/1fsd324fsdg.jpg',
    });
    await testConcertFour.save();
  });

  it('should return concerts by genre', async () => {
    const res = await request(server).get('/api/concerts/genre/Rock');

    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array').with.lengthOf(2);
  });

  it('should return an empty array if no concerts found for the genre', async () => {
    const res = await request(server).get('/api/concerts/genre/No such Genre');

    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array').with.lengthOf(0);
  });

  after(async () => {
    await Concert.deleteMany();
  });
});
