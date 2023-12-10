
const bcrypt = require('bcrypt');
const process = require('process');
let userArgs = process.argv.slice(2);

if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}

let Tag = require('./models/tags')
let Answer = require('./models/answers')
let Question = require('./models/questions')
let Comment = require('./models/comments')
let User = require('./models/users');


let mongoose = require('mongoose');
let mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const userCreate = async (username, email, password)=>{
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  
  let userdetail = {
    username: username,
    email: email,
    password: hashPassword,
  }
  
//   if (reputation != false) userdetail.reputation = reputation;
  
  let user = new User(userdetail);
  return user.save();
}

function commentCreate(text, username, votes, date){
  let commdetail = {
    text:text,
    username:username, 
    votes: votes,
    date: date
  }

  let comment = new Comment(commdetail);
  return comment.save();
}

function tagCreate(name,user) {
  let tagDetail = { name: name };
//   tagDetail.created_by = user; 
  let tag = new Tag(tagDetail);
  return tag.save();
}

function answerCreate(text, ans_by, ans_date_time, votes, comments, accept) {
  let answerdetail = {text:text};
  if (ans_by != false) answerdetail.ans_by = ans_by;
  if (ans_date_time != false) answerdetail.ans_date_time = ans_date_time;
  if (votes != false) answerdetail.votes = votes;
  if (comments != false) answerdetail.comments = comments;
  if (accept !== undefined && accept !== false) {
    answerdetail.accept = accept;
  } 

  let answer = new Answer(answerdetail);
  return answer.save();
}

function questionCreate(title, text, tags, answers, asked_by, ask_date_time, views, votes, comments) {
  let qstndetail = {
    title: title,
    text: text,
    tags: tags,
    asked_by: asked_by,
    // acceptedAnswer: acceptedAnswer,
  }
  if (answers != false) qstndetail.answers = answers;
  //if(acceptedAnswer != false) qstndetail.acceptedAnswer = acceptedAnswer;
  if (ask_date_time != false) qstndetail.ask_date_time = ask_date_time;
  if (views != false) qstndetail.views = views;
  if (votes != false) qstndetail.votes = votes;
  if (comments != false) qstndetail.comments = comments;
//   if(lastestActivityDate != false) qstndetail.lastestActivityDate = lastestActivityDate;

  let qstn = new Question(qstndetail);
  return qstn.save();
}

