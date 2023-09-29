const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + '/styles'));

const swaggerUi = require('swagger-ui-express');
const apiDocs = require('./apiDocs.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiDocs));

const routes = require('./routes');
app.use(routes);

app.listen(port, () => {
  console.log(`Listening Filmactor on ${port}`);
})