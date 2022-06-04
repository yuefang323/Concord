<h1 align="center">Concord</ha>

<h3 align="center">A Place where just you and a handful of friends can spend time together. A place that makes it easy to talk every day and hang out more often.</h3>

<p align="center"><a  href="https://go-concord.herokuapp.com">Concord Live Demo</a></p>

### Splash page

### Join servers and chat in channels

### Create and manage your own server

### Private Messaging

### Discover Guilds

## Concord at a Glance

Concord is a full stack application that allows users to meet new friends, chat, and spend time together. Users are required to sige up for an account to use any of the services. At Concord, users can join servers who share the commen interests, chat instantly, and add other members to their own private chat. Users can also create their own server, manage members, and create channels under the server so they can chat about variouse topics.

At Concord, you will never be alone.

## Getting started

1. Clone this repository

```
git clone git@github.com:yuefang323/Concord.git
```

2. Install dependencies

- In root folder, install Python server.

```
pipenv install
```

- Navigate to React-app folder, install React

```
cd React-app
npm install
```

3. Setup your PostgreSQL user, password and database

```
psql
CREATE USER concord_app WITH PASSWORD 'password';
CREATE DATABASE concord_app WITH OWNER concord_app;

```

4. create a .env file in root folder, based on the .env.example with proper settings for your development environment

5. Migrate and seed your database in root folder

```
pipenv run flask db upgrade
pipenv run flask seed all

```

6. Start the server

- In root folder

```
pipenv run flask run
```

- Navigate to React-app folder

```
npm start
```

7. Have fun!

## Application Architecture

Concord is built on React and Redux frontend with Python Flask backend, using PostgresSQL as a database.

### Techonologies Used

- [React.js](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [Javascript](https://www.javascript.com/)
- [Socket.io](https://socket.io)
- [AWS S3](https://aws.amazon.com/s3/)

- [Python](https://www.python.org/)
- [Flask](https://flask.palletsprojects.com/en/2.1.x/)
- [Flask SQL Alchmeny](https://flask-sqlalchemy.palletsprojects.com/en/2.x/)
- [Flask Alembic](https://flask-alembic.readthedocs.io/en/stable/)
- [Flask Socket.io](https://flask-socketio.readthedocs.io/en/latest/)
- [PostgresSQL](https://www.postgresql.org/)
- [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)

## Concclusion and Next Steps

The next step for Concord is to implement user online/offline features, and adding voice chat so users can create voice chat channels.

## Contact Team Members

- Fang Yue
- Frances (Huang) Lau <a href="https://www.linkedin.com/in/frances-huang-660607156">Linkedin</a> | <a href="https://github.com/frances-y-h">Github</a>
- Lincoln Her
