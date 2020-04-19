# Sales CRM Platform

## Features

- Login/sign up flow with e-mail address
- Create new email template
- Upload a sales list
- Review emails before they get sent
- Hit a button to send out all of the emails

## Installation

### App setup

1. Clone the repository from gitHub: `git clone https://github.com/hatchways/team-marinara.git`

2. Run `npm init` from the `/server` and `/client` directories to install required packages.

### mongoDB setup

3. If you do not have mongoDB installed, install mongoDB Community Edition on your machine by following the instructions [here](https://docs.mongodb.com/manual/installation/)

4. Create a database directory at `/server/database`. This will hold the database files and should not be committed to git as it will be a 300MB+ directory.

## Run the app

1. Run `npm run dev` from the `/server` directory. This will start the mongoDB server and the app server

2. Run `npm start` from the `/client` directory. This will start the React front-end app.

### Stop the app

1. Run `npm stop` from the `/server` directory to stop the mongoDB server

## Deployment setup

1. Download and install Google Cloud SDK following the instructions [here](https://cloud.google.com/sdk/docs#mac) including running `gcloud init` and logging in with your Google credentials

2. Ensure you have the `env_variables.yaml` file in /server/config/ (this contains API keys and should not be commited to git)

Note: app.yaml contains gcloud deployment settings

## Deploying

1. Run `npm build` from the /client directory to build the prodution React app

2. Deploy the app by running `gcloud app deploy` from the app's parent folder. This will update the app deployed at mailsender.dev
