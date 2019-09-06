import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';


chai.use(chaiHttp);

describe('Testing requesting mentorship session', () => {
  it('should return MentorId is required. Please provide it', (done) => {
    const UserToken = process.env.UserTokenValue;
    chai.request(app)
      .post('/api/v1/sessions')
      .set('Authorization', UserToken)
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
  it('should return Questions are required. Please provide them', (done) => {
    const UserToken = process.env.UserTokenValue;
    chai.request(app)
      .post('/api/v1/sessions')
      .set('Authorization', UserToken)
      .send({ mentorId: 1 })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
  it('should return Mentor you entered does not exist', (done) => {
    const UserToken = process.env.UserTokenValue;
    chai.request(app)
      .post('/api/v1/sessions')
      .set('Authorization', UserToken)
      .send({ mentorId: 1000, questions: 'how to be successful?' })
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
  it('should return Session request already sent', (done) => {
    const UserToken = process.env.UserTokenValue;
    chai.request(app)
      .post('/api/v1/sessions')
      .set('Authorization', UserToken)
      .send({ mentorId: 1, questions: 'how to be successful?' })
      .end((err, res) => {
        expect(res).to.have.status(422);
        done();
      });
  });
  it('should return datat property with status of 200', (done) => {
    const UserToken = process.env.UserTokenValue;
    chai.request(app)
      .post('/api/v1/sessions')
      .set('Authorization', UserToken)
      .send({ mentorId: 3, questions: 'how to be successful?' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data');
        done();
      });
  });
});
describe('Testing mentor can accept session request', () => {
  it('should return Forbidden: Only Mentors can perform this operation', (done) => {
    const UserToken = process.env.UserTokenValue;
    chai.request(app)
      .patch('/api/v1/sessions/1/accept')
      .set('Authorization', UserToken)
      .end((err, res) => {
        expect(res).to.have.status(403);
        done();
      });
  });
  it('should return This session does not exist', (done) => {
    const mentorToken = process.env.Mentor4Token;
    chai.request(app)
      .patch('/api/v1/sessions/1000/accept')
      .set('Authorization', mentorToken)
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
  it('should return This session is not yours', (done) => {
    const mentorToken = process.env.Mentor4Token;
    chai.request(app)
      .patch('/api/v1/sessions/1/accept')
      .set('Authorization', mentorToken)
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
  it('should return This session is already accepted', (done) => {
    const mentorToken = process.env.Mentor3Token;
    chai.request(app)
      .patch('/api/v1/sessions/2/accept')
      .set('Authorization', mentorToken)
      .end((err, res) => {
        expect(res).to.have.status(422);
        done();
      });
  });
  it('should return data property with status of 200', (done) => {
    const mentorToken = process.env.Mentor3Token;
    chai.request(app)
      .patch('/api/v1/sessions/1/accept')
      .set('Authorization', mentorToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data');
        done();
      });
  });
});
describe('Testing mentor can decline session request', () => {
  it('should return data property with status of 200', (done) => {
    const mentorToken = process.env.Mentor4Token;
    chai.request(app)
      .patch('/api/v1/sessions/4/reject')
      .set('Authorization', mentorToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data');
        done();
      });
  });
});
describe('Testing users can view all their mentorship sessions', () => {
  it('should return data property with status of 200', (done) => {
    const mentorToken = process.env.Mentor3Token;
    chai.request(app)
      .get('/api/v1/sessions')
      .set('Authorization', mentorToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data');
        done();
      });
  });
  it('should return data property with status of 200', (done) => {
    const UserToken = process.env.UserTokenValue;
    chai.request(app)
      .get('/api/v1/sessions')
      .set('Authorization', UserToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data');
        done();
      });
  });
});
describe('Testing user can review mentor after mentorship session', () => {
  it('should return This session does not exist', (done) => {
    const UserToken = process.env.UserTokenValue;
    chai.request(app)
      .post('/api/v1/sessions/1000/review')
      .set('Authorization', UserToken)
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
  it('should return You do not have a session with this mentor', (done) => {
    const UserToken = process.env.UserTokenValue;
    chai.request(app)
      .post('/api/v1/sessions/1/review')
      .set('Authorization', UserToken)
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
  it('should return score is required,please provide it', (done) => {
    const UserToken = process.env.UserTokenValue;
    chai.request(app)
      .post('/api/v1/sessions/2/review')
      .set('Authorization', UserToken)
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
  it('should return score must 1 to 5, please enter valid score', (done) => {
    const UserToken = process.env.UserTokenValue;
    chai.request(app)
      .post('/api/v1/sessions/2/review')
      .set('Authorization', UserToken)
      .send({ score: 'we' })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
  it('should return remark is required,please provide it', (done) => {
    const UserToken = process.env.UserTokenValue;
    chai.request(app)
      .post('/api/v1/sessions/2/review')
      .set('Authorization', UserToken)
      .send({ score: 3 })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
  it('should return property data with status of 200', (done) => {
    const UserToken = process.env.UserTokenValue;
    chai.request(app)
      .post('/api/v1/sessions/2/review')
      .set('Authorization', UserToken)
      .send({ score: 3, remark: 'you have to ...' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data');
        done();
      });
  });
});
describe('Testing admin can delete a review', () => {
  it('should return This review does not exist', (done) => {
    const UserToken = process.env.UserTokenValue;
    chai.request(app)
      .delete('/api/v1/sessions/1000/review')
      .set('Authorization', UserToken)
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
  it('should return Review successfully deleted', (done) => {
    const UserToken = process.env.UserTokenValue;
    chai.request(app)
      .delete('/api/v1/sessions/2/review')
      .set('Authorization', UserToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
