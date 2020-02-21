const github = require('./Github');
const gotrue = require('./Gotrue');
const gitgateway = require('./GitGateway');

const deploy = (req, res) => {
  Promise.all([
    github.deploy(req.body),
    gotrue.deploy(req.body),
    gitgateway.deploy(req.body)
  ])
    .then(responses => {
      res.json({
        github: responses[0],
        gotrue: responses[1],
        gitgateway: responses[2]
      })
    })
    .catch(error => {
      res.status(422).json(error)
    })
}

module.exports = deploy