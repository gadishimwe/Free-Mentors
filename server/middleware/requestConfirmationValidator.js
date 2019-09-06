import sessions from '../models/sessions';
import users from '../models/users';
import mentors from '../models/mentors';

export default (req, res, next) => {
  const session = sessions.find((sssn) => sssn.sessionId === parseInt(req.params.sessionId));
  if (!session) {
    return res.status(404).json({
      status: 404,
      error: 'This session does not exist.',
    });
  }
  const mentor = mentors.find((mntr) => mntr.mentorId === session.mentorId);
  const mentorUser = users.find((usr) => usr.email === mentor.email);
  if (mentorUser.userId !== req.userData.userId) {
    return res.status(404).json({
      status: 404,
      error: `You don't have a session with id ${session.sessionId}.`,
    });
  }
  if (session.status === 'accepted' || session.status === 'rejected') {
    return res.status(422).json({
      status: 422,
      error: `This session is already ${session.status}`,
    });
  }
  next();
};
