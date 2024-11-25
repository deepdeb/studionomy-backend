const logger = require("../../../config/logger");
const Joi = require('joi');
const loginService = require("../../services/loginService");
const authHelpers = require("../../utils/authHelpers");
exports.userLoginController = async (req, res) => {
  try {
    const loginUser = Joi.object({
      userName: Joi.string().required(),
      password: Joi.string().required(),
      loginType: Joi.optional()
    });

    const { error, value } = loginUser.validate(req.body);
    if (error) {
      logger.error(`Invalid username or password : ${error.details[0].message}`);
      return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
    }
    logger.info(`Valid username and password`);
    const resp = await loginService.userLogin(req.body);
    if (resp.length > 0) {
      const access_token = await authHelpers.generateAccessToken(resp);
      return res.json({ success: true, status: 200, message: "Login successfully", response: resp, access_token: access_token });
    } else {
      return res.json({ success: false, status: 500, message: "User does not exists", response: [] });
    }
  } catch (error) {
    logger.error(res.message);
    return res.json({ success: false, status: 400, message: res.message, response: [] });
  }
};
