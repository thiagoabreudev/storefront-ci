const github = require('./Github');

const deploy = (req, res, next) => {
  github.deploy(req.body)
    .then(result => res.json({
      github: 'ok'
    }))
    .catch(({ status, documentation_url, errors}) => {
      res.status(422).json({
        status: 'failed',
        github_status: status,
        error: 'Error to make deploy in Github!',
        details: errors,
        documentation_url,
      })
    })
}

module.exports = deploy