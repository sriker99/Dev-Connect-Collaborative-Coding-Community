let tagsModel = require('../models/tags.js');

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

module.exports = {findAllTags, createTag, findAndCreateTags};

