import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';


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
    const notAdminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImVtYWlsIjoiY2Vkcmlja0BnbWFpbC5jb20iLCJpc0FkbWluIjpmYWxzZSwiaXNNZW50b3IiOmZhbHNlLCJpYXQiOjE1Njc2MjQ1MTIsImV4cCI6MTU2ODIyOTMxMn0.wR440Q2IEl9ikHgbMCSJvi7lbTyY_Jre04ekWfLgP1c';
    chai.request(app)
      .patch('/api/v1/user/1')
      .set('Authorization', notAdminToken)
      .end((err, res) => {
        expect(res).to.have.status(403);
        done();
      });
  });
  it('should return this user does not exist', (done) => {
    const AdminToken = process.env.AdminTokenValue;
    chai.request(app)
      .patch('/api/v1/user/1000')
      .set('Authorization', AdminToken)
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
  it('should return This user is already a mentor', (done) => {
    const AdminToken = process.env.AdminTokenValue;
    chai.request(app)
      .patch('/api/v1/user/3')
      .set('Authorization', AdminToken)
      .end((err, res) => {
        expect(res).to.have.status(422);
        done();
      });
  });
  it('should return User account changed to mentor', (done) => {
    const AdminToken = process.env.AdminTokenValue;
    chai.request(app)
      .patch('/api/v1/user/2')
      .set('Authorization', AdminToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
describe('Testing viewing all mentors', () => {
  it('should return User account changed to mentor', (done) => {
    const AdminToken = process.env.AdminTokenValue;
    chai.request(app)
      .get('/api/v1/mentors')
      .set('Authorization', AdminToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
describe('Testing viewing specific mentor', () => {
  it('should return This mentor does not exist', (done) => {
    const AdminToken = process.env.AdminTokenValue;
    chai.request(app)
      .get('/api/v1/mentors/90')
      .set('Authorization', AdminToken)
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
  it('should return property data with status of 200', (done) => {
    const AdminToken = process.env.AdminTokenValue;
    chai.request(app)
      .get('/api/v1/mentors/1')
      .set('Authorization', AdminToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data');
        done();
      });
  });
});
