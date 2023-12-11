
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

const userCreate = async (username, email, password, joined_date, reputation)=>{
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  
  let userdetail = {
    username: username,
    email: email,
    password: hashPassword,
    joined_date: joined_date,
    reputation: reputation
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

function tagCreate(name, qid) {
  let tagDetail = { 
    name: name,
    qid: qid
   };

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
  if (ask_date_time != false) qstndetail.ask_date_time = ask_date_time;
  if (views != false) qstndetail.views = views;
  if (votes != false) qstndetail.votes = votes;
  if (comments != false) qstndetail.comments = comments;
  qstndetail.active_order = new Date().toString();
  
//   if(lastestActivityDate != false) qstndetail.lastestActivityDate = lastestActivityDate;

   let question = new Question(qstndetail);
   return question.save();
}

const populate = async () => {

  let u1 = await userCreate('Joji John', 'jj@gmail.com', 'abc@123', new Date('2022-11-01').toString(), 45);
  let u2 = await userCreate('saltyPeter', 'sp@gmail.com', 'abc@1234', new Date('2023-12-01').toString(), 32);
  let u3 = await userCreate('hamkalo', 'hm@gmail.com', 'abc@1234', new Date('2023-11-01').toString(), 50);
  let u4 = await userCreate('azad', 'az@gmail.com', 'abc@1234', new Date('2023-05-01').toString(), 49);
  let u5 = await userCreate('abaya', 'ab@gmail.com', 'abc@1234', new Date('2022-02-01').toString(), 100);
  let u6 = await userCreate('alia', 'al@gmail.com', 'abc@1234', new Date('2023-12-01').toString(), 75);
  let u7 = await userCreate('sana', 'sn@gmail.com', 'abc@1234', new Date('2023-12-01').toString(), 65);
  console.log("USERS CREATED");

  await u1.save();
  await u2.save();
  await u3.save();
  await u4.save();
  await u5.save();
  await u6.save();
  await u7.save();

  let c1 = await commentCreate('good comment question', 'Joji John', 1, new Date('2022-11-01T15:24:19').toString());
  let c2 = await commentCreate('good comment answer', 'hamkalo', 0, new Date('2023-11-01T15:24:19').toString());
  let c3 = await commentCreate('good comment answer again', 'hamkalo', 0, new Date('2023-11-01T15:24:19').toString());
  console.log("COMMENTS CREATED");

  let a1 = await answerCreate('React Router is mostly a wrapper around the history library. history handles interaction with the browser\'s window.history for you with its browser and hash histories. It also provides a memory history which is useful for environments that don\'t have a global history. This is particularly useful in mobile app development (react-native) and unit testing with Node.', 'hamkalo', new Date('2023-11-20T03:24:42').toString(), 10, [c2]);
  let a2 = await answerCreate('On my end, I like to have a single history object that I can carry even outside components. I like to have a single history.js file that I import on demand, and just manipulate it. You just have to change BrowserRouter to Router, and specify the history prop. This doesn\'t change anything for you, except that you have your own history object that you can manipulate as you want. You need to install history, the library used by react-router.', 'azad', new Date('2023-11-25T08:24:00').toString(), 32, [c1], true);
  let a3 = await answerCreate('Consider using apply() instead; commit writes its data to persistent storage immediately, whereas apply will handle it in the background.', 'abaya', new Date('2023-11-18T09:24:00').toString(), 22, [c1]);
  let a4 = await answerCreate('YourPreference yourPrefrence = YourPreference.getInstance(context); yourPreference.saveData(YOUR_KEY,YOUR_VALUE);', 'alia', new Date('2023-11-12T03:30:00').toString(), 5, [c1]);
  let a5 = await answerCreate('I just found all the above examples just too confusing, so I wrote my own. ', 'sana', new Date('2023-11-01T15:24:19').toString(), 45, [c3]);
  let a6 = await answerCreate('Storing content as BLOBs in databases.', 'abhi3241', new Date('2023-02-19T18:20:59').toString(), 15, [c1]);
  let a7 = await answerCreate('Using GridFS to chunk and store content.', 'mackson3332', new Date('2023-02-22T17:19:00'), 80, []);
  let a8 = await answerCreate('Store data in a SQLLite database.', 'ihba001', new Date('2023-03-22T21:17:53'), 35, []);
  console.log("ANSWERS CREATED");

  let t1 = await tagCreate('react',[]);
  let t2 = await tagCreate('javascript',[]);
  let t3 = await tagCreate('android-studio',[]);
  let t4 = await tagCreate('shared-preferences',[]);
  let t5 = await tagCreate('storage', []);
  let t6 = await tagCreate('website', []);
  let t7 = await tagCreate('Flutter', []);
  console.log("Tags CREATED");


  let q1 = await questionCreate('Programmatically navigate using React router', 'the alert shows the proper index for the li clicked, and when I alert the variable within the last function Im calling, moveToNextImage(stepClicked), the same value shows but the animation isnt happening. This works many other ways, but Im trying to pass the index value of the list item clicked to use for the math to calculate.', [], [a1, a2], 'Joji John', new Date('2022-01-20T03:00:00'), 10, 25, [c1]);
  let q2 = await questionCreate('android studio save string shared preference, start activity and load the saved string', 'I am using bottom navigation view but am using custom navigation, so my fragments are not recreated every time i switch to a different view. I just hide/show my fragments depending on the icon selected. The problem i am facing is that whenever a config change happens (dark/light theme), my app crashes. I have 2 fragments in this activity and the below code is what i am using to refrain them from being recreated.', [], [a3, a4, a5], 'saltyPeter', new Date('2023-01-10T11:24:30'), 121, 55, [c2]);
  let q3 = await questionCreate('Object storage for a web application', 'I am currently working on a website where, roughly 40 million documents and images should be served to its users. I need suggestions on which method is the most suitable for storing content with subject to these requirements.', [], [a6, a7], 'monkeyABC', new Date('2023-02-18T01:02:15'), 200, 50, []);
  let q4 = await questionCreate('Quick question about storage on android', 'I would like to know the best way to go about storing an array on an android phone so that even when the app/activity ended the data remains', [], [a8], 'elephantCDE', new Date('2023-03-10T14:28:01'), 103, 100, [c2]);
  console.log("Questions CREATED");

  t1.qid.push(q2)
  t2.qid.push(q1);
  t3.qid.push(q2);
  t4.qid.push(q2);
  t5.qid.push(q3);
  t6.qid.push(q3);
  t7.qid.push(q4);

// Save the updated tags
  await t1.save();
  await t2.save();
  await t3.save();
  await t4.save();
  await t5.save();
  await t6.save();
  await t7.save();

// Update the questions with tags
  q1.tags.push(t1);
  q1.tags.push(t2)
  q2.tags.push(t4);
  q2.tags.push(t2);
  q2.tags.push(t3);
  q3.tags.push(t5);
  q3.tags.push(t6);
  q4.tags.push(t3);
  q4.tags.push(t4);
  q4.tags.push(t5);

  // Save the updated questions
  await q1.save();
  await q2.save();
  await q3.save();
  await q4.save();

 
  if(db) db.close();
  console.log('done');
}

populate()
  .catch((err) => {
    console.log('ERROR: ' + err);
    if(db) db.close();
  });

console.log('processing ...');