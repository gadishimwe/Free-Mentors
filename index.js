/* eslint-disable no-console */
import express from 'express';
import morgan from 'morgan';
import users from './server/routes/user';


const app = express();
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/v1/', users);


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
