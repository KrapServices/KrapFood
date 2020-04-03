import React from 'react';
import 'react-calendar/dist/Calendar.css';
import { Divider } from 'semantic-ui-react';
import WeeklyWorkSchedule from './WeeklyWorkSchedule';
import ShiftViewer from './ShiftViewer';

export default function PartTimeRiderWorkSchedule() {
  return (
    <>
      <div
        style={{
          marginLeft: '20%',
          marginRight: '20%',
        }}
      >
        <ShiftViewer />
      </div>

      <Divider />

      <div
        style={{
          marginLeft: '20%',
          marginRight: '20%',
        }}
      >
        <WeeklyWorkSchedule />
      </div>
    </>
  );
}
