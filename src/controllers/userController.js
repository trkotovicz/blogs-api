const userService = require('../services/userService');

const userController = {
  create: async (req, res) => {
    const user = await userService.validateBody(req.body);
    await userService.checkIfExists(user.email);

    const token = await userService.create(user);
    res.status(201).json({ token });
  },
};

module.exports = userController;