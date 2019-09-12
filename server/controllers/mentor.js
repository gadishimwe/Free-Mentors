import { update } from '../helpers/sqlQuery';
import mentors from '../models/mentors';

export const userChangeToMentor = async (req, res) => {
  await update('users', `ismentor=${true}`, `userid='${req.params.userId}'`);
  res.status(200).json({
    status: 200,
    data: {
      message: 'User account changed to mentor',
    },
  });
};
export const allMentors = (req, res) => {
  const mentorsModel = mentors;
  mentorsModel.forEach((mentorModel) => {
    delete mentorModel.password;
  });
  res.status(200).json({
    status: 200,
    data: mentorsModel,
  });
};
export const specificMentor = (req, res) => {
  const mentor = mentors.find((mntr) => mntr.mentorId === parseInt(req.params.mentorId, 10));
  const mentorModel = mentor;
  delete mentorModel.password;
  res.status(200).json({
    status: 200,
    data: mentorModel,
  });
};
