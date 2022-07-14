require('dotenv/config');
const jwt = require('jsonwebtoken');

const jwtService = {
  createToken: (data) => {
    const token = jwt.sign({ data }, process.env.JWT_SECRET);
    return token;
  },

  validateToken: (token) => {
    try {
      const data = jwt.verify(token, process.env.JWT_SECRET);
      return data;
    } catch (error) {
      const err = new Error('Expired or invalid token');
      err.name = 'InvalidToken';
      err.status = 401;
      throw err;
    }
  },
};

module.exports = jwtService;