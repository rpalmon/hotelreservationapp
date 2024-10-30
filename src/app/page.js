"use client"
import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
const dayjs = require('dayjs')
import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';

import { LicenseInfo } from '@mui/x-data-grid-pro';

LicenseInfo.setLicenseKey('e0d9bb8070ce0054c9d9ecb6e82cb58fTz0wLEU9MzI0NzIxNDQwMDAwMDAsUz1wcmVtaXVtLExNPXBlcnBldHVhbCxLVj0y')
import { useUser } from '@clerk/nextjs'
import { useAuth } from '@clerk/nextjs'

import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import { Dialog, DialogTitle, DialogContent, TextField, Popper, ClickAwayListener, Paper, Grow } from '@mui/material';
import { useRef } from 'react';

// Function to convert Dayjs object to JavaScript Date
function convertToDate(dayjsObj) {
  return new Date(dayjsObj.$y, dayjsObj.$m, dayjsObj.$D);
}
import PersonIcon from '@mui/icons-material/Person';
// import { currentUser } from '@clerk/nextjs/server'
// const couchbase = require('couchbase')

const CustomInputWithPopper = () => {
  const [open, setOpen] = useState(false); // Controls whether the Popper is open
  const [inputValue, setInputValue] = useState(''); // The value in the input field
  const [customData, setCustomData] = useState(''); // The data from custom UI
  const anchorEl = useRef(null); // Reference to the input field for positioning the Popper

  // Open and close popper
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Handle saving the custom data entered in the popper
  const handleSaveData = () => {
    setInputValue(customData); // Set input field with custom data
    handleClose(); // Close the Popper
  };

  // Close popper when clicking outside of it
  const handleClickAway = () => {
    if (open) {
      handleClose();
    }
  };

  return (
    <div>
      {/* Input field that triggers the Popper */}
      <TextField
        ref={anchorEl}
        label="Click to input"
        value={inputValue}
        onClick={handleClickOpen}
        fullWidth
        readOnly
      />

      {/* The Popper that shows the custom UI */}
      <Popper
        open={open}
        anchorEl={anchorEl.current}
        placement="bottom-start" // Ensure the Popper appears below the input
        modifiers={[
          {
            name: 'flip',
            enabled: true,
            options: {
              altBoundary: true,
              rootBoundary: 'viewport',
              padding: 8,
            },
          },
          {
            name: 'preventOverflow',
            enabled: true,
            options: {
              boundary: 'viewport',
              tether: false,
            },
          },
        ]}
      >
        <ClickAwayListener onClickAway={handleClickAway}>
          <Paper elevation={3} style={{ padding: '16px', width: '300px' }}>
            {/* Custom UI inside the popper */}
            <TextField
              label="Custom Input"
              fullWidth
              value={customData}
              onChange={(e) => setCustomData(e.target.value)} // Update custom data
            />
            <Button
              onClick={handleSaveData}
              color="primary"
              variant="contained"
              style={{ marginTop: '20px' }}
            >
              Save
            </Button>
          </Paper>
        </ClickAwayListener>
      </Popper>
    </div>
  );
};



