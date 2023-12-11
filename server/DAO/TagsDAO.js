let tagsModel = require('../models/tags.js');
let questionsModel = require('../models/questions.js');

const findAllTags = async() => await tagsModel.find({}, '_id name');

const createTag = async (tag) => await tagsModel.create(tag);

const findAndCreateTags = async (tags, qid) => {
    const tagIds = [];

    for (const tagName of tags) {
        let tag = await tagsModel.findOne({ name: tagName });
        if (tag) {
          if (!tag.qid.includes(qid)) {
            tag.qid.push(qid);
            await tag.save();
          }
        tagIds.push(tag._id);
        } else {
        tag = await tagsModel.create({ name: tagName, qid: [qid] });
        tagIds.push(tag._id);
        }
    }

  return tagIds;
}

const checkTagUsageByOtherUsers = async (tagName, userQIDs) => {
  try {
      const tag = await tagsModel.findOne({ name: tagName });
      if (!tag) {
          console.log("Tag not found");
          return false;
      }
      const otherQuestionsUsingTag = await questionsModel.exists({
          _id: { $nin: userQIDs },
          tags: tag._id
      });
      console.log("Check Tags usage", otherQuestionsUsingTag);
      return otherQuestionsUsingTag;
  } catch (error) {
      console.error("Error checking tag usage:", error);
      return false; // Error occurred
  }
}




const deleteTagByName = async(tagName) => {
  try {
      const tagToDelete = await tagsModel.findOne({ name: tagName });

      if (!tagToDelete) {
          console.log("Tag not found");
          return;
      }
      await questionsModel.updateMany({ tags: tagToDelete._id }, { $pull: { tags: tagToDelete._id } });
      await tagsModel.findByIdAndRemove(tagToDelete._id);
  } catch (error) {
      console.error("Error deleting tag:", error);
  }
}

const updateTagName = async(tagId, newTagName) => {
  try {
      const updatedTag = await tagsModel.findByIdAndUpdate(
          tagId,
          { name: newTagName },
          { new: true }
      );

      if (!updatedTag) {
          console.log("Tag not found");
          return;
      }

      console.log("Tag updated:", updatedTag);
  } catch (error) {
      console.error("Error updating tag:", error);
  }
}

module.exports = {findAllTags, createTag, findAndCreateTags, deleteTagByName, checkTagUsageByOtherUsers, updateTagName};

