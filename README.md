# Lickstagram

#### _May 2020_
#### By _**Joseph Wangemann**_

## Description
_Instagram-like app that allows users to share short videos of playing a musical instrument (licks).  A user can register, login and logout.  A logged-in user can post videos, edit their videos, see the feed of all users' videos, star/unstar videos, and see a list of videos they have starred._

## Specs / Screen Shots
* On page load, a user will see the sign-in page.  If the user isn't registered, the link at the bottom will bring up the registration page.
![Signin](./src/assets/loginview.png?raw=true "Sign in view")
* If a user is already registered, the link at the bottom will return to the sign-in page.
![Register](./src/assets/registerview.png?raw=true "Register view" | width=20)
* After sign-in, the main video feed will be shown.  All user videos are able to be viewed and starred. The icons on the left allow navigation to account and main feed, and the bottom icon (plus sign) is the button to add a video.
![Feed](./src/assets/feedview.png?raw=true "Main feed")
* In account view, a user can sign out, delete their account, edit/delete their own videos, and see their list of starred videos.
![Acct](./src/assets/accountview.png?raw=true "Account view")

## Installation/Setup Instructions
This project uses MongoDb Atlas as a database and Express-Sessions for authentication persistence.  It requires a user to create a .env file in the root directory of this project which will contain three values:
  * CONNECTION_STRING = 'Your unique connection string from MongoDb Atlas goes here'
  * SESSION_SECRET = 'Your unique session secret goes here. It can be any string'
  * apiPort = Whatever port you want the back-end to run on goes here. It will be a number, not a string. Example: 8000

To run this project, you will:
  * Get a connection string from MongoDb Atlas
  * Clone the repository: `git clone https://github.com/fractalscape13/lickstagram`
  * In the root project directory, run `npm install` to install all dependencies. 
  * You will open two terminals and navigate to the root directory.  In one terminal you will run the back-end `npx nodemon`, and in the other you will run the front-end `npm start`
  *Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Technologies Used
* React
* create-react-app
* Redux / React-Redux
* React-Router
* Express
* Node
* Nodemon
* MongoDb
* Mongoose
* Bcrypt
* Axios
* Multer
* Body Parser
* Cors
* Dotenv
* React-Icons

## Known Bugs/Contact

_If you have any questions or comments at all, please submit a pull request._

### License

*This webpage is licensed under the MIT license.*

Copyright (c) 2020 **_Joseph Wangemann**
