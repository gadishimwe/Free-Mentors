/* eslint-disable radix */

import users from '../models/users';
import mentors from '../models/mentors';

exports.userChangeToMentor = (req, res) => {
  const user = users.find((usr) => usr.userId === parseInt(req.params.userId));
  if (!user) {
    return res.status(401).json({
      status: 401,
      error: 'This user does not exist.',
    });
  }
  if (user.isMentor === true) {
    return res.status(401).json({
      status: 401,
      error: 'This user is already a mentor',
    });
  }
  const userIndex = users.findIndex((usr) => usr.userId === parseInt(req.params.userId));
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
exports.allMentors = (req, res) => {
  res.status(200).json({
    status: 200,
    data: mentors,
  });
};
exports.specificMentor = (req, res) => {
  const mentor = mentors.find((mntr) => mntr.mentorId === parseInt(req.params.mentorId));
  if (!mentor) {
    return res.status(401).json({
      status: 401,
      error: 'This mentor does not exist.',
    });
  }
  res.status(200).json({
    status: 200,
    data: mentor,
  });
};
