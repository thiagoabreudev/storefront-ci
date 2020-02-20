const Joi = require('joi');
const gotrueSchema = require('./GotrueSchema');
const settingsSchema = require('./SettingsSchema');

DeploySchema = Joi.object().keys({
  name: Joi.string().required(),
  gotrue: gotrueSchema,
  settings: settingsSchema
});

module.exports = DeploySchema;

