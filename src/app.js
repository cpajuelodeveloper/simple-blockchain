const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const routes = require('./routes')
const config = require('./config')
const { errorHandler } = require('./middlewares/');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (_, res) => res.send('Blockchain is working'))

app.use('/api', routes)

app.use(function(req, res, next) {
	next(createError(404));
});

app.listen(config.port, () => console.log(`Server running on port ${config.port}`))

app.use(errorHandler);

module.exports = app;