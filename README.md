
# Charity Plus - Website for NPO/NGO/Charitable Organisation

A website where organizations can create posts for their upcoming charity events and write about popular work they do.
Any user can remotely contribute to these events by posting their work under the contributions section of the event which are later verified by the organization. 
The work of one user inspires other users to do the same.

## Types of Account
* User
* Organization

## User Permissions
A user can
* register themselves on the website
* create a user profile
* edit their profile
* like/dislike a post/event
* comment on a post
* contribute to an event
* delete their comment/contribution
* like/dislike comment of other users/organizations
* like/dislike contributions of other users
* follow/unfollow an organization
* view profile of other users/organizations

## Organization Permissions
An Organization can
* register themselves on the website
* create their profile with details such as their location,website, bio, social media handles.
* edit their profile
* create an event/post
* delete their event/post
* approve a user's contribution
* deny a user's contribution
* comment on a post/event
* like/Dislike a post/event
* like/dislike comment of other users/organizations
* like/dislike contributions of other users
* follow/unfollow other organizations
* view profile of other users/organizations


## Features
* Every post on feed is tagged to differentiate between post & event.
* Every discussion to a post/event is tagged to differentiate between comment & contribution.
* Every contribution is tagged to show the approved/pending approval status.
* A user profile shows the username, handle, location, about, social media handles, list of following and recent comments/contributions.
* An organization profile shows the username, handle, location, about, website link, social media handles, list of followers and recent posts/events.
* A notification is sent to organization when someone follows them or when a comment/contribution is made to their post/event.
* A notification is sent to user when an organization followed by them creates a post/event or when their contribution is approved/denied by the organization.
* A star rating system for users which increases by 1 when their contribution is approved and decreases by 1 if the user deletes an approved contribution.
* A activity rating system for organization which increases by 1 when they create a new post/event and decreases by 1 if they delete it.
* A leaderboard showing the list of users in descending order of their monthly stars by default.
* Leaderboard can be toggled to shows the users in ascending/descending order of their all time stars or monthly stars.
## View live App

Hosted at **https://charityplus.onrender.com**


## Tech Stack Used

### The MERN Stack

* [MongoDB](https://docs.mongodb.com/) - Document database - to store data as JSON 
* [Express.js](https://devdocs.io/express/) - Back-end web application framework running on top of Node.js
* [React](https://reactjs.org/docs/) - Front-end web app framework used
* [Node.js](https://nodejs.org/en/docs/) - JavaScript runtime environment 

### Middleware

* [Redux](https://redux.js.org/basics/usage-with-react) - State management tool used with React
* [Mongoose](https://mongoosejs.com/docs/guide.html) - ODM for MongoDB
* [Cloudinary](https://cloudinary.com/documentation) - Cloud server to store the images

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Your machine should have npm and node.js installed to use it locally.

### Setup and Installation


1. First fork the repo to your account.  
   Go to the forked repo and clone it to your local machine:

```sh
git clone https://github.com/Your_Username/charityplus.git
```

This will make a copy of the code to your local machine.

2. Now move to the `charityplus` directory.

```sh
cd charityplus
```

3. Now check the remote of your local code by:

```sh
git remote -v
```

The response should look like:

```sh
origin	https://github.com/Your_Username/charityplus.git (fetch)
origin	https://github.com/Your_Username/charityplus.git (push)
```

To add upstream to remote, run:

```sh
git remote add upstream https://github.com/milan0027/charityplus.git
```

Again run `git remote -v`, the response should look like:

```sh
origin	https://github.com/Your_Username/charityplus.git (fetch)
origin	https://github.com/Your_Username/charityplus.git (push)
upstream	https://github.com/milan0027/charityplus (fetch)
upstream	https://github.com/milan0027/charityplus (push)
```

4. Once the remote is set, install all the necessary dependencies by the following command:

```sh
npm install
```
5. Move to `client` folder and install all the necessary dependencies by the following command:

```sh
cd client
npm install
cd ..
```

6. Create a `.env` file in the `charityplus` directory and add the following
```sh
DB_URL=YOUR_MONGODB_URL
```

### Run locally

Run the below command to start the app:

```sh
npm run dev
```
* The **server** runs on port **6000**
* The **client** side runs on port **3000**
* Both client and server must run **concurrently.**
**Go to: [http://localhost:3000](http://localhost:3000)**


## Deployment

1. Add the following lines to server.js :

```(JavaScript)
// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }
```
2. Add the following script to the package.json of server

```(JSON)
"heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"
```

3. Install Heroku CLI and make sure you have intialised a git repository in the project directory. Enter the following commands in the terminal :

```(bash)
heroku login
heroku create
git add .
git commit -am "Deployed to Heroku"
git push heroku master
```
4. Open your heroku account and in settings configure **MongoURI** variable.
5. Open your heroku account and click on **Open App** option in the dashboard.
