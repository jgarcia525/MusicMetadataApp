import { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { GET_ALL_TRACKS } from '../GraphQL/queries';
import {
  Row,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Image,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

function TrackList() {
  interface ListTrack {
    title: string;
    id: string;
    artist: string;
    albumCoverUrl: string;
  }

  const { error, loading, data } = useQuery(GET_ALL_TRACKS);
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    if (data) setTracks(data.getAllTracks);
  }, [data]);

  const getTracks = () => {
    return (
      <ListGroup style={{ borderRadius: '.5rem' }} variant='flush'>
        {tracks.map((track: ListTrack, index: number) => (
          <ListGroupItem key={index}>
            <Row>
              <Col xs={'auto'}>
                <Image
                  style={{
                    objectFit: 'cover',
                    width: '100px',
                    height: 'auto',
                  }}
                  src={track.albumCoverUrl}
                  alt={track.title + ' album cover'}
                />
              </Col>
              <Col>
                <Link style={{ color: '#008dd5' }} to={`/track/${track.id!}`}>
                  {track.title}
                </Link>
                <div>{track.artist}</div>
              </Col>
            </Row>
          </ListGroupItem>
        ))}
      </ListGroup>
    );
  };

  return (
    <main className='App-header'>
      <Container>
        <h1>Jorge's Favorite Songs</h1>
        <div style={{ paddingTop: '2rem' }}>{getTracks()}</div>
      </Container>
    </main>
  );
}

export default TrackList;
