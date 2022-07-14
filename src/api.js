const express = require('express');
const error = require('./middlewares/error');
const authRouter = require('./routers/authRouter');

const app = express();

app.use(express.json());

app.use('/login', authRouter);

app.use(error);
// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
