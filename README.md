# blog-site

A basic CMS blog site developed by Skyler Blakeslee.

URL: https://dry-sierra-40120.herokuapp.com/
Git Repository: https://github.com/skyler-blakeslee/blog-site

## Table of Contents
- [Description](#description)
- [Major Technologies](#major_technologies)
- [All Dependencies](#all_dependencies)
- [Installation](#installation)
- [Screenshots](#screenshots)


## Description

This project demonstrates the basic functionality of a CMS (Content Management System) blog site. Users are able to create accounts and generate blog posts from a personal profile page, where all the users current posts are visible and may be deleted if desired. All active posts by all users will appear on the main page in the order they are created. Visitors may follow individual links to view post body, and logged-in users may leave comments which will appear below the posting body and be visible to all visitors.

This project was developed following the MVC (Model View Controller) paradigm. User, post, and comment data is stored in a mySQL database  (blog_db). Use passwords are hashed using bcrypt. Express and Sequelize node packages are used for routing and ORM. HTML is dynamically generated using the express-handlebars templating engine. This application is currently deployed to Heroku.

## Major_Technologies

- Node.js
- MySQL

### All_Dependencies

- bcrypt
- connect-session-sequelize
- dotenv
- express
- express-handlebars
- express-session
- mysql2
- sequelize

## Installation

To run this application using node.js:

- clone repository from gitHub
- generate "blog_db" mySQL database using code found in db/schema.sql
- create a .env file in root folder with the following information:
    DB_NAME=blog_db
    DB_PASSWORD=[your mySQL password]
    DB_USER=[your mySQL username]
- update db port in /config/connection.js
- update server port in server.js
- install dependencies listed in package.json - npm i
- run /seeds/seed.js to pre-populate database - node .\seeds\seed.js
- run server.js - npm start

## Screenshots

### home page
![home page image](./images/blog-home.png)

### login/create account
![login image](./images/login-create-account.png)

### profile/new post
![profile image](./images/blog-profile.png)

### post/new comment
![post image](./images/blog-post.png)