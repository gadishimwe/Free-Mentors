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
  it('should return email already exist', (done) => {
    const newUser = {
      email: 'james@gmail.com',
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
        expect(res).to.have.status(422);
      });
    done();
  });
});
