const axios = require('axios');
const { GraphQLObjectType, GraphQLFloat, GraphQLList, GraphQLSchema, GraphQLString, GraphQLScalarType, GraphQLInt} = require('graphql');

// Bitcoin data type
const rateData = new GraphQLObjectType ({
  name: 'Rates',
  fields: () => ({
    name: {type: GraphQLString},
    rate: {type: GraphQLString}
  })
})
const LaunchType = new GraphQLObjectType({
  name: 'launch',
  fields: () => ({
    AED: {type: rateData},
    AFN: {type: rateData},
    AMD: {type: rateData},
    ANG: {type: rateData},
    AOA: {type: rateData}
  })
});

//Root Query

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    launchInfo: {
      type: new GraphQLList(LaunchType),
      resolve(parent, args) {
        return axios.get('https://apiv2.bitcoinaverage.com/constants/exchangerates').then(res => res.data);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
