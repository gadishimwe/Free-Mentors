/* eslint-disable no-console */
import express from 'express';
import morgan from 'morgan';


const app = express();
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/v1/', require('./server/routes/user'));


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
