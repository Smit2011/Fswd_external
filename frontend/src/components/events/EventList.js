import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  TextField,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Chip
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import EventIcon from '@mui/icons-material/Event';
import PlaceIcon from '@mui/icons-material/Place';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/events');
      setEvents(response.data);
    } catch (error) {
      toast.error('Error fetching events');
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/events/search?query=${searchQuery}`);
      setEvents(response.data);
    } catch (error) {
      toast.error('Error searching events');
    }
  };

  const handleDelete = async (eventId) => {
    try {
      await axios.delete(`http://localhost:5000/api/events/${eventId}`);
      toast.success('Event deleted successfully');
      fetchEvents();
    } catch (error) {
      toast.error('Error deleting event');
    }
  };

  const handleViewDetails = (event) => {
    setSelectedEvent(event);
    setOpenDialog(true);
  };

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)', py: { xs: 4, md: 8 }, px: 0 }}>
      {/* Hero Section */}
      <Box sx={{
        width: '100%',
        maxWidth: 900,
        mx: 'auto',
        mb: { xs: 4, md: 8 },
        px: { xs: 2, md: 4 },
        py: { xs: 4, md: 6 },
        borderRadius: 6,
        background: 'linear-gradient(90deg, #43cea2 0%, #185a9d 100%)',
        color: '#fff',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10)',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 4,
      }}>
        <Box>
          <Typography variant="h2" fontWeight={900} sx={{ fontFamily: 'Montserrat, sans-serif', mb: 2, lineHeight: 1.1 }}>
            Discover & Manage <br /> College Events
          </Typography>
          <Typography variant="h5" sx={{ fontFamily: 'Poppins, sans-serif', mb: 3, fontWeight: 400 }}>
            Stay updated, participate, and create amazing experiences at your campus.
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              fontWeight: 700,
              fontSize: 20,
              borderRadius: 3,
              px: 4,
              py: 1.5,
              background: 'linear-gradient(90deg, #fff 0%, #43cea2 100%)',
              color: '#185a9d',
              boxShadow: 2,
              textTransform: 'none',
              '&:hover': {
                background: 'linear-gradient(90deg, #43cea2 0%, #fff 100%)',
                color: '#185a9d',
              },
            }}
            href="#events"
          >
            Explore Events
          </Button>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png" alt="Events" style={{ width: 180, maxWidth: '100%' }} />
        </Box>
      </Box>

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
        {/* Centered Search Bar */}
        <Box sx={{
          mb: { xs: 4, md: 8 },
          mt: { xs: 0, md: -10 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}>
          <Box sx={{
            width: '100%',
            maxWidth: 600,
            mx: 'auto',
            backdropFilter: 'blur(10px)',
            background: 'rgba(255,255,255,0.6)',
            borderRadius: 6,
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10)',
            border: '1px solid rgba(255,255,255,0.18)',
            p: 2,
            mt: 4,
          }}>
            <TextField
              fullWidth
              label="Search Events"
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{
                background: 'rgba(255,255,255,0.7)',
                borderRadius: 3,
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 500,
                fontSize: 18,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                },
              }}
            />
            <Button
              variant="contained"
              onClick={handleSearch}
              fullWidth
              sx={{
                mt: 3,
                fontWeight: 700,
                fontSize: 20,
                py: 1.5,
                borderRadius: 3,
                background: 'linear-gradient(90deg, #43cea2 0%, #185a9d 100%)',
                boxShadow: '0 4px 24px 0 rgba(24,90,157,0.10)',
                letterSpacing: 2,
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  background: 'linear-gradient(90deg, #185a9d 0%, #43cea2 100%)',
                  transform: 'scale(1.03)',
                  boxShadow: 8,
                },
              }}
            >
              SEARCH
            </Button>
          </Box>
        </Box>

        {/* Centered Event Cards */}
        <Grid id="events" container spacing={{ xs: 3, md: 5 }} justifyContent="center" sx={{ maxWidth: 1200, mx: 'auto' }}>
          {filteredEvents.map((event, idx) => (
            <Grid item xs={12} sm={10} md={6} key={event._id} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Card
                sx={{
                  borderRadius: 5,
                  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10)',
                  background: 'linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)',
                  borderLeft: `8px solid ${idx % 2 === 0 ? '#43cea2' : '#185a9d'}`,
                  position: 'relative',
                  overflow: 'visible',
                  mt: idx % 2 === 0 ? 0 : 4,
                  width: '100%',
                  maxWidth: 500,
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-10px) scale(1.04)',
                    boxShadow: '0 16px 40px 0 rgba(24,90,157,0.18)',
                  },
                }}
              >
                {event.image && (
                  <CardMedia
                    component="img"
                    height="180"
                    image={`http://localhost:5000${event.image}`}
                    alt={event.title}
                    sx={{
                      objectFit: 'cover',
                      borderTopLeftRadius: 20,
                      borderTopRightRadius: 20,
                      boxShadow: '0 4px 24px 0 rgba(24,90,157,0.10)',
                    }}
                  />
                )}
                <CardContent sx={{ pb: 2 }}>
                  <Typography gutterBottom variant="h4" component="div" fontWeight={900} color={idx % 2 === 0 ? 'primary.main' : 'secondary.main'} fontFamily="Montserrat, sans-serif">
                    {event.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 2, fontSize: 18, fontFamily: 'Montserrat, sans-serif' }}>
                    {event.description.substring(0, 100)}...
                  </Typography>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                    <Chip icon={<EventIcon />} label={new Date(event.date).toLocaleDateString()} color={idx % 2 === 0 ? 'info' : 'secondary'} size="medium" sx={{ fontWeight: 700, fontSize: 16 }} />
                    <Chip icon={<PlaceIcon />} label={event.venue} color="success" size="medium" sx={{ fontWeight: 700, fontSize: 16 }} />
                  </Stack>
                  <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Button
                      variant="contained"
                      size="large"
                      sx={{
                        fontWeight: 800,
                        borderRadius: 3,
                        px: 4,
                        py: 1.2,
                        fontSize: 18,
                        background: 'linear-gradient(90deg, #43cea2 0%, #185a9d 100%)',
                        boxShadow: 2,
                        letterSpacing: 1,
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        mr: 2,
                        '&:hover': {
                          background: 'linear-gradient(90deg, #185a9d 0%, #43cea2 100%)',
                          transform: 'scale(1.05)',
                          boxShadow: 8,
                        },
                      }}
                      onClick={() => handleViewDetails(event)}
                    >
                      VIEW DETAILS
                    </Button>
                    {user && user.id === event.organizer._id && (
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton
                          size="large"
                          onClick={() => navigate(`/events/${event._id}/edit`)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          size="large"
                          onClick={() => handleDelete(event._id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          maxWidth="md"
          fullWidth
        >
          {selectedEvent && (
            <>
              <DialogTitle sx={{ fontWeight: 700, fontSize: 28, color: 'primary.main', textAlign: 'center' }}>{selectedEvent.title}</DialogTitle>
              <DialogContent>
                {selectedEvent.image && (
                  <Box sx={{ mb: 2 }}>
                    <img
                      src={`http://localhost:5000${selectedEvent.image}`}
                      alt={selectedEvent.title}
                      style={{ width: '100%', maxHeight: '300px', objectFit: 'cover', borderRadius: 12 }}
                    />
                  </Box>
                )}
                <Typography variant="body1" paragraph sx={{ fontSize: 18, color: 'text.secondary' }}>
                  {selectedEvent.description}
                </Typography>
                <Stack direction="row" spacing={2} sx={{ mb: 2 }} justifyContent="center">
                  <Chip icon={<EventIcon />} label={`Date: ${new Date(selectedEvent.date).toLocaleDateString()}`} color="info" />
                  <Chip icon={<PlaceIcon />} label={`Venue: ${selectedEvent.venue}`} color="success" />
                </Stack>
                <Typography variant="body2" color="text.secondary">
                  Time: {selectedEvent.time}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Type: {selectedEvent.eventType}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Organizer: {selectedEvent.organizer.name}
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpenDialog(false)} variant="outlined" color="primary" sx={{ fontWeight: 600, borderRadius: 2 }}>Close</Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </Container>
    </Box>
  );
};

export default EventList; 