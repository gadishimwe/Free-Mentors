/* eslint-disable no-console */
import express from 'express';
import morgan from 'morgan';
import user from './server/routes/user';
import mentor from './server/routes/mentor';
import session from './server/routes/session';
import '@babel/polyfill';


console.log(process.env.NODE_ENV);


const app = express();
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/v1/', user);
app.use('/api/v1/', mentor);
app.use('/api/v1/', session);
app.get('/', (req, res) => {
  res.status(200);
  res.setHeader('Content-Type', 'text/html;charset=utf8');
  res.end(`<h1>WELCOME TO FREE MENTORS</h1>\nTo get started with Free Mentors API, use this <a href="https://documenter.getpostman.com/view/8672875/SVfUt7Zy
  ">documentation.</a>`);
});


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

export default app;
