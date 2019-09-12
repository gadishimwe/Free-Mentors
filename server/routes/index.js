import express from 'express';
import user from './user';
import mentor from './mentor';
import session from './session';

const app = express();

app.use('/api/v1/', user);
app.use('/api/v1/', mentor);
app.use('/api/v1/', session);
app.get('/', (req, res) => {
  res.status(200);
  res.setHeader('Content-Type', 'text/html;charset=utf8');
  res.end(`<h1>WELCOME TO FREE MENTORS</h1>\nTo get started with Free Mentors API, use this <a href="https://documenter.getpostman.com/view/8672875/SVfUt7Zy
      ">documentation.</a>`);
});
app.use((req, res) => res.status(400).json({
  status: 400,
  data: 'No such endpoint',
}));


export default app;
