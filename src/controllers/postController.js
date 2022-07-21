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
  
  remove: async (req, res) => {
    const { id } = req.params;
    const token = req.headers.authorization;

    await postService.checkIfIsAuthorized(token, id);

    await postService.remove(id);
    res.status(204).end();
  },

  update: async (req, res) => {
    const { id } = req.params;
    const { title, content } = await postService.validateUpdatedBody(req.body);
    const token = req.headers.authorization;

    await postService.checkIfIsAuthorized(token, id);

    await postService.update({ id, title, content });
    const post = await postService.getById(id);
    
    res.status(200).json(post);
  },

};

module.exports = postController;