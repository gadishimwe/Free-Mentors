/* eslint-disable no-console */
import express from 'express';
import user from './user';
import mentor from './mentor';
import session from './session';

const app = express();

app.use('/api/v1/', user);
app.use('/api/v1/', mentor);
app.use('/api/v1/', session);


export default app;
