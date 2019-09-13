import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import app from '../../server';

dotenv.config();

const adminToken = process.env.Admin;
const user1Token = process.env.User1;

chai.use(chaiHttp);

describe('Testing changing user to mentor', () => {
  it('should return Forbidden: you must login to proceed', (done) => {
    chai.request(app)
      .patch('/api/v1/user/1')
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
  it('should return Forbidden: Only Admins can perform this operation', (done) => {
    chai.request(app)
      .patch('/api/v1/user/1')
      .set('Authorization', user1Token)
      .end((err, res) => {
        expect(res).to.have.status(403);
        done();
      });
  });
  it('should return this user does not exist', (done) => {
    chai.request(app)
      .patch('/api/v1/user/56')
      .set('Authorization', adminToken)
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
  it('should return This user is already a mentor', (done) => {
    chai.request(app)
      .patch('/api/v1/user/3003')
      .set('Authorization', adminToken)
      .end((err, res) => {
        expect(res).to.have.status(422);
        done();
      });
  });
  it('should return User account changed to mentor', (done) => {
    chai.request(app)
      .patch('/api/v1/user/1000')
      .set('Authorization', adminToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe('Testing viewing all mentors', () => {
  it('should return User account changed to mentor', (done) => {
    chai.request(app)
      .get('/api/v1/mentors')
      .set('Authorization', user1Token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
describe('Testing viewing specific mentor', () => {
  it('should return This mentor does not exist', (done) => {
    chai.request(app)
      .get('/api/v1/mentors/90')
      .set('Authorization', user1Token)
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
  it('should return property data with status of 200', (done) => {
    chai.request(app)
      .get('/api/v1/mentors/3003')
      .set('Authorization', user1Token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data');
        done();
      });
  });
});
