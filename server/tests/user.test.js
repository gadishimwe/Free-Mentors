import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';


chai.use(chaiHttp);

describe('testing sign up', () => {
  it('should validate the user', (done) => {
    const newUser = {
      email: 'hhhh@gmail.com',
      password: 'nn',
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(newUser)
      .end((err, res) => {
        expect(res).to.have.status(400);
      });
    done();
  });
  it('should return email already exist', (done) => {
    const newUser = {
      email: 'gad@gmail.com',
      password: 'passssssss',
      firstName: 'Gad',
      lastName: 'Ishimwe',
      address: 'Nyarugenge',
      bio: 'uhfuif fihwiufhw fuwhfu ufhwufhu',
      occupation: 'Developer',
      expertise: 'Javascript',
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(newUser)
      .end((err, res) => {
        expect(res).to.have.status(401);
      });
    done();
  });
  it('should return User created successfully', (done) => {
    const newUser = {
      email: 'james@gmail.com',
      password: 'james123',
      firstName: 'james',
      lastName: 'bond',
      address: 'Nyarugenge',
      bio: 'uhfuif fihwiufhw fuwhfu ufhwufhu',
      occupation: 'Developer',
      expertise: 'Javascript',
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(newUser)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('data');
        done();
      });
  });
});
describe('Testing sign in', () => {
  it('should return invalid email or password when user entered email with no existing account', (done) => {
    const invalidCredentials = {
      email: 'invalid@gmail.com',
      password: 'jieojf',
    };
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(invalidCredentials)
      .end((err, res) => {
        expect(res).to.have.status(401);
      });
    done();
  });
  it('should return invalid email or password when user entered valid email but invalid password', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({ email: 'karake@gmail.com' })
      .end((err, res) => {
        expect(res).to.have.status(401);
      });
    done();
  });
  it('should return User is successfully logged in', (done) => {
    const user = {
      email: 'gad@gmail.com',
      password: 'pass123',
    };
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data');
        done();
      });
  });
});