export default function Page() {
  const [dateRange, setDateRange] = useState([
    dayjs('2024-01-01'),
    dayjs('2024-01-10'),
  ]);
  const { isSignedIn, user } = useUser()

  // const  account = currentUser()

  const { isLoaded, userId, sessionId, getToken } = useAuth()

  const [rooms, setRooms] = useState([{ roomNumber: 1, people: 0 }]);

  const updatePeopleCount = (roomIndex, change) => {
    setRooms(prevRooms =>
      prevRooms.map((room, index) =>
        index === roomIndex ? { ...room, people: Math.max(0, room.people + change) } : room
      )
    );
  };

  const addRoom = () => {
    setRooms([...rooms, { roomNumber: rooms.length + 1, people: 0 }]);
  };

  const removeRoom = () => {
    if (rooms.length > 1) {
      setRooms(rooms.slice(0, -1));
    }
  };

  // console.log("account: ", account);

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          marginTop: '200px' // corrected camelCase
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateRangePicker
            slots={{ field: SingleInputDateRangeField }}
            label="Select Date Range"
            startText="Start date"
            endText="End date"
            value={dateRange}
            onChange={(newValue) => setDateRange(newValue)}
            style={{ backgroundColor: 'green' }} // green background
          />
        </LocalizationProvider>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          marginTop: '20px'
        }}
      >
        <ButtonGroup
          orientation="horizontal"
          color="primary"
          aria-label="horizontal outlined primary button group"
          sx={{
            border: '2px solid',
            borderColor: 'primary.main',
            borderRadius: '4px',
            marginLeft: 2,
          }}
        >
          <List sx={{ padding: 0 }}>
            <ListItem
              sx={{
                border: '2px solid',
                borderColor: 'primary.main',
                borderRight: 'none',
                borderRadius: '4px 0 0 4px',
                paddingLeft: 2,
                paddingRight: 2,
              }}
            >
              <ListItemText>
                Rooms: {rooms.length}
              </ListItemText>
            </ListItem>
          </List>
          <Button
            variant="outlined"
            sx={{ border: '2px solid', borderColor: 'primary.main' }}
            onClick={removeRoom}
          >
            -
          </Button>
          <Button
            variant="outlined"
            sx={{ border: '2px solid', borderColor: 'primary.main' }}
            onClick={addRoom}
          >
            +
          </Button>
        </ButtonGroup>
      </div>

      <div
        style={{
          // display: 'flex',
          // justifyContent: 'center',
          // width: '100%',
          // marginTop: '20px',
          // padding: '20px',
          // margin: '10px',
          // border: '1px solid',
          // borderRadius: '10px',
          // backgroundColor: 'lightblue',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          <div
          style={{
            padding: '20px',
            margin: '10px',
            border: '1px solid',
            borderRadius: '10px',
            backgroundColor: 'lightblue',
          }}
          >

         
          {rooms.map((room, index) => (
            <div
              key={index}
              style={{
                padding: '5px',
                // margin: '10px',
                // border: '1px solid',
                // borderRadius: '10px',
                // backgroundColor: 'lightblue',
              }}
            >
              {`Room ${room.roomNumber}`}
              <ButtonGroup
                orientation="horizontal"
                color="primary"
                aria-label="horizontal outlined primary button group"
                sx={{
                  border: '2px solid',
                  borderColor: 'primary.main',
                  borderRadius: '4px',
                  marginLeft: 2,
                }}
              >
                <List sx={{ padding: 0 }}>
                  <ListItem
                    sx={{
                      border: '2px solid',
                      borderColor: 'primary.main',
                      borderRight: 'none',
                      borderRadius: '4px 0 0 4px',
                      paddingLeft: 2,
                      paddingRight: 2,
                    }}
                  >
                    <ListItemText>
                      People: {room.people}
                    </ListItemText>
                    
                  </ListItem>
                </List>
                <Button
                  variant="outlined"
                  sx={{ border: '2px solid', borderColor: 'primary.main' }}
                  onClick={() => updatePeopleCount(index, -1)}
                >
                  -
                </Button>
                <Button
                  variant="outlined"
                  sx={{ border: '2px solid', borderColor: 'primary.main' }}
                  onClick={() => updatePeopleCount(index, 1)}
                >
                  +
                </Button>
                
              </ButtonGroup>
              <div>
                {/* map person icon to number of people in this room */}
                {[...Array(room.people)].map((_, i) => (
                  <PersonIcon key={i} />
                ))}
              </div>
            </div>
          ))}
        </div> 
        </div>
      </div>

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        Selected range: {dateRange[0] && dateRange[1] ? `${dateRange[0].format('YYYY-MM-DD')} - ${dateRange[1].format('YYYY-MM-DD')}` : 'No date selected'}
      </div>
      Hello, {user?.firstName} your current active session is {sessionId}

      <div>
        <pre
          style={{
            whiteSpace: 'pre-wrap',
            textAlign: 'left',
            padding: '20px',
            backgroundColor: 'lightgrey',
            borderRadius: '10px',
            width: '95%',
            margin: '20px 20px',
          }}
        >
          {JSON.stringify({
            "user": user? user.id : null,
            "check-in": dateRange[0] && dateRange[0].format('YYYY-MM-DD'), 
            "check-out": dateRange[1] && dateRange[1].format('YYYY-MM-DD'), 
            rooms 
          }, null, 2)}
        </pre>
      </div>
    </div>
  );
}
