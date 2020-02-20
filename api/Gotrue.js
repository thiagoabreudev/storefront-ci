const axios = require('axios');
const qs = require('qs');

class GoTrue {
  constructor() {
    this.url = process.env.STOREFRONT_CI_GOTRUE_URL
    this.username = process.env.STOREFRONT_CI_GOTRUE_USERNAME
    this.password = process.env.STOREFRONT_CI_GOTRUE_PASSWORD
    this.token = '';
  }

  deploy() {
    this.login()
  }

  login() {
    return new Promise((resolve, reject) => {
      try {
        const headers = {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        };

        const options = qs.stringify({

          grant_type: 'password',
          username: this.username,
          password: this.password
        })
        axios.post(`${this.url}/token`, options, headers)
          .then((res) => this.token = res)
          .catch(error => console.log(error))
      } catch (error) {

      }
    })
  }

  createUser(payload) {
    return newUser
  }

  updateRule() {

  }
}

module.exports = new GoTrue();