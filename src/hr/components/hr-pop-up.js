
'use client';

import { Button, Modal } from 'flowbite-react';
import { useState } from 'react';

function PopUp(props) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>View</Button>
      <Modal dismissible  show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Track Leave Request</Modal.Header>
        <Modal.Body>
          <div >
             {props.content}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setOpenModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PopUp;
