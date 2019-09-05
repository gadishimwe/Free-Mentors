# Free-Mentors
[![Maintainability](https://api.codeclimate.com/v1/badges/0269b0ef0bcae5307e55/maintainability)](https://codeclimate.com/github/gadishimwe/Free-Mentors/maintainability)
[![Build Status](https://travis-ci.org/gadishimwe/Free-Mentors.svg?branch=develop)](https://travis-ci.org/gadishimwe/Free-Mentors)
[![Coverage Status](https://coveralls.io/repos/github/gadishimwe/Free-Mentors/badge.svg?branch=develop)](https://coveralls.io/github/gadishimwe/Free-Mentors?branch=develop)


>Free Mentors is a social initiative where accomplished professionals become role models to young people to provide free mentorship sessions.

## Free mentors UI templates are hosted [here](https://gadishimwe.github.io/Free-Mentors/) on gh-pages.

#### N.B: To be able to access admin panel and mentor homepage pages, you have to use this credentials.
* For admin:
    * Email: *admin@freementors.com*
    * Password: admin@123
* For a mentor:
    * Email: *mentor@freementors.com*
    * Password: mentor@123
## Free mentors API Endpoints are hosted on [Heroku](https://gad-free-mentors.herokuapp.com/).
To make requests to the API Endpoints easely, you can use [Postman](https://www.getpostman.com)
### Available API Endpoints    
    
|HTTP Method|Endpoint |Description|
|:----------|:---------|:------------|
|GET  |/|Root of API and link to the Documentation
|POST |/api/v1/auth/signup | User can create an account|
|POST |/api/v1/auth/signin | User can sign in |
|PATCH|/api/v1/user/:userId|Admin can change a user to mentor
|GET  |/api/v1/mentors  |user can view all mentors
|GET  |/api/v1/mentors/:mentorId| User can view specific mentor
|POST |/api//v1/sessions |User can create a mentorship session
|PATCH |/api/v1/sessions/:sessionId/accept|A mentor can accept a mentorship session request
|PATCH |/api/v1/sessions/:sessionId/reject|A mentor can reject a mentorship session request
|GET |/api/v1/sessions|Get all mentorship session requests for mentee or mentor
|POST |/api/v1/sessions/:sessionId/review|Review a mentor after a mentorship session
|DELETE |/api/v1/sessions/:sessionId/review|Admin can delete mentorship session review

## Installation
```
$ git clone https://github.com/gadishimwe/Free-Mentors.git
$ cd Free-Mentors
$ npm install
```
## To run the app
```
$ npm run dev
```
## To run the test
```
$ npm run test
```

## Tools and Technologies used
#### Built with
- [Nodejs](https://www.nodejs.org)
- [Expressjs](https://www.expressjs.com)

#### Unit tested with
- [Mocha](https://www.mochajs.org) and [Chai](chaijs.com)
- [Postman](https://www.getpostman.com)

#### Continuous integration and test coverage
- [Travis Ci](https://www.travis-ci.org) for CI
- [Coveralls](https://www.coveralls.io) for test coverage


## Author:
#### Gad Ishimwe
