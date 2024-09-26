"use client"
import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
const dayjs = require('dayjs')
import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';

import { LicenseInfo } from '@mui/x-data-grid-pro';

LicenseInfo.setLicenseKey('e0d9bb8070ce0054c9d9ecb6e82cb58fTz0wLEU9MzI0NzIxNDQwMDAwMDAsUz1wcmVtaXVtLExNPXBlcnBldHVhbCxLVj0y')

import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';

import ResponsiveAppBar from './ResponsiveAppBar';

function convertToDate(dayjsObj) {
  return new Date(dayjsObj.$y, dayjsObj.$m, dayjsObj.$D);
}
export default function Page() {
  const [dateRange, setDateRange] = useState([
    dayjs('2024-01-01'),
    dayjs('2024-01-10'),
  
  ])

  const [rooms, setRooms] = useState(0);

  return (
    <div>
      {/* <ResponsiveAppBar /> */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          margintop: '200px'
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateRangePicker
            slots={{ field: SingleInputDateRangeField }}

            startText="Start date"
            endText="End date"
            value={dateRange}
            onChange={(newValue) => {
              console.log(newValue);
              setDateRange(newValue);
              console.log(dateRange);
            }}
            renderInput={(startProps, endProps) => (
              <>
                <input {...startProps} />
                <input {...endProps} />
              </>
            )}
            style={{
              //green background for the box
              backgroundColor: 'green',
              
            }}
          />
        </LocalizationProvider>

        <div>
          <ButtonGroup
            orientation="horizontal"
            color="primary"
            aria-label="vertical outlined primary button group"
          >
            <div style={{ padding: '0 10px', fontSize: '16px', fontWeight: 'bold' }}>Number of rooms: {rooms}</div>
            <Button onClick={() => setRooms(Math.max(0, rooms - 1))}>-</Button>
            <Button onClick={() => setRooms(rooms + 1)}>+</Button>
          </ButtonGroup>
        </div>
      </div>

      <div>
        selected range: 
        {dateRange[0] && dateRange[1] ? `${dateRange[0].format('YYYY-MM-DD')} - ${dateRange[1].format('YYYY-MM-DD')}` : 'No date selected'}
      </div>
    </div>
  );
}


