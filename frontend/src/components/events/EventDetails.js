import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Typography,
  CircularProgress,
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Stack
} from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PlaceIcon from '@mui/icons-material/Place';
import CategoryIcon from '@mui/icons-material/Category';
import PersonIcon from '@mui/icons-material/Person';

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/events/${id}`);
        setEvent(res.data);
      } catch (err) {
        setEvent(null);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  if (loading) return <Box sx={{ mt: 4, textAlign: 'center' }}><CircularProgress /></Box>;
  if (!event) return <Typography variant="h6" sx={{ mt: 4, textAlign: 'center' }}>Event not found.</Typography>;

  return (
    <Container maxWidth="sm" sx={{ mt: 6, mb: 6 }}>
      <Card sx={{ boxShadow: 6, borderRadius: 4 }}>
        {event.image && (
          <CardMedia
            component="img"
            height="260"
            image={`http://localhost:5000${event.image}`}
            alt={event.title}
            sx={{ objectFit: 'cover' }}
          />
        )}
        <CardContent>
          <Typography variant="h3" fontWeight={700} gutterBottom align="center" color="primary.main">
            {event.title}
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="body1" paragraph sx={{ fontSize: 18, mb: 3, color: 'text.secondary' }}>
            {event.description}
          </Typography>
          <Stack direction="row" spacing={2} sx={{ mb: 2 }} justifyContent="center">
            <Chip icon={<EventIcon />} label={`Date: ${new Date(event.date).toLocaleDateString()}`} color="info" />
            <Chip icon={<AccessTimeIcon />} label={`Time: ${event.time}`} color="info" />
          </Stack>
          <Stack direction="row" spacing={2} sx={{ mb: 2 }} justifyContent="center">
            <Chip icon={<PlaceIcon />} label={`Venue: ${event.venue}`} color="success" />
            <Chip icon={<CategoryIcon />} label={`Type: ${event.eventType}`} color="secondary" />
          </Stack>
          <Stack direction="row" spacing={2} sx={{ mb: 2 }} justifyContent="center">
            <Chip icon={<PersonIcon />} label={`Organizer: ${event.organizer?.name}`} color="primary" />
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
};

export default EventDetails; 