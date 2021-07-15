# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


















# Plan
- [X]  Fetch info from GitHub API
    - [X]  GET issues
    - [X]  Filter
        - [X]  tags = good-first-issue, help-wanted, etc
        - [X]  Custom filtering on descriptions including "YOUR_TEXT_HERE"
- [ ]  Configure refreshing API calls
    - [ ]  i.e. make sure the results update as soon as a new issue is created/tagged
    - [ ]  how do we make a continuous API call? or a call the updates once the results change?
- [ ] Set up DB Connection & Models
- [ ] Configure user profiles
    - [ ] users will need profiles, so they can see updates for more than 1 query. we can save these to their profile.
- [ ]  Configure login & user profile UI
- [ ]  Configure email notifications
- [ ]  Configure UI
    - [ ]  use react with ts
    - [ ]  simple register/login form kinda thing, users can choose what kind of issues they want to receive notifications on, enter their email, they're preferences are saved
    - [ ]  make a simple front-end that would display the issues for users to sift through, simple issue cards, scrollable
- [ ]  Configure SMS notifications (using Twilio API)
- [ ]  Configure Stripe billing for premium version
- [ ]  Deploy & Host
    - [ ]  AWS S3? Lambda? Definitely will need to research this
- [ ]  Done! 🎉 