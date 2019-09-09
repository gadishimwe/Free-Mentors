import users from '../models/users';
import mentors from '../models/mentors';

export const userChangeToMentor = (req, res) => {
  const user = users.find((usr) => usr.userId === parseInt(req.params.userId, 10));
  if (!user) {
    return res.status(404).json({
      status: 404,
      error: 'This user does not exist.',
    });
  }
  if (user.isMentor === true) {
    return res.status(422).json({
      status: 422,
      error: 'This user is already a mentor',
    });
  }
  const userIndex = users.findIndex((usr) => usr.userId === parseInt(req.params.userId, 10));
  users[userIndex].isMentor = true;

  const newMentor = {
    mentorId: mentors.length + 1,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: user.password,
    address: user.address,
    bio: user.bio,
    occupation: user.occupation,
    expertise: user.expertise,
    isAdmin: false,
    isMentor: user.isMentor,
  };
  mentors.push(newMentor);
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
  if (!mentor) {
    return res.status(404).json({
      status: 404,
      error: 'This mentor does not exist.',
    });
  }
  const mentorModel = mentor;
  delete mentorModel.password;
  res.status(200).json({
    status: 200,
    data: mentorModel,
  });
};
