[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/hxTav0v1)
Login with your Northeastern credentials and read the Project Specifications [here](https://northeastern-my.sharepoint.com/:w:/g/personal/j_mitra_northeastern_edu/EcUflH7GXMBEjXGjx-qRQMkB7cfHNaHk9LYqeHRm7tgrKg?e=oZEef3).

Add design docs in *images/*

## Instructions to setup and run project

**Steps for setting up initial DB**: 
1) cd cs5500-final-project-sai-sanjana/server/<br/>
2) node init.js mongodb://127.0.0.1:27017/fake_so(sets up the inital data)<br/>
**Steps for starting server**:<br/>
1) cd cs5500-final-project-sai-sanjana/server/<br/>
2) npm install<br/>
3) start server by nodemon server.js<br/>
**Steps for running frontend**:<br/>
1) cd cs5500-final-project-sai-sanjana/client/src/
2) npm install<br/>
3) npm start<br/>
**Steps for running tests**:<br/>
1) cd cs5500-final-project-sai-sanjana/testing/<br/>
2) npx cypress open<br/>
   

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

| Use-case Name   | Test case Name                                          |
|-----------------|---------------------------------------------------------|
| Create Account  | successfully register user                              |
|                 | register user with same email                           |
|                 | register user with same username                        |
|                 | register user with invalid email                        |
|                 | register user with password as username                 |
|                 | register user with password as email                    |
|                 | register user with password mismatch                    |                
| Login           | successfully login user                                 |
|                 | login user with different username                      |
|                 | login user with invalid password                        |
| logout account  | successfully logout user                                |
| homepage(Guest) | guest user                                              |
|                 | guest user homepage                                     |
|                 | guest user homepage with no ask a question button       |
|                 | guest user homepage with no answer question button      |
|                 | Adds three questions and one answer, then click         |
|                 | "Questions", then click unanswered button, verifies     |
|                 | the sequence.                                           |
|                 | Check if questions are displayed in descending order of |
|                 | dates.                                                  |
|                 | Add question as registered user and check questions     |
|                 | along with newly added are displayed in descending order|
|                 | of dates.                                               |
| homepage(registe| Add question, click next if questions are more than 5   |
|     red)        | Add question, go to next, click previous to display     |
|                 | first Page questions.                                   |
|                 | Add question, clicking next on last page will redirect  | 
|                 | to first page.                                          |
|                 | Adds three questions and one answer, then click         |
|                 | Questions, then click unanswered button, verifies the   |
|                 | sequence.                                               |
|                 | Check if questions are displayed in descending order    |
|                 | of dates.                                               |
| Searching       | Search for a question using text content that does not  |
|                 | exist.                                                  |
|                 | Search string in question title.                        |
|                 | Search string in question text.                         |
|                 | Search string in question tag.                          |
|                 | Search string with question tag and title.              |
|                 | Search string with question tag and text.               |
|                 | Search string with question title and text.             |
|                 | Search string with question title, text and tag.        |
|                 | Search string with multiple tags.                       |
|                 | Search for a question using a tag that does not exist.  |
|                 | Search string with question title, text and tag and     |
|                 | check newest sorting order.                             |
| All tags        | Registered user - Adds a question with tags, checks the |
|                 | tags existed.                                           |
|                 | Guest user - Adds a question with tags as registered    |
|                 | user, checks the tags existed in guest user profile.    |
|                 | Checks if all tags exist.                               |
|                 | Checks if all questions exist inside tags.              |
|                 | go to question in tag react.                            |
|                 | go to question in tag storage.                          |
|                 | create a new question with a new tag and finds the      |
|                 | question through tag.                                   |
|                 | Click on tag, check if questions related to tag are     |
|                 | displayed in newest order.                              |
| New Question    | Adds Questions.                                         |
|                 | create a new question with a new tag and finds the      |
|                 | question through tag.                                   |
|                 | Guest User - Newly added question should appear with    |
|                 | list of questions.                                      |
|                 | Adds Question should display in unanswered sort.        |
|                 | Guest User - Adds Question should display on clicking   |
|                 | unanswered sort in guest user profile.                  |
|                 | Adds Question with empty title error.                   |
|                 | Adds Question with empty text error.                    |
|                 | Tries to add a question with an invalid hyperlink and   |
|                 | verifies failure.                                       |
|                 | Adds Question with tag greater than 20 error.           |
|                 | Adds Question with more than 5 tags.                    |
|                 | cannot add tags with user reputation < 50.              |
|                 | Upvote question.                                        |
|                 | Guest User - Upvoted question votes.                    |
|                 | downvote question.                                      |
|                 | Guest User - downvote question.                         |
| Answers(Guest)  | guest user homepage with no answer question button.     |
|                 | Guest User - Adds three questions and one answer.       |
|                 | Guest User - Upvoted answer votes.                      |
|                 | Guest User - Downvote answer votes.                     |
| Answers(Registe | Registered User - Upvote answer.                        |
| red)            | Registered User - downvote answer.                      |
|                 | Testing active order after adding answers.              |
|                 | Adds three questions and one answer.                    |
| Comments(Guest) | Testing adding comments and increase voting.            |
| Comments(registe| Testing adding comments and increase voting.            |
| red)            |                                                         |
| New Answer      | Adds three questions and one answer.                    |
|                 | Tries to add answer with an invalid hyperlink.          |
|                 | Testing adding comments and increase voting.            |
|                 | downvote answer.                                        |
|                 | Upvote answer.                                          |
|                 | Add answer, search string with question title, text and |
|                 | tag and check unanswered sorting order.                 |
| User profile    | Testing User Profile Questions.                         |
|                 | Testing User Tags delete.                               |
|                 | cannot add tags with user reputation < 50.              |

Note: Professor, premitted to update readme after deadline.

## Design Patterns Used
We have used 
1) - Design Pattern Name: Singleton  
- Problem Solved: Creating a single db connection for whole applicationlife cycle using singelton design pattern
- Location in code where pattern is used: server.js
  
2) - Design Pattern Name: Facade design pattern

- Problem Solved: Data Access Object for server-database abstraction, ii. Utilized Redux-Thunk middleware for encapsulating API calls between components and services in the application.
- Location in code where pattern is used: DAO folder in server folders, thunks in client/src/thunks, client/src/services

3) - Design Pattern Name: Provider design pattern

- Problem Solved: We have used provider design pattern to provide user login details to all the components by using useContext hook provider. This helps in maintaining user details across all components.
- Location in code where pattern is used: client/src/hooks/useAuthContext.js, client/src/index.js
