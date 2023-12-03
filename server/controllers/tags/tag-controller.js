// var tags = require('./tag.js');
var {findAllTags} = require('../../DAO/TagsDAO.js');

const TagController = (app) => {
    app.get('/api/tags', findTag)
 }

const findTag = async (req, res) => {
    const insertedTags = await findAllTags();
    const response = insertedTags.map(tag => tagsServerToClient(tag));
    res.send(response);
}

const tagsServerToClient = (tags) => {
    const{_id, name} = tags;
    return {tid: _id, name: name};
}
module.exports =  { TagController , tagsServerToClient};
