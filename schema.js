const axios = require('axios');
const { GraphQLObjectType, GraphQLFloat, GraphQLList, GraphQLSchema, GraphQLString, GraphQLScalarType, GraphQLInt} = require('graphql');

// Bitcoin data type
const CurrencyDataType = new GraphQLObjectType({
  name: 'launch',
  fields: () => ({
    code: {type: GraphQLString},
    symbol: {type: GraphQLString},
    rate_float: {type: GraphQLFloat}
  })
});

//Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    launchInfo: {
      type: CurrencyDataType,
      args: {
        currency: {type: GraphQLString}
      },
      resolve: async(parent, args) => {
        const coinData = await axios.get('https://api.coindesk.com/v1/bpi/currentprice.json').then(res => res.data.bpi);
        return coinData[args.currency];
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
