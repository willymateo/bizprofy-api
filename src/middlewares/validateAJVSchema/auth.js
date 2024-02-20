const { loginSchema } = require("../../ajvSchemas/auth");
const { validateAJVSchema } = require(".");

const validateLoginSchema = (req, res, next) => validateAJVSchema(req, res, next, loginSchema);

module.exports = { validateLoginSchema };
