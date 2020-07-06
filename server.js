const express = require('express');
const graphqlHTTP = require('express-graphql');
const app = express();
const schema = require('./schema');
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}));

var PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Run server on localhost:' + PORT));
