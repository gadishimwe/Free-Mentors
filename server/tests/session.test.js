import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server';


chai.use(chaiHttp);

const user3Token = process.env.User3;
const user4Token = process.env.User4;

describe('Testing requesting mentorship session', () => {
  it('should return MentorId is required. Please provide it', (done) => {
    chai.request(app)
      .post('/api/v1/sessions')
      .set('Authorization', user3Token)
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
  it('should return Questions are required. Please provide them', (done) => {
    chai.request(app)
      .post('/api/v1/sessions')
      .set('Authorization', user3Token)
      .send({ mentorId: 1 })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
  it('should return Mentor you entered does not exist', (done) => {
    chai.request(app)
      .post('/api/v1/sessions')
      .set('Authorization', user3Token)
      .send({ mentorId: 1000, questions: 'how to be successful?' })
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
  it('should return Session request already sent', (done) => {
    chai.request(app)
      .post('/api/v1/sessions')
      .set('Authorization', user4Token)
      .send({ mentorId: 4004, questions: 'how to be successful?' })
      .end((err, res) => {
        expect(res).to.have.status(422);
        done();
      });
  });
  it('should return datat property with status of 200', (done) => {
    chai.request(app)
      .post('/api/v1/sessions')
      .set('Authorization', user3Token)
      .send({ mentorId: 5005, questions: 'how to be successful?' })
      .end((err, res) => {
          console.log(res.body);
          
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data');
        done();
      });
  });
});