const axios = require('axios');
const { GraphQLObjectType, GraphQLFloat, GraphQLSchema, GraphQLString} = require('graphql');

// Bitcoin data type
const CurrencyRateType = new GraphQLObjectType({
  name: 'CurrencyRateType',
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
    bitcoinRates: {
      type: CurrencyRateType,
      args: {
        currency: {type: GraphQLString}
      },
      resolve: async(_, args) => {
        const coinData = await axios.get('https://api.coindesk.com/v1/bpi/currentprice.json').then(res => res.data.bpi);
        return coinData[args.currency];
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
