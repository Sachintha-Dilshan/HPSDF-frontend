
'use client';

import { HiInformationCircle } from 'react-icons/hi';
import { Alert } from 'flowbite-react';

function Alerts(props) {
  return (
    <Alert color="failure" icon={HiInformationCircle} className="mt-1">
      <span className="font-medium">{props.alert}!</span> 
    </Alert>
  );
}


export default Alerts;