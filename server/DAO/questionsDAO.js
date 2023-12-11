let questionsModel = require('../models/questions.js');
let answersModel = require('../models/answers.js');
let tagsModel = require('../models/tags.js');
let commentsModel = require('../models/comments.js');

let {findAndCreateTags, findAllTags} = require('./TagsDAO.js');

const createQuestions = async (question) => {
    const tags = question.tags;
    delete question.tags;
    question.active_order = question.ask_date_time;
    const createdQuestion = await questionsModel.create(question);
    const qid = createdQuestion._id;
    const tagIds = await findAndCreateTags(tags, qid);
    createdQuestion.tags = tagIds;
    await createdQuestion.save();
    const allTags = await findAllTags();
    return { question: createdQuestion, tags: allTags };
}

const updateQuestionView = async(qid) => await questionsModel.findOneAndUpdate({_id: qid}, {$inc: {views: 1}}, {new: true});

const findAllQuestions = async() => await questionsModel.find({}).populate({path:"tags", select: "_id"}).populate({path:"answers", select: "_id"}).lean().exec();

const findQuestionByID = async(qid) => await questionsModel.findOne({_id: qid}).populate("tags").populate("answers").exec();

const upvoteQuestion = async(qid) => {
    const currentTime = new Date()
    return await questionsModel.findOneAndUpdate({_id: qid}, {$inc: {votes: 1}, $set: { active_order: currentTime }}, {new: true});
}

const downvoteQuestion = async(qid) => {
    const currentTime = new Date()
    return await questionsModel.findOneAndUpdate({_id: qid}, {$inc: {votes: -1}, $set: { active_order: currentTime }}, {new: true});
}

const questionsInPage = async(skip, limit) => await questionsModel.find({}, null, {skip: skip, limit: limit});

const deleteDataByQid = async (qid) => {
    try {
        const question = await questionsModel.findById(qid);

        if (!question) {
            console.log("Question not found");
            return;
        }

        // Find all answers related to the question
        const answers = await answersModel.find({ _id: { $in: question.answers } });

        // Delete comments associated with each answer
        for (const answer of answers) {
            await commentsModel.deleteMany({ _id: { $in: answer.comments } });
            await answersModel.findByIdAndRemove(answer._id);
        }

        // Delete comments associated with the question
        await commentsModel.deleteMany({ _id: { $in: question.comments } });

        // Delete tags associated with the question's qid
        const tags = await tagsModel.find({ qid: qid });
        for (const tag of tags) {
            if (tag.qid.length === 1) {
                await tagsModel.findByIdAndRemove(tag._id);
                console.log("Tag deleted:", tag);
            } else {
                await tagsModel.findByIdAndUpdate(tag._id, { $pull: { qid: qid } });
                console.log(`Qid ${qid} removed from tag: ${tag.name}`);
            }
        }

        // Finally, delete the question itself
        const deletedQuestion = await questionsModel.findByIdAndRemove(qid);
        console.log("Question and related data deleted:", deletedQuestion);
    } catch (error) {
        console.error("Error deleting data:", error);
    }
}

const updateQuestion = async(qid, newTitle, newText, newTags) => {
    try {
        const question = await questionsModel.findById(qid);

        if (!question) {
            console.log("Question not found");
            return;
        }

        // Update title and text
        question.title = newTitle;
        question.text = newText;

        // Find existing tags associated with the question's qid
        const existingTags = await tagsModel.find({ qid: qid });

        // Create a list of existing tag names
        const existingTagNames = existingTags.map(tag => tag.name);

        // Find tags to remove (present in existing tags but not in new tags)
        const tagsToRemove = existingTagNames.filter(tagName => !newTags.includes(tagName));

        // Remove tags that are not in the new tags list
        for (const tagName of tagsToRemove) {
            const tag = existingTags.find(tag => tag.name === tagName);

            if (tag.qid.length === 1) {
                await tagsModel.findByIdAndRemove(tag._id);
                console.log("Tag deleted:", tag);
            } else {
                await tagsModel.findByIdAndUpdate(tag._id, { $pull: { qid: qid } });
                console.log(`Qid ${qid} removed from tag: ${tagName}`);
            }
        }

        // Update or create tags from newTags list
        for (const tagName of newTags) {
            let tag = await tagsModel.findOne({ name: tagName });

            if (!tag) {
                // If tag doesn't exist, create a new tag
                tag = new tagsModel({ name: tagName, qid: [qid] });
                await tag.save();
                console.log("New tag created:", tag);
            } else {
                // If tag exists, update its qid list
                if (!tag.qid.includes(qid)) {
                    tag.qid.push(qid);
                    await tag.save();
                    console.log(`Qid ${qid} added to tag: ${tagName}`);
                }
            }
        }
        question.tags = await tagsModel.find({ name: { $in: newTags } }).distinct("_id");
        // Save the updated question
        const currentTime = new Date();
        await question.findOneAndUpdate({_id: qid}, {$set: { active_order: currentTime }}, {new: true});
        const updatedQuestion = await question.save();
        console.log("Question updated:", updatedQuestion);
    } catch (error) {
        console.error("Error updating question:", error);
    }
}

module.exports = {createQuestions, updateQuestionView, findAllQuestions, findQuestionByID, upvoteQuestion, downvoteQuestion, questionsInPage, deleteDataByQid, updateQuestion};