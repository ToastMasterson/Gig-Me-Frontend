Welcome to Gig-Me!
(A work in progress)

Gig-Me is a prototype app built and designed for local musicians and bands to find events they can request to be booked for.
As a musician, I've found that the local DIY scene for musicians can be quite unorganized and chaotic.
Whether it's being booked for the "wrong type of show", not getting details on set-times, whether there is a backline or not, or just plain poor communication between a booking agent and the signed-on bands, Gig-Me is meant to serve as a solution for the common-person's professional outlet.

Just because a musician or band doesn't have dreams of full stadiums, dazzling light shows, and backup dancers does not mean they should not function professionally or be provided with professional event coordination.

This app was built with a Node.js backend that uses Express, Knex, and Objection for optimal requests and responses, and a React.js frontend for component-driven user experience that is quick and effective.

If you wish to run this code, first be sure to clone down the Backend and Frontend Repositories.
https://github.com/ToastMasterson/Gig-Me-Frontend
https://github.com/ToastMasterson/Gig-Me-Backend

Run "npm install"
then run "npm start" first on the backend, then on the frontend.

Upon launching the app you will be prompted with the option to log-in or sign-up
Both actions will run through an Auth0 secure authentication process.

Passwords are not visible to me or anyone else.

The app is loaded with example events and bands.
None of the information for Artists, Venues, or Booking Agents is valid or usable.


Thank you and hope to see you when the larger platform is complete!


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
