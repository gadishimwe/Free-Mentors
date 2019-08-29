/* eslint-disable no-console */
import express from 'express';
import morgan from 'morgan';
import user from './server/routes/user';
import mentor from './server/routes/mentor';
import session from './server/routes/session';


const app = express();
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/v1/', user);
app.use('/api/v1/', mentor);
app.use('/api/v1/', session);


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

export default app;
