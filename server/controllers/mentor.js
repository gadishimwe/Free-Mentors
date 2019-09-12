import { update, select } from '../helpers/sqlQuery';
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
export const allMentors = async (req, res) => {
  const rows = await select('*', 'users', `ismentor='${true}'`);
  res.status(200).json({
    status: 200,
    data: rows,
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
