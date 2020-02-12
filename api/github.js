const axios = require('axios').default;

class GitHub {
  constructor() {
    this.templateOwner = process.env.STOREFRONT_CI_GITHUB_TEMPLATE_OWNER;
    this.templateRepo = process.env.STOREFRONT_CI_GITHUB_TEMPLATE_REPO;
    this.request = axios.create({
      baseURL: 'https://api.github.com',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github.baptiste-preview+json',
        'Authorization': `Bearer ${process.env.STOREFRONT_CI_GITHUB_TOKEN}`
      }
    })
  }

  async generate(data) {
    try {
      return await this.request
        .post(`/repos/${this.templateOwner}/${this.templateRepo}/generate`, data);
    } catch (error) {
      throw await error.response.data
    }
  }
}

module.exports = new GitHub();