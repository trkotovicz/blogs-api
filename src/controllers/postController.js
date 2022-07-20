const postService = require('../services/postService');

const postController = {
  create: async (req, res) => {
    const id = req.userId;
    const data = await postService.validateBody(req.body);
    data.userId = id;

    const post = await postService.create(data);
    res.status(201).json(post);
  },

  list: async (_req, res) => {
    const posts = await postService.list();
    res.status(200).json(posts);
  },

  getById: async (req, res) => {
    const { id } = req.params;
    const post = await postService.getById(id);
    res.status(200).json(post);
  },
  
};

module.exports = postController;