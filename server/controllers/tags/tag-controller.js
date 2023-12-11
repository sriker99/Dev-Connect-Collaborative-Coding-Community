// var tags = require('./tag.js');
var {findAllTags, checkTagUsageByOtherUsers, deleteTagByName, updateTagName} = require('../../DAO/TagsDAO.js');

const TagController = (app) => {
    app.get('/api/tags', findTag);
    app.post('/api/tags/checkTagsUpdate', checkTagUpdate);
    app.delete('/api/tags/:tagName', deleteTags);
    app.put('/api/tags/:tid', updateTag);
 }

const updateTag = async(req, res) => {
    const {name} = req.body;
    const { tid } = req.params;
    console.log("updateTag", name, tid);
    await updateTagName(tid, name);
    res.send("succesfully updated");
}
const deleteTags = async(req, res) => {
    const { tagName } = req.params;
    await deleteTagByName(tagName);
    res.send("succesfully deleted");
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

const checkTagUpdate = async(req, res) => {
    console.log("req body", req.body);
    const { tagName, qids} = req.body;
    const response = await checkTagUsageByOtherUsers(tagName, qids);
    if(response === null){
        return res.send(true);
    }
    else{
        return res.send(false);
    }
}


module.exports =  { TagController , tagsServerToClient, checkTagUpdate};
