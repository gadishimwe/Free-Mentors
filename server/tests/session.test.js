import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server';


chai.use(chaiHttp);

const user3Token = process.env.User3;
const user4Token = process.env.User4;
const user6Token = process.env.User6;
const mentor4Token = process.env.Mentor4;
const mentor5Token = process.env.Mentor5;
const adminToken = process.env.Admin;

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
      .send({ mentorId: 88, questions: 'how to be successful?' })
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
  it('should return data property with status of 200', (done) => {
    chai.request(app)
      .post('/api/v1/sessions')
      .set('Authorization', user3Token)
      .send({ mentorId: 3003, questions: 'how to be successful?' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data');
        done();
      });
  });
});

describe('Testing mentor can accept session request', () => {
  it('should return Forbidden: Only Mentors can perform this operation', (done) => {
    chai.request(app)
      .patch('/api/v1/sessions/1/accept')
      .set('Authorization', user3Token)
      .end((err, res) => {
        expect(res).to.have.status(403);
        done();
      });
  });
  it('should return This session does not exist', (done) => {
    chai.request(app)
      .patch('/api/v1/sessions/777/accept')
      .set('Authorization', mentor4Token)
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
  it('should return This session is already accepted or declined', (done) => {
    chai.request(app)
      .patch('/api/v1/sessions/2000/accept')
      .set('Authorization', mentor5Token)
      .end((err, res) => {
        expect(res).to.have.status(422);
        done();
      });
  });
  it('should return data property with status of 200', (done) => {
    chai.request(app)
      .patch('/api/v1/sessions/1000/accept')
      .set('Authorization', mentor4Token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data');
        done();
      });
  });
});
describe('Testing mentor can decline session request', () => {
  it('should return data property with status of 200', (done) => {
    chai.request(app)
      .patch('/api/v1/sessions/4000/reject')
      .set('Authorization', mentor5Token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data');
        done();
      });
  });
});
describe('Testing users can view all their mentorship sessions', () => {
  it('should return data property with status of 200', (done) => {
    chai.request(app)
      .get('/api/v1/sessions')
      .set('Authorization', mentor5Token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data');
        done();
      });
  });
});
describe('Testing user can review mentor after mentorship session', () => {
  it('should return This session does not exist', (done) => {
    chai.request(app)
      .post('/api/v1/sessions/300/review')
      .set('Authorization', user4Token)
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
  it('should return You do not have a session with this mentor yet', (done) => {
    chai.request(app)
      .post('/api/v1/sessions/3000/review')
      .set('Authorization', user6Token)
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
  it('should return score is required,please provide it', (done) => {
    chai.request(app)
      .post('/api/v1/sessions/1000/review')
      .set('Authorization', user4Token)
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
  it('should return score must 1 to 5, please enter valid score', (done) => {
    chai.request(app)
      .post('/api/v1/sessions/1000/review')
      .set('Authorization', user4Token)
      .send({ score: 'we' })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
  it('should return remark is required,please provide it', (done) => {
    chai.request(app)
      .post('/api/v1/sessions/1000/review')
      .set('Authorization', user4Token)
      .send({ score: 3 })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
  it('should return property data with status of 200', (done) => {
    chai.request(app)
      .post('/api/v1/sessions/1000/review')
      .set('Authorization', user4Token)
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
    chai.request(app)
      .delete('/api/v1/sessions/300/review')
      .set('Authorization', adminToken)
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
  it('should return Review successfully deleted', (done) => {
    chai.request(app)
      .delete('/api/v1/sessions/1000/review')
      .set('Authorization', adminToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
