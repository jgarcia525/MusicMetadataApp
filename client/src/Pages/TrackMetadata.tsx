import { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { GET_TRACK } from '../GraphQL/queries';
import {
  Card,
  ListGroup,
  ListGroupItem,
  Button,
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

function TrackMetadata() {
  interface Track {
    title: string;
    artist: string;
    genre: string;
    duration: number;
    albumCoverUrl?: string;
  }

  const { id } = useParams();
  const { error, loading, data } = useQuery(GET_TRACK, {
    variables: { id: id },
  });
  const [track, setTrack] = useState(null);

  useEffect(() => {
    if (data) setTrack(data.getTrack);
  }, [data]);

  const getDurationWithMinutes = (durationInSeconds: number) => {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds - minutes * 60;
    return minutes + ':' + seconds;
  };

  const getTrack = (track: Track) => {
    console.log(track);
    return (
      <Row>
        <Col style={{ display: 'flex', justifyContent: 'center' }}>
          <Card text='dark' style={{ width: '25rem' }}>
            <Card.Img variant='top' src={track.albumCoverUrl} />
            <Card.Body>
              <Card.Title style={{ fontSize: '2rem' }}>
                {track.title}
              </Card.Title>
              <Card.Subtitle
                className='text-muted'
                style={{ fontSize: '1rem' }}
              >
                {track.artist}
              </Card.Subtitle>
            </Card.Body>
            <ListGroup className='list-group-flush'>
              <ListGroupItem>{track.genre}</ListGroupItem>
              <ListGroupItem>
                {getDurationWithMinutes(track.duration)}
              </ListGroupItem>
            </ListGroup>
            <Card.Body style={{ display: 'flex', justifyContent: 'center' }}>
              <Link to='/'>
                <Button className='btn-fiery-rose'>Back to Track List</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  };

  return (
    <main className='App-header'>
      <Container>
        {!track && <h1>Loading...</h1>}
        {track && getTrack(track!)}
      </Container>
    </main>
  );
}

export default TrackMetadata;