const populate = async () => {

    let u1 = await userCreate('Joji John', 'jj@gmail.com', 'abc@123');
    let u2 = await userCreate('saltyPeter', 'sp@gmail.com', 'abc@1234');
    let u3 = await userCreate('hamkalo', 'hm@gmail.com', 'abc@1234');
    let u4 = await userCreate('azad', 'az@gmail.com', 'abc@1234');
    let u5 = await userCreate('abaya', 'ab@gmail.com', 'abc@1234');
    let u6 = await userCreate('alia', 'al@gmail.com', 'abc@1234');
    let u7 = await userCreate('sana', 'sn@gmail.com', 'abc@1234');
    console.log("USERS CREATED");

//   let u1 = await userCreate('Joji John', 'jj@gmail.com', 'abc@123', new Date('2022-11-01').toString(), 51);
//   let u2 = await userCreate('saltyPeter', 'sp@gmail.com', 'abc@1234', new Date('2023-12-01').toString(), 51);
//   let u3 = await userCreate('hamkalo', 'hm@gmail.com', 'abc@1234', new Date('2023-11-01').toString(), 51);
//   let u4 = await userCreate('azad', 'az@gmail.com', 'abc@1234', new Date('2023-05-01').toString(), 49);
//   let u5 = await userCreate('abaya', 'ab@gmail.com', 'abc@1234', new Date('2022-02-01').toString(), 51);
//   let u6 = await userCreate('alia', 'al@gmail.com', 'abc@1234', new Date('2023-12-01').toString(), 51);
//   let u7 = await userCreate('sana', 'sn@gmail.com', 'abc@1234', new Date('2023-12-01').toString(), 51);
//   console.log("USERS CREATED");

  let c1 = await commentCreate('good comment question', 'Joji John', 1, new Date('2022-11-01T15:24:19').toString());
  let c2 = await commentCreate('good comment answer', 'hamkalo', 0, new Date('2023-11-01T15:24:19').toString());
  let c3 = await commentCreate('good comment answer again', 'hamkalo', 0, new Date('2023-11-01T15:24:19').toString());

  console.log("COMMENTS CREATED");

  let t1 = await tagCreate('react');
  let t2 = await tagCreate('javascript');
  let t3 = await tagCreate('android-studio');
  let t4 = await tagCreate('shared-preferences');
  console.log("Tags CREATED");

//   let t1 = await tagCreate('react',u1);
//   let t2 = await tagCreate('javascript',u1);
//   let t3 = await tagCreate('android-studio',u1);
//   let t4 = await tagCreate('shared-preferences',u2);
//   console.log("Tags CREATED");

  let a1 = await answerCreate('React Router is mostly a wrapper around the history library. history handles interaction with the browser\'s window.history for you with its browser and hash histories. It also provides a memory history which is useful for environments that don\'t have a global history. This is particularly useful in mobile app development (react-native) and unit testing with Node.', 'hamkalo', new Date('2023-11-20T03:24:42').toString(), 10, c2);
  let a2 = await answerCreate('On my end, I like to have a single history object that I can carry even outside components. I like to have a single history.js file that I import on demand, and just manipulate it. You just have to change BrowserRouter to Router, and specify the history prop. This doesn\'t change anything for you, except that you have your own history object that you can manipulate as you want. You need to install history, the library used by react-router.', 'azad', new Date('2023-11-25T08:24:00').toString(), 32, c1, true);
  let a3 = await answerCreate('Consider using apply() instead; commit writes its data to persistent storage immediately, whereas apply will handle it in the background.', 'abaya', new Date('2023-11-18T09:24:00').toString(), 22, c1);
  let a4 = await answerCreate('YourPreference yourPrefrence = YourPreference.getInstance(context); yourPreference.saveData(YOUR_KEY,YOUR_VALUE);', 'alia', new Date('2023-11-12T03:30:00').toString(), 5, c1);
  let a5 = await answerCreate('I just found all the above examples just too confusing, so I wrote my own. ', 'sana', new Date('2023-11-01T15:24:19').toString(), 45, c3);
  console.log("ANSWERS CREATED");

//   let a1 = await answerCreate('React Router is mostly a wrapper around the history library. history handles interaction with the browser\'s window.history for you with its browser and hash histories. It also provides a memory history which is useful for environments that don\'t have a global history. This is particularly useful in mobile app development (react-native) and unit testing with Node.', u3, new Date('2023-11-20T03:24:42').toString(), 1, c3);
//   let a2 = await answerCreate('On my end, I like to have a single history object that I can carry even outside components. I like to have a single history.js file that I import on demand, and just manipulate it. You just have to change BrowserRouter to Router, and specify the history prop. This doesn\'t change anything for you, except that you have your own history object that you can manipulate as you want. You need to install history, the library used by react-router.', u4, new Date('2023-11-25T08:24:00').toString(), 1, c2);
//   let a3 = await answerCreate('Consider using apply() instead; commit writes its data to persistent storage immediately, whereas apply will handle it in the background.', u5 , new Date('2023-11-18T09:24:00').toString(), 1, c1);
//   let a4 = await answerCreate('YourPreference yourPrefrence = YourPreference.getInstance(context); yourPreference.saveData(YOUR_KEY,YOUR_VALUE);', u6 , new Date('2023-11-12T03:30:00').toString(), 1, c2);
//   let a5 = await answerCreate('I just found all the above examples just too confusing, so I wrote my own. ', u7 , new Date('2023-11-01T15:24:19').toString(), 1, c1);
//   console.log("ANSWERS CREATED");

  await questionCreate('Programmatically navigate using React router', 'the alert shows the proper index for the li clicked, and when I alert the variable within the last function I\'m calling, moveToNextImage(stepClicked), the same value shows but the animation isn\'t happening. This works many other ways, but I\'m trying to pass the index value of the list item clicked to use for the math to calculate.', [t1, t2], [a1, a2], 'Joji John', new Date('2022-01-20T03:24:00').toString(), 50, 25, c1);
  await questionCreate('android studio save string shared preference, start activity and load the saved string', 'I am using bottom navigation view but am using custom navigation, so my fragments are not recreated every time i switch to a different view. I just hide/show my fragments depending on the icon selected. The problem i am facing is that whenever a config change happens (dark/light theme), my app crashes. I have 2 fragments in this activity and the below code is what i am using to refrain them from being recreated.', [t3, t4, t2], [a3, a4, a5], 'saltyPeter', new Date('2023-10-01T11:24:30').toString(), 121, 55, c2);
  console.log("Questions CREATED");

  if(db) db.close();
  console.log('done');
}

populate()
  .catch((err) => {
    console.log('ERROR: ' + err);
    if(db) db.close();
  });

console.log('processing ...');