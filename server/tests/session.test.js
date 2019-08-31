import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';


chai.use(chaiHttp);

describe('Testing requesting mentorship session', () => {
  it('should return MentorId is required. Please provide it', (done) => {
    const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImVtYWlsIjoiY2Vkcmlja0BnbWFpbC5jb20iLCJpc0FkbWluIjpmYWxzZSwiaXNNZW50b3IiOmZhbHNlLCJpYXQiOjE1NjcyMDQzNTAsImV4cCI6MTU2NzgwOTE1MH0.OiRRqBcOt_1BseuCBKTSvvyxJBFlJkdMduxF0pJW1EQ';
    chai.request(app)
      .post('/api/v1/sessions')
      .set('Authorization', userToken)
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
  it('should return Questions are required. Please provide them', (done) => {
    const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImVtYWlsIjoiY2Vkcmlja0BnbWFpbC5jb20iLCJpc0FkbWluIjpmYWxzZSwiaXNNZW50b3IiOmZhbHNlLCJpYXQiOjE1NjcyMDQzNTAsImV4cCI6MTU2NzgwOTE1MH0.OiRRqBcOt_1BseuCBKTSvvyxJBFlJkdMduxF0pJW1EQ';
    chai.request(app)
      .post('/api/v1/sessions')
      .set('Authorization', userToken)
      .send({ mentorId: 1 })
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
  it('should return Mentor you entered does not exist', (done) => {
    const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImVtYWlsIjoiY2Vkcmlja0BnbWFpbC5jb20iLCJpc0FkbWluIjpmYWxzZSwiaXNNZW50b3IiOmZhbHNlLCJpYXQiOjE1NjcyMDQzNTAsImV4cCI6MTU2NzgwOTE1MH0.OiRRqBcOt_1BseuCBKTSvvyxJBFlJkdMduxF0pJW1EQ';
    chai.request(app)
      .post('/api/v1/sessions')
      .set('Authorization', userToken)
      .send({ mentorId: 1000, questions: 'how to be successful?' })
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
  it('should return Session request already sent', (done) => {
    const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImVtYWlsIjoiY2Vkcmlja0BnbWFpbC5jb20iLCJpc0FkbWluIjpmYWxzZSwiaXNNZW50b3IiOmZhbHNlLCJpYXQiOjE1NjcyMDQzNTAsImV4cCI6MTU2NzgwOTE1MH0.OiRRqBcOt_1BseuCBKTSvvyxJBFlJkdMduxF0pJW1EQ';
    chai.request(app)
      .post('/api/v1/sessions')
      .set('Authorization', userToken)
      .send({ mentorId: 1, questions: 'how to be successful?' })
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
  it('should return datat property with status of 200', (done) => {
    const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImVtYWlsIjoiY2Vkcmlja0BnbWFpbC5jb20iLCJpc0FkbWluIjpmYWxzZSwiaXNNZW50b3IiOmZhbHNlLCJpYXQiOjE1NjcyMDQzNTAsImV4cCI6MTU2NzgwOTE1MH0.OiRRqBcOt_1BseuCBKTSvvyxJBFlJkdMduxF0pJW1EQ';
    chai.request(app)
      .post('/api/v1/sessions')
      .set('Authorization', userToken)
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
    const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImVtYWlsIjoiY2Vkcmlja0BnbWFpbC5jb20iLCJpc0FkbWluIjpmYWxzZSwiaXNNZW50b3IiOmZhbHNlLCJpYXQiOjE1NjcyMDQzNTAsImV4cCI6MTU2NzgwOTE1MH0.OiRRqBcOt_1BseuCBKTSvvyxJBFlJkdMduxF0pJW1EQ';
    chai.request(app)
      .patch('/api/v1/sessions/1/accept')
      .set('Authorization', userToken)
      .end((err, res) => {
        expect(res).to.have.status(403);
        done();
      });
  });
  it('should return This session does not exist', (done) => {
    const mentorToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsImVtYWlsIjoiam9obkBnbWFpbC5jb20iLCJpc0FkbWluIjpmYWxzZSwiaXNNZW50b3IiOnRydWUsImlhdCI6MTU2NzIzMzU4NywiZXhwIjoxNTY3ODM4Mzg3fQ.BcdUfj-LtKzvla31K9M3-E-s28sme1T0moXpHoDS65c';
    chai.request(app)
      .patch('/api/v1/sessions/1000/accept')
      .set('Authorization', mentorToken)
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
  it('should return This session is not yours', (done) => {
    const mentorToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsImVtYWlsIjoiam9obkBnbWFpbC5jb20iLCJpc0FkbWluIjpmYWxzZSwiaXNNZW50b3IiOnRydWUsImlhdCI6MTU2NzIzMzU4NywiZXhwIjoxNTY3ODM4Mzg3fQ.BcdUfj-LtKzvla31K9M3-E-s28sme1T0moXpHoDS65c';
    chai.request(app)
      .patch('/api/v1/sessions/1/accept')
      .set('Authorization', mentorToken)
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
  it('should return This session is already accepted', (done) => {
    const mentorToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImVtYWlsIjoia2FyYWtlQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlLCJpc01lbnRvciI6dHJ1ZSwiaWF0IjoxNTY3MjM3MzA0LCJleHAiOjE1Njc4NDIxMDR9.hIF5v626jkQ1WApq8QkYcerwTju34x_z1zCftjJvJ1Y';
    chai.request(app)
      .patch('/api/v1/sessions/2/accept')
      .set('Authorization', mentorToken)
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
  it('should return data property with status of 200', (done) => {
    const mentorToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImVtYWlsIjoia2FyYWtlQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlLCJpc01lbnRvciI6dHJ1ZSwiaWF0IjoxNTY3MjM3MzA0LCJleHAiOjE1Njc4NDIxMDR9.hIF5v626jkQ1WApq8QkYcerwTju34x_z1zCftjJvJ1Y';
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
    const mentorToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsImVtYWlsIjoiam9obkBnbWFpbC5jb20iLCJpc0FkbWluIjpmYWxzZSwiaXNNZW50b3IiOnRydWUsImlhdCI6MTU2NzIzODg4MSwiZXhwIjoxNTY3ODQzNjgxfQ.6IV3Aock136kfcc-4vRDCPQI6MYwlPSkEYX9lavb-9w';
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
    const mentorToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImVtYWlsIjoia2FyYWtlQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlLCJpc01lbnRvciI6dHJ1ZSwiaWF0IjoxNTY3MjM3MzA0LCJleHAiOjE1Njc4NDIxMDR9.hIF5v626jkQ1WApq8QkYcerwTju34x_z1zCftjJvJ1Y';
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
    const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImVtYWlsIjoiY2Vkcmlja0BnbWFpbC5jb20iLCJpc0FkbWluIjpmYWxzZSwiaXNNZW50b3IiOmZhbHNlLCJpYXQiOjE1NjcyMDQzNTAsImV4cCI6MTU2NzgwOTE1MH0.OiRRqBcOt_1BseuCBKTSvvyxJBFlJkdMduxF0pJW1EQ';
    chai.request(app)
      .get('/api/v1/sessions')
      .set('Authorization', userToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data');
        done();
      });
  });
});
describe('Testing user can review mentor after mentorship session', () => {
  it('should return This session does not exist', (done) => {
    const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImVtYWlsIjoiY2Vkcmlja0BnbWFpbC5jb20iLCJpc0FkbWluIjpmYWxzZSwiaXNNZW50b3IiOmZhbHNlLCJpYXQiOjE1NjcyMDQzNTAsImV4cCI6MTU2NzgwOTE1MH0.OiRRqBcOt_1BseuCBKTSvvyxJBFlJkdMduxF0pJW1EQ';
    chai.request(app)
      .post('/api/v1/sessions/1000/review')
      .set('Authorization', userToken)
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
  it('should return You do not have a session with this mentor', (done) => {
    const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiZ2FkQGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlzTWVudG9yIjpmYWxzZSwiaWF0IjoxNTY3MjQxMDE3LCJleHAiOjE1Njc4NDU4MTd9.nZrEZfBUoT8-go8fhCEVryCoVhqIpvyi7u6uk0Vp40s';
    chai.request(app)
      .post('/api/v1/sessions/1/review')
      .set('Authorization', userToken)
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
  it('should return score is required,please provide it', (done) => {
    const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiZ2FkQGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlzTWVudG9yIjpmYWxzZSwiaWF0IjoxNTY3MjQxMDE3LCJleHAiOjE1Njc4NDU4MTd9.nZrEZfBUoT8-go8fhCEVryCoVhqIpvyi7u6uk0Vp40s';
    chai.request(app)
      .post('/api/v1/sessions/2/review')
      .set('Authorization', userToken)
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
  it('should return score must 1 to 5, please enter valid score', (done) => {
    const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiZ2FkQGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlzTWVudG9yIjpmYWxzZSwiaWF0IjoxNTY3MjQxMDE3LCJleHAiOjE1Njc4NDU4MTd9.nZrEZfBUoT8-go8fhCEVryCoVhqIpvyi7u6uk0Vp40s';
    chai.request(app)
      .post('/api/v1/sessions/2/review')
      .set('Authorization', userToken)
      .send({ score: 'we' })
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
  it('should return remark is required,please provide it', (done) => {
    const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiZ2FkQGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlzTWVudG9yIjpmYWxzZSwiaWF0IjoxNTY3MjQxMDE3LCJleHAiOjE1Njc4NDU4MTd9.nZrEZfBUoT8-go8fhCEVryCoVhqIpvyi7u6uk0Vp40s';
    chai.request(app)
      .post('/api/v1/sessions/2/review')
      .set('Authorization', userToken)
      .send({ score: 3 })
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
  it('should return property data with status of 200', (done) => {
    const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiZ2FkQGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlzTWVudG9yIjpmYWxzZSwiaWF0IjoxNTY3MjQxMDE3LCJleHAiOjE1Njc4NDU4MTd9.nZrEZfBUoT8-go8fhCEVryCoVhqIpvyi7u6uk0Vp40s';
    chai.request(app)
      .post('/api/v1/sessions/2/review')
      .set('Authorization', userToken)
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
    const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiZ2FkQGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlzTWVudG9yIjpmYWxzZSwiaWF0IjoxNTY3MjQxMDE3LCJleHAiOjE1Njc4NDU4MTd9.nZrEZfBUoT8-go8fhCEVryCoVhqIpvyi7u6uk0Vp40s';
    chai.request(app)
      .delete('/api/v1/sessions/1000/review')
      .set('Authorization', userToken)
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
  it('should return Review successfully deleted', (done) => {
    const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiZ2FkQGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlzTWVudG9yIjpmYWxzZSwiaWF0IjoxNTY3MjQxMDE3LCJleHAiOjE1Njc4NDU4MTd9.nZrEZfBUoT8-go8fhCEVryCoVhqIpvyi7u6uk0Vp40s';
    chai.request(app)
      .delete('/api/v1/sessions/2/review')
      .set('Authorization', userToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
