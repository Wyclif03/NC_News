const app = require("../app");
const fetchTopics = require('../Models/fetchTopics.Models.js')

const getTopics = (req, res, next) => {
fetchTopics().then((topics) => res.status(200).send({topics}))

}


module.exports = getTopics