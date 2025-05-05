import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  MenuItem,
  FormControl,
  InputLabel,
  Select
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { toast } from 'react-toastify';
import axios from 'axios';

const EditEvent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    eventType: '',
    date: new Date(),
    time: '',
    venue: '',
    registrationDeadline: new Date(),
    maxParticipants: '',
    image: null
  });

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/events/${id}`);
      const event = response.data;
      setFormData({
        ...event,
        date: new Date(event.date),
        registrationDeadline: new Date(event.registrationDeadline),
        image: null
      });
    } catch (error) {
      toast.error('Error fetching event details');
      navigate('/events');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (name) => (date) => {
    setFormData(prev => ({
      ...prev,
      [name]: date
    }));
  };

  const handleImageChange = (e) => {
    setFormData(prev => ({
      ...prev,
      image: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'date' || key === 'registrationDeadline') {
          formDataToSend.append(key, formData[key].toISOString());
        } else if (formData[key] !== null) {
          formDataToSend.append(key, formData[key]);
        }
      });

      await axios.put(`http://localhost:5000/api/events/${id}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      toast.success('Event updated successfully!');
      navigate('/events');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Error updating event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Edit Event
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Event Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              margin="normal"
              multiline
              rows={4}
              required
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Event Type</InputLabel>
              <Select
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
                required
              >
                <MenuItem value="Academic">Academic</MenuItem>
                <MenuItem value="Cultural">Cultural</MenuItem>
                <MenuItem value="Sports">Sports</MenuItem>
                <MenuItem value="Technical">Technical</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Box sx={{ mt: 2, mb: 2 }}>
                <DatePicker
                  label="Event Date"
                  value={formData.date}
                  onChange={handleDateChange('date')}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </Box>
            </LocalizationProvider>
            <TextField
              fullWidth
              label="Time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              margin="normal"
              required
              placeholder="e.g., 2:00 PM"
            />
            <TextField
              fullWidth
              label="Venue"
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              margin="normal"
              required
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Box sx={{ mt: 2, mb: 2 }}>
                <DatePicker
                  label="Registration Deadline"
                  value={formData.registrationDeadline}
                  onChange={handleDateChange('registrationDeadline')}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </Box>
            </LocalizationProvider>
            <TextField
              fullWidth
              label="Maximum Participants"
              name="maxParticipants"
              type="number"
              value={formData.maxParticipants}
              onChange={handleChange}
              margin="normal"
            />
            <Button
              variant="contained"
              component="label"
              fullWidth
              sx={{ mt: 2 }}
            >
              Change Event Image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageChange}
              />
            </Button>
            {formData.image && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Selected file: {formData.image.name}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              sx={{ mt: 3 }}
              disabled={loading}
            >
              {loading ? 'Updating Event...' : 'Update Event'}
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default EditEvent; 