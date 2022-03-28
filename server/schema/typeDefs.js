const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Track {
    id: ID!
    title: String!
    artist: String!
    genre: String!
    duration: Int!
    albumCoverUrl: String!
  }

  type Query {
    getAllTracks: [Track]
    getTrack(id: ID!): Track
  }

  input TrackInput {
    title: String!
    artist: String!
    genre: String!
    duration: Int!
    albumCoverUrl: String!
  }

  type Mutation {
    createTrack(track: TrackInput): Track
    deleteTrack(id: ID!): String
    updateTrack(id: ID!, track: TrackInput!): Track
  }
`;

module.exports = typeDefs;
