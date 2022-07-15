const authService = require('../services/authService');
const jwtService = require('../services/jwtService');

const authController = {
  login: async (req, res) => {
    const { email, password } = authService.validateBody(req.body);

    const token = await authService.login(email, password);
    res.status(200).json({ token });
  },

  validateToken: async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
      const error = new Error('Token not found');
      error.name = 'NotFoundError';
      error.status = 401;
      throw error;
    }

    jwtService.validateToken(token);

    next();
  },
};

module.exports = authController;