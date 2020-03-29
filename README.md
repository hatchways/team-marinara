# Sales CRM Platform

## Features

- Login/sign up flow with e-mail address
- Create new email template
- Upload a sales list
- Review emails before they get sent
- Hit a button to send out all of the emails

## Installation

1. Clone the repository from gitHub: `git clone https://github.com/hatchways/team-marinara.git`

2. Run `npm init` from the `/server/` and `/client/` directories to install required packages.

### mongoDB

3. If you do not have mongoDB installed, install mongoDB Community Edition on your machine by following the instructions [here](https://docs.mongodb.com/manual/installation/)

4. Create a database directory at `/server/database`. This will hold the database files and should not be committed to git as it will be a 300MB+ directory.

### Run the app

5. Run `npm run dev` from the `/server/` directory. This will start the mongoDB server and the app server

6. Run `npm start` from the `/client/` directory. This will start the React front-end app.
