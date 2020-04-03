import React from 'react';
import PartTimeRider from './PartTimeRider';
import FullTimeRider from './FullTimeRider';
import UserContext from '../../../userContext';

export default function Rider() {
  const userContext = React.useContext(UserContext);
  const { user } = userContext;
  const { status } = user;

  return (
    <>
      {status === 'part'
        ? <PartTimeRider />
        : <FullTimeRider />}
    </>
  );
}

Rider.contextType = UserContext;
