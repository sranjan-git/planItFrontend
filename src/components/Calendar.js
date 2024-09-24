import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  Button,
  Container,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { makeStyles } from "@mui/styles"; // To add custom styling

// Moment localizer for the calendar
const localizer = momentLocalizer(moment);

// Custom styles to resemble Google Calendar
const useStyles = makeStyles({
  calendar: {
    height: 500,
    marginBottom: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "15px",
    backgroundColor: "#fafafa",
    "& .rbc-toolbar": {
      marginBottom: "10px",
    },
    "& .rbc-month-view": {
      borderRadius: "8px",
      border: "1px solid #e0e0e0",
      backgroundColor: "#ffffff",
    },
    "& .rbc-header": {
      fontWeight: "bold",
      color: "#3b5998",
    },
    "& .rbc-day-bg": {
      backgroundColor: "#f5f5f5",
      "&:hover": {
        backgroundColor: "#e8f0fe",
      },
    },
    "& .rbc-event": {
      backgroundColor: "#4285F4", // Google Calendar blue
      borderRadius: "5px",
      padding: "2px",
      color: "white",
      border: "none",
      "&:hover": {
        backgroundColor: "#357ae8",
      },
    },
  },
  dialogTitle: {
    backgroundColor: "#f5f5f5",
    borderBottom: "1px solid #ccc",
    padding: "10px 15px",
  },
  dialogActions: {
    padding: "10px 15px",
    borderTop: "1px solid #ccc",
  },
});

const MyCalendar = ({ user }) => {
  const classes = useStyles();
  const [events, setEvents] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    start: new Date(),
    end: new Date(),
  });

  const fetchEvents = useCallback(async () => {
    try {
      const response = await axios.post("https://planit-2t59.onrender.com/api/readevent", {
        email: user.email,
      });
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events", error);
    }
  }, [user.email]);

  useEffect(() => {
    if (user) {
      fetchEvents();
    }
  }, [user, fetchEvents]);

  const handleOpenDialog = (event = null) => {
    if (event) {
      setNewEvent({
        title: event.title,
        description: event.description,
        start: new Date(event.start),
        end: new Date(event.end),
      });
      setCurrentEvent(event);
    } else {
      setNewEvent({
        title: "",
        description: "",
        start: new Date(),
        end: new Date(),
      });
      setCurrentEvent(null);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSaveEvent = async () => {
    const newEventData = {
      ...newEvent,
      email: user.email,
      start: moment(newEvent.start).utc().format(),
      end: moment(newEvent.end).utc().format(),
    };

    if (currentEvent) {
      await axios.post("https://planit-2t59.onrender.com/api/updateevent", {
        oldtitle: currentEvent.title,
        oldemail: user.email,
        newtitle: newEventData.title,
        description: newEventData.description,
        start: newEventData.start,
        end: newEventData.end,
      });
    } else {
      await axios.post("https://planit-2t59.onrender.com/api/addevent", newEventData);
    }
    fetchEvents();
    handleCloseDialog();
  };

  const handleDeleteEvent = async (event) => {
    await axios.post("https://planit-2t59.onrender.com/api/deleteevent", {
      title: event.title,
      email: user.email,
    });
    fetchEvents();
  };

  const handleSelectSlot = ({ start, end }) => {
    setNewEvent({
      ...newEvent,
      start,
      end,
    });
    handleOpenDialog();
  };

    if (!user) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography variant="h6">Please sign in to access your calendar.</Typography>
      </Box>
    );
  }
  
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Calendar
      </Typography>
      <Box sx={{ marginBottom: "20px" }}>
        {/* Additional buttons or actions */}
      </Box>

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        selectable
        className={classes.calendar}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={(event) => handleOpenDialog(event)}
      />

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle className={classes.dialogTitle}>
          {currentEvent ? "Edit Event" : "Add New Event"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            name="title"
            fullWidth
            margin="normal"
            value={newEvent.title}
            onChange={(e) =>
              setNewEvent({ ...newEvent, title: e.target.value })
            }
          />
          <TextField
            label="Description"
            name="description"
            fullWidth
            margin="normal"
            value={newEvent.description}
            onChange={(e) =>
              setNewEvent({ ...newEvent, description: e.target.value })
            }
          />
          <TextField
            label="Start Date & Time"
            type="datetime-local"
            name="start"
            fullWidth
            margin="normal"
            value={moment(newEvent.start).format("YYYY-MM-DDTHH:mm")}
            onChange={(e) => {
              setNewEvent({ ...newEvent, start: new Date(e.target.value) });
            }}
          />
          <TextField
            label="End Date & Time"
            type="datetime-local"
            name="end"
            fullWidth
            margin="normal"
            value={moment(newEvent.end).format("YYYY-MM-DDTHH:mm")}
            onChange={(e) => {
              setNewEvent({ ...newEvent, end: new Date(e.target.value) });
            }}
          />
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveEvent} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Box>
        <h2>All Events</h2>
        <List>
          {events.map((event, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={event.title}
                secondary={moment(event.start).format("MMMM Do YYYY, h:mm a")}
              />
              <IconButton
                onClick={() => handleOpenDialog(event)}
                color="primary"
              >
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={() => handleDeleteEvent(event)}
                color="secondary"
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default MyCalendar;
