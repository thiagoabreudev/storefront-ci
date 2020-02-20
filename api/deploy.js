const github = require('./Github');
const gotrue = require('./Gotrue');

const deploy = (req, res, next) => {
  github.deploy(req.body)
    .then(() => gotrue.deploy(req.body))
    .then(() => res.json({
      github: 'ok',
      gotrue: 'ok'
    }))
    .catch(error => {
      res.status(422).json(error)
    })
}

module.exports = deploy