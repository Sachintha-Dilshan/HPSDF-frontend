import { Button, Table, Modal,Spinner } from 'flowbite-react';
import {
  MdDelete,
  MdDoneOutline,
  MdRadioButtonUnchecked,
  MdError,
} from "react-icons/md";
import { HiMail, HiOutlineSave,HiDocumentDuplicate } from "react-icons/hi";
import {
  FaSearchMinus
} from "react-icons/fa";

import { IoIosWarning } from "react-icons/io";
import { useState } from 'react';
import fileService from '../services/add-file-service';

function ARCheckedOutFileTable(props) {
    
const [message, setMessage] = useState("");
const [openModal, setOpenModal] = useState(false);
const [title, setTitle] = useState("");
const [show, setShow] = useState(false);

    const checkInFile=(fileId)=>{
    
      console.log(fileId); 
      fileService.checkInFile(fileId)
      .then((response=>{
        console.log(response.data);
        setMessage(response.data);
        setTitle("Success");
        setOpenModal(true);
      }))
      .catch((error)=>{
        console.log(error.response.data);
      })
      
     
    }
  return (
    <div className="overflow-auto">
      <Table striped hoverable>
        <Table.Head>
          <Table.HeadCell>File Number</Table.HeadCell>
          <Table.HeadCell>File Name</Table.HeadCell>
          <Table.HeadCell>Section</Table.HeadCell>
          <Table.HeadCell>Employee Name</Table.HeadCell>
          <Table.HeadCell>Checked Out Date</Table.HeadCell>
         <Table.HeadCell>Check In</Table.HeadCell>
            
        </Table.Head>


        <Table.Body className="divide-y">

        {props.files && props.files.map((file) => (
        <Table.Row key={file.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
{/*{status.name}*/}{file.fileNumber}
          </Table.Cell>
          <Table.Cell>{file.fileName}</Table.Cell>
          <Table.Cell >{/*{status.acting ? <span className="text-green-500 uppercase flex gap-5 items-center" > <FaCheck/>  Approved</span> : <span className="text-orange-400 uppercase flex gap-5 items-center"> <FaHourglass/>  Pending</span>} */}{file.sectionName}</Table.Cell>
          <Table.Cell >{/*{status.supervisor ? <span className="text-green-500 uppercase flex gap-5 items-center" > <FaCheck/>  Approved</span> : <span className="text-orange-400 uppercase flex gap-5 items-center"> <FaHourglass/>  Pending</span>} */}{file.employeeFullName}</Table.Cell>
          <Table.Cell >{/*{status.hod ? <span className="text-green-500 uppercase flex gap-5 items-center" > <FaCheck/>  Approved</span> : <span className="text-orange-400 uppercase flex gap-5 items-center"> <FaHourglass/>  Pending</span>}*/} {file.dateTime}</Table.Cell>
          <Table.Cell>
            <Button  onClick={()=>checkInFile(file.id)}>Check In</Button>
          </Table.Cell>
        </Table.Row>
      ))}

        </Table.Body>
      </Table>
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        
        <Modal.Header>
          {title === "Processing" && (
            <Spinner size="xl" />
          )}
          {title === "Error" && (
            <MdError className="inline-block text-red-500 text-4xl mr-5" />
          )}
          {title === "Empty" && (
            <MdRadioButtonUnchecked className="inline-block text-red-500 text-4xl mr-5" />
          )}
          {title === "Duplicate" && (
            <HiDocumentDuplicate className="inline-block text-yellow-400 text-4xl mr-5" />
          )}
          {title === "Warning" && (
            <IoIosWarning className="inline-block text-amber-500 text-4xl mr-5" />
          )}
          {title === "Not Found" && (
            <FaSearchMinus className="inline-block text-yellow-500 text-4xl mr-5" />
          )}
          {title === "Success" && (
            <MdDoneOutline className="inline-block text-lime-600 text-4xl mr-5" />
          )}
          {title}
        </Modal.Header>
        <Modal.Body>
          <div className="uppercase text-center">{message}</div>
        </Modal.Body>
        <Modal.Footer className="flex justify-center">
          <Button onClick={() =>{setOpenModal(false);props.searchFile()} }>Close</Button>
          <Button
            // onClick={() => {
            //   EmployeeService.removeEmployee(serachId)
            //     .then((response) => {
            //       resetEmployeeData();
            //       setShow(false);
            //       setMessage(serachId + " පද්ධතියෙන් සාර්ථකව ඉවත් කරන ලදී ");
            //       setTitle("Success");
            //       setOpenModal(true);
            //     })
            //     .catch((e) => {
            //       console.log(e);
            //     });
            //   setOpenModal(false);
            // }}
            style={{ display: show ? "block" : "none" }}
            color="failure"
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ARCheckedOutFileTable