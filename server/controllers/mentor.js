import { update, select } from '../helpers/sqlQuery';

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
  const rows = await select('userid, firstname, lastname, email, address, bio, occupation, expertise, ismentor', 'users', `ismentor='${true}'`);
  res.status(200).json({
    status: 200,
    data: rows,
  });
};
export const specificMentor = async (req, res) => {
  const rows = await select('userid, firstname, lastname, email, address, bio, occupation, expertise, ismentor', 'users', `userid='${req.params.userId}'`);
  res.status(200).json({
    status: 200,
    data: rows[0],
  });
};
