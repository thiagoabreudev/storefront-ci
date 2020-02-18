const { Octokit } = require('@octokit/rest');
const DEFAULT_SETTINGS = require('../config/defaultSettings');


class GitHub {
  constructor() {
    this.templateOwner = process.env.STOREFRONT_CI_GITHUB_TEMPLATE_OWNER;
    this.templateRepo = process.env.STOREFRONT_CI_GITHUB_TEMPLATE_REPO;
  }

  async deploy(payload) {
    if (!process.env.STOREFRONT_CI_GITHUB_TOKEN) {
      throw { error: 'GITHUB_TOKEN is required!' }
    }
    const octokit = new Octokit({
      auth: process.env.STOREFRONT_CI_GITHUB_TOKEN
    });

    return this.generate(octokit, payload)
      .then(() => this.getContent(octokit, payload))
      .then(({ data }) => this.updateSettings(octokit, payload, data))
      .catch(error => {
        if (error.errors) {
          throw error.errors
        }
        throw error
      })
  }

  generate(octokit, payload) {
    if (!payload.name) {
      throw { error: 'name is required!' }
    };
    return octokit.repos.createUsingTemplate({
      template_owner: this.templateOwner,
      template_repo: this.templateRepo,
      owner: payload.owner ? payload.owner : process.env.STOREFRONT_CI_GITHUB_DEFAULT_OWNER,
      name: payload.name,
      description: payload.description || '',
      private: false,
    })
  }

  getContent(octokit, payload) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        octokit.repos.getContents({
          owner: process.env.STOREFRONT_CI_GITHUB_DEFAULT_OWNER,
          repo: payload.name,
          path: 'content/settings.json'
        }).then(res => resolve(res)).catch(err => reject(err))
      }, 2000);
    })
  }

  updateSettings(octokit, payload, content) {
    const defaultSettings = { ...DEFAULT_SETTINGS, ...payload.settings || {} };
    return octokit.repos.createOrUpdateFile({
      owner: process.env.STOREFRONT_CI_GITHUB_DEFAULT_OWNER,
      repo: payload.name,
      message: 'Setup store',
      path: 'content/settings.json',
      content: Buffer.from(JSON.stringify(defaultSettings, null, 2)).toString('base64'),
      sha: content.sha
    })
  }
}

module.exports = new GitHub();