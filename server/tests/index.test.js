import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server';


chai.use(chaiHttp);

describe('testing welcome message', () => {
  it('should return the wecome message with API docs link', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
      });
    done();
  });
  it('should return no such endpoint', (done) => {
    chai.request(app)
      .get('/users')
      .end((err, res) => {
        expect(res).to.have.status(400);
      });
    done();
  });
});
