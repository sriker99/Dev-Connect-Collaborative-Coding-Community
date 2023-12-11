[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/hxTav0v1)
Login with your Northeastern credentials and read the Project Specifications [here](https://northeastern-my.sharepoint.com/:w:/g/personal/j_mitra_northeastern_edu/EcUflH7GXMBEjXGjx-qRQMkB7cfHNaHk9LYqeHRm7tgrKg?e=oZEef3).

Add design docs in *images/*

## Instructions to setup and run project

**Steps for setting up initial DB**: 
1) cd cs5500-final-project-sai-sanjana/server/
2) node init.js mongodb://127.0.0.1:27017/fake_so(sets up the inital data)<br/>
**Steps for starting server**:<br/>
1) start server by nodemon server.js<br/>
**Steps for running frontend**:<br/>
1) cd cs5500-final-project-sai-sanjana/client/src/
2) npm start<br/>
**Steps for running tests**:<br/>
1) cd cs5500-final-project-sai-sanjana/testing/
2) npx cypress open

   

## Sanjana's Contribution
1) Created User Authentication.
2) Created Answers, questions up and down voting functionality.
3) Implemented answers, questions pagination.
4) Implemented answer pinning functionality
5) Implemented JWT using secure cookie's
6) Contributed to above functionality cypress tests
7) Updated design documents

## Sriker's Contribution
1) Create comments page, implemented up vote functionality
2) Implemented pagination for comments page
3) Implemented Active sorting order functionality
4) Implemented Profile Page for User and Displayed User specific tags, questions and answers
5) Implemented CRUD operation on user profile page.
6) Have wriiten test cases for above functionality.

## Test cases

| Use-case Name   | Test case Name |
|-----------------|----------------|
| Home Page       | Test-1         |
|                 | Test-2         |
| Login           | Test-1         |
|                 | Test-2         |

## Design Patterns Used
We have used 
1) - Design Pattern Name: Singleton  

- Problem Solved: Creating a single db connection for whole applicationlife cycle using singelton design pattern

- Location in code where pattern is used: server.js
2) - Design Pattern Name: MVC

- Problem Solved: Creating controllers for both client and server, used model at front end and View for rendering react components 
- Location in code where pattern is used: Client and src folders
3) - Design Pattern Name: Facade design pattern

- Problem Solved: Data Access Object for server-database abstraction, ii. Utilized Redux-Thunk middleware for encapsulating API calls between components and services in the application.
- Location in code where pattern is used: DAO folder in server folders, thunks in client/src/

4) - Design Pattern Name: Provider design pattern

- Problem Solved: We have used provider design pattern to provide user login details to all the components by using useContext hook provider. This helps in maintaining user details across all components.
- Location in code where pattern is used: DAO folder in server folders, thunks in client/src/hooks/useAuthContext.js
