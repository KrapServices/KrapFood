import React from 'react';
import 'react-calendar/dist/Calendar.css';
import { Divider } from 'semantic-ui-react';
import MonthShiftViewer from './MonthShiftViewer';
import MonthShiftPicker from './MonthShiftPicker';

export default function FullTimeRiderWorkSchedule() {
  return (
    <>
      <div
        style={{
          marginLeft: '20%',
          marginRight: '20%',
        }}
      >
        <MonthShiftViewer />
      </div>

      <Divider />

      <div
        style={{
          marginLeft: '20%',
          marginRight: '20%',
        }}
      >
        <MonthShiftPicker />
      </div>
    </>
  );
}
