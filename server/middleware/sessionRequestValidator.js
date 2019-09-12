import { select } from '../helpers/sqlQuery';

export default async (req, res, next) => {
  if (!req.body.mentorId) {
    return res.status(400).json({
      status: 400,
      error: 'MentorId is required. Please provide it.',
    });
  }
  if (!req.body.questions) {
    return res.status(400).json({
      status: 400,
      error: 'Questions are required. Please provide them.',
    });
  }

  const mentor = await select('userid', 'users', `userid='${req.body.mentorId}' AND ismentor=${true}`);
  if (!mentor[0]) {
    return res.status(404).json({
      status: 404,
      error: 'Mentor you entered does not exist.',
    });
  }

  const isSessionExist = await select('sessionid', 'sessions', `menteeid='${req.userData.userId}' AND mentorid='${mentor[0].userid}'`);
  if (isSessionExist[0]) {
    return res.status(422).json({
      status: 422,
      error: 'Session request already sent.',
    });
  }
  next();
};
