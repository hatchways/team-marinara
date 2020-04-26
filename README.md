# Sales CRM Platform

## Features

- Login/sign up flow with e-mail address
- Authorize with Gmail
- Create new email template with variables
- Upload a sales list in csv or input via form
- Review emails before they get sent
- Hit a button to send out all of the emails
- Track replies in dashboard

## Installation

### App setup

1. Clone the repository from gitHub: `git clone https://github.com/hatchways/team-marinara.git`

2. Run `npm init` from the `/server` and `/client` directories to install required packages.

### mongoDB setup

3. If you do not have mongoDB installed, install mongoDB Community Edition on your machine by following the instructions [here](https://docs.mongodb.com/manual/installation/)

4. Create a database directory at `/server/database`. This will hold the database files and should not be committed to git as it will be a 300MB+ directory.

### Redis setup

5. If you do not have Redis installed, download it from [here](https://redis.io/download) or run `brew install redis` on mac

## Run the app

1. Run `npm run dev` from the `/server` directory. This will start the mongoDB server, the Redis server and the app server

2. Run `npm start` from the `/client` directory. This will start the React front-end app.

### Stop the app

1. Run `npm stop` from the `/server` directory to stop the mongoDB and Redis servers

## Deployment setup

1. Download and install Google Cloud SDK following the instructions [here](https://cloud.google.com/sdk/docs#mac) including running `gcloud init` and logging in with your Google credentials

2. Ensure you have the `env_variables.yaml` file in /server/config/ (this contains API keys and should not be commited to git)

### Notes:

- app.yaml contains gcloud deployment settings
- The MongoDB database can be accessed at [cloud.mongodb.com](cloud.mongodb.com) The project is called Mail Sender.
- The project is hosted on GCP App Engine and can be managed at [console.cloud.google.com](console.cloud.google.com). The project is called Mail Sender
- The Redis database can be accessed at [app.redislabs.com](app.redislabs.com)

## Deploying

1. Run `npm build` from the /client directory to build the prodution React app

2. Ensure package.json in the project root contains all server dependencies. App Engine uses the package.json file in the project root directory to install dependencies in the hosting container and starts the server with the `npm start` script in this file.

3. Deploy the app by running `gcloud app deploy` from the app's parent folder. This will update the app deployed at mailsender.dev
