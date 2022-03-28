import { gql } from '@apollo/client';

export const GET_ALL_TRACKS = gql`
  query GetAllTracks {
    getAllTracks {
      id
      title
      artist
      albumCoverUrl
    }
  }
`;

export const GET_TRACK = gql`
  query GetTrack($id: ID!) {
    getTrack(id: $id) {
      title
      artist
      genre
      duration
      albumCoverUrl
    }
  }
`;
