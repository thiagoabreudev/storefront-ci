const { Octokit } = require('@octokit/rest');

class GitHub {
  constructor() {
    this.templateOwner = process.env.STOREFRONT_CI_GITHUB_TEMPLATE_OWNER;
    this.templateRepo = process.env.STOREFRONT_CI_GITHUB_TEMPLATE_REPO;
  }

  async generate(data) {
    try {
      data.owner = data.owner ? data.owner : process.env.STOREFRONT_CI_GITHUB_DEFAULT_OWNER
      if (!process.env.STOREFRONT_CI_GITHUB_TOKEN) {
        throw { error: 'GITHUB_TOKEN is required!' }
      }

      const octokit = new Octokit({
        auth: process.env.STOREFRONT_CI_GITHUB_TOKEN
      });

      return await octokit.repos.createUsingTemplate({
        template_owner: this.templateOwner,
        template_repo: this.templateRepo,
        ...data
      })
    } catch (error) {
      if (error.errors) {
        throw await error.errors
      }
      throw await error
    }
  }
}

module.exports = new GitHub();