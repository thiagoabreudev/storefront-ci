const express = require('express');
const github = require('./github');
const router = express.Router();


router.post('/deploy', async (req, res) => {
  try {
    const result = await github.deploy(req.body);
    return res.send(result.data)
  } catch (error) {
    return res.send(error)
  }
})

module.exports = router