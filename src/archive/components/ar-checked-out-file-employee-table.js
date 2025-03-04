import { Button, Table, Modal, Spinner } from "flowbite-react";
import { useState } from "react";
import { MdDoneOutline, MdRadioButtonUnchecked, MdError } from "react-icons/md";
import { HiDocumentDuplicate } from "react-icons/hi";
import { FaSearchMinus } from "react-icons/fa";

import { IoIosWarning } from "react-icons/io";
import fileService from "../services/add-file-service";
import FormattedDate from "../../hr/components/hr-date-converter";
import archiveTransactionService from "../services/archive-transaction-service";
import userRoles from "../../data/user-roles";

function ARCheckedOutFileEmployeeTable(props) {
  const currentUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).roles : null;
  const roles = userRoles;

  const [currentFile, setCurrentFile] = useState("");
  const [message, setMessage] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState("");
  const [show, setShow] = useState(false);

  const handleClick = async (file) => {
    setCurrentFile(file);
    setMessage(
      "Are you sure you want to check in file no : " +
        file.archiveFile.fileNumber
    );
    setTitle("Warning");
    setShow(true);
    setOpenModal(true);
  };
  return (
    <div className="overflow-auto">
      <Table striped hoverable>
        <Table.Head>
          <Table.HeadCell>File Number</Table.HeadCell>
          <Table.HeadCell>File Name</Table.HeadCell>
          <Table.HeadCell>Section</Table.HeadCell>
          <Table.HeadCell>Subject</Table.HeadCell>
          <Table.HeadCell>Checked Out Date</Table.HeadCell>
          <Table.HeadCell>Check In</Table.HeadCell>
        </Table.Head>

        <Table.Body className="divide-y">
          {props.files &&
            props.files.map((file) => (
              <Table.Row
                key={file.id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {file.archiveFile.fileNumber}
                </Table.Cell>
                <Table.Cell>{file.archiveFile.fileName}</Table.Cell>
                <Table.Cell>
                  {file.archiveFile.archiveSection.sectionName}
                </Table.Cell>
                <Table.Cell>
                  {file.archiveFile.archiveSubject.subjectName}
                </Table.Cell>
                <Table.Cell>
                  {
                    <FormattedDate
                      dateString={file.checkedOutTimeStamp}
                    ></FormattedDate>
                  }
                </Table.Cell>
                <Table.Cell>
                  {file.checkedInTimeStamp && (
                    <FormattedDate
                      dateString={file.checkedInTimeStamp}
                    ></FormattedDate>
                  )}
                  {currentUser.includes(roles.archivist) && !file.checkedInTimeStamp && (
                    <Button
                      onClick={() => handleClick(file)}
                      className="uppercase"
                    >
                      Check In
                    </Button>
                  )}
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>
          {title === "Processing" && <Spinner size="xl" />}
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
          <Button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            Close
          </Button>
          <Button
            onClick={async () => {
              try {
                const updateRequest = {
                  checkedOut: false,
                };
                await fileService.updateFile(
                  currentFile.archiveFile.id,
                  updateRequest
                );
                const request = {
                  checkedInTimeStamp: new Date(),
                };
                const response =
                  await archiveTransactionService.updateFileTransaction(
                    currentFile.id,
                    request
                  );
                setMessage(
                  response.data.archiveFile.fileNumber +
                    " is checked in successfully"
                );
                setTitle("Success");
                setOpenModal(true);
                setCurrentFile("");
              } catch (error) {
                if (error.response.status === 404) {
                  setMessage("Transaction is not found");
                  setTitle("Not Found");
                  setOpenModal(true);
                } else if (
                  error.response &&
                  error.response.data &&
                  error.response.data.error
                ) {
                  setMessage(error.response.data.error);
                  setTitle("Error");
                  setOpenModal(true);
                }
              }
              setShow(false);
            }}
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
export default ARCheckedOutFileEmployeeTable;
