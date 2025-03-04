import {useState, useEffect} from 'react';
import HRCollapseBar from "../components/hr-collapse-bar";
import serviceSectorService from "../services/add-service-sector-service";

import { FloatingLabel, Table, Button, Modal } from "flowbite-react";

import { HiOutlineSave, HiDocumentDuplicate } from "react-icons/hi";
import { FaSyncAlt, FaEraser } from "react-icons/fa";
import {
  MdDelete,
  MdError,
  MdDoneOutline,
  MdRadioButtonUnchecked,
} from "react-icons/md";
import { IoIosWarning } from "react-icons/io";
import userRoles from "../../data/user-roles";

function HRAddServiceSectors() {
  const currentUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).roles
    : null;
  const roles = userRoles;


  const [serviceSectorName, setServiceSectorName] = useState("");
  const [serviceSectorData, setServiceSectorData] = useState([]);
  const [serviceSectorId, setServiceSectorId] = useState("");
  const [message, setMessage] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState("");
  const [show, setShow] = useState(false);
  const fetchAllData = () => {
    serviceSectorService
      .getAllServiceSectors()
      .then((response) => {
        setServiceSectorData(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

 useEffect(() => {
    fetchAllData();
  }, []);

  // const fetchRealTimeData = () => {
  //   LeaveTypeService.findByLeaveName(leaveName)
  //     .then((response) => {
  //       setLeaveData(response.data);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };

  // const fetchLeaveTypeByName = () => {
  //   LeaveTypeService.findByLeaveName(leaveName)
  //     .then((response) => {
  //       alert(response.data.leaveType + " \n දැනටමත් පද්ධතියට ඇතුලත් කර ඇත");
  //     })
  //     .catch((error) => {
  //       alert(error.message);
  //     });
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (serviceSectorName) {
      var data = {
        serviceSectorName: serviceSectorName,
      };
      serviceSectorService
        .findByServiceSectorName(serviceSectorName)
        .then((response) => {
          setMessage(
            response.data.serviceSectorName +
              " \n දැනටමත් පද්ධතියට ඇතුලත් කර ඇත"
          );
          setTitle("Duplicate");
          setOpenModal(true);
          setServiceSectorName("");
          setServiceSectorId("");
          return;
        })
        .catch(() => {
          serviceSectorService
            .addServiceSector(data)
            .then((response) => {
              setMessage(
                response.data.serviceSectorName +
                  " පද්ධතියට සාර්ථකව ඇතුලත් කරන ලදී"
              );
              setTitle("Success");
              setOpenModal(true);

              fetchAllData();
              setServiceSectorName("");
              setServiceSectorId("");
            })
            .catch((error) => {
              console.log(error.response.data);
            });
        });
    } else {
      setMessage("තනතුර අයත් වන සේවා කාණ්ඩය ඇතුලත් කිරීම අනිවාර්යයයි.");
      setTitle("Empty");
      setOpenModal(true);
    }
  };

  const updateData = () => {
    if (serviceSectorName && serviceSectorId) {
      serviceSectorService
        .findByServiceSectorName(serviceSectorName)
        .then((response) => {
          setMessage(
            response.data.serviceSectorName +
              " \n දැනටමත් පද්ධතියට ඇතුලත් කර ඇත"
          );
          setTitle("Duplicate");
          setOpenModal(true);
          setServiceSectorName("");
          setServiceSectorId("");
          return;
        })
        .catch(() => {
          var data = {
            id: serviceSectorId,
            serviceSectorName: serviceSectorName,
          };
          serviceSectorService
            .updateServiceSector(data, serviceSectorId)
            .then((response) => {
              setMessage(
                response.data.serviceSectorName + " සාර්ථකව යාවත්කාලීන කරන ලදී"
              );
              setTitle("Success");
              setOpenModal(true);
              fetchAllData();
              setServiceSectorName("");
              setServiceSectorId("");
            })
            .catch((error) => {
              alert(error.response.data.serviceSectorName);
            });
        });
    } else {
      setMessage("කරුණාකර පළමුව තනතුර අයත් වන සේවා කාණ්ඩය තෝරන්න");
      setTitle("Empty");
      setOpenModal(true);
    }
  };

  const deleteData = () => {
    if (serviceSectorId && serviceSectorName) {
      setMessage(
        "ඔබට " + serviceSectorName + " පද්ධතියෙන් ඉවත් කිරීමට අවශ්‍යද ?"
      );
      setTitle("Warning");
      setShow(true);
      setOpenModal(true);
    } else {
      setMessage("කරුණාකර පළමුව තනතුර අයත් වන සේවා කාණ්ඩය තෝරන්න");
      setTitle("Empty");
      setOpenModal(true);
    }
  };

  const handleClick = (serviceSectorName, serviceSectorId) => {
    setServiceSectorName(serviceSectorName);
    setServiceSectorId(serviceSectorId);
  };

  return (
    <main>
      <HRCollapseBar />
      <div className="flex flex-col  gap-2 m-5">
        <h3 className="text-center text-lg text-slate-500 font-semibold border-b-2 border-b-slate-200 uppercase">
          Change ServiceSectors
        </h3>

        <div style={{ fontFamily: "Noto Sans Sinhala" }}>
          {currentUser.includes(roles.hrAdmin) && (<form onSubmit={handleSubmit}>
          <fieldset className="border rounded-lg grid lg:grid-cols-6 p-5 md:gap-10 gap-5 m-5">

              <FloatingLabel
                variant="filled"
                label="අනු අංකය"
                value={serviceSectorId}
                disabled
                className="cursor-not-allowed bg-slate-200"
              />
              <FloatingLabel
                variant="filled"
                label="තනතුර අයත් වන සේවා කාණ්ඩය"
                value={serviceSectorName}
                onChange={(event) => {
                  setServiceSectorName(event.target.value);
                }}
              />
                <Button className="uppercase h-12" type="submit">
                  {" "}
                  <HiOutlineSave className="mr-2 h-5 w-5" />
                  Add Service Sector
                </Button>
                <Button
                  className="uppercase h-12"
                  color="purple"
                  onClick={updateData}
                >
                  {" "}
                  <FaSyncAlt className="mr-2 h-5 w-5" />
                  Update Service Sector
                </Button>
                <Button
                  className="uppercase h-12"
                  color="failure"
                  onClick={deleteData}
                >
                  {" "}
                  <MdDelete className="mr-2 h-5 w-5" />
                  Delete Service Sector
                </Button>
                <Button
                  className="uppercase bg-slate-600 h-12"
                  onClick={() => {setServiceSectorId(""); setServiceSectorName("")}}
                >
                  {" "}
                  <FaEraser className="mr-2 h-5 w-5" /> Clear Service Sector
                </Button>
            </fieldset>
          </form> )}
        </div>
        <div className="overflow-auto flex justify-center">
          <Table striped hoverable>
            <Table.Head className="text-center">
              <Table.HeadCell>අනු අංකය</Table.HeadCell>
              <Table.HeadCell>තනතුර අයත් වන සේවා කාණ්ඩය </Table.HeadCell>
            </Table.Head>

            <Table.Body className="divide-y">
              {serviceSectorData &&
                serviceSectorData.map((serviceSector) => {
                  return (
                    <Table.Row
                      className="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer"
                      key={serviceSector.serviceSectorId}
                      onClick={() =>
                        handleClick(
                          serviceSector.serviceSectorName,
                          serviceSector.serviceSectorId
                        )
                      }
                    >
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {serviceSector.serviceSectorId}
                      </Table.Cell>
                      <Table.Cell
                        className="whitespace-nowrap font-medium text-gray-900 dark:text-white"
                        key={serviceSector.serviceSectorId}
                      >
                        {serviceSector.serviceSectorName}
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
            </Table.Body>
          </Table>
        </div>
      </div>
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>
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
          {title === "Success" && (
            <MdDoneOutline className="inline-block text-lime-600 text-4xl mr-5" />
          )}
          {title}
        </Modal.Header>
        <Modal.Body>
          <div>{message}</div>
        </Modal.Body>
        <Modal.Footer className="flex justify-center">
          <Button onClick={() => setOpenModal(false)}>Close</Button>
          <Button
            onClick={() => {
              serviceSectorService
                .removeServiceSector(serviceSectorId)
                .then((response) => {
                  setShow(false);
                  setMessage(
                    serviceSectorName + " පද්ධතියෙන් සාර්ථකව ඉවත් කරන ලදී "
                  );
                  setTitle("Success");
                  fetchAllData();
                  setOpenModal(true);
                  setServiceSectorName("");
                  setServiceSectorId("");
                })
                .catch((e) => {
                  console.log(e);
                });
              setOpenModal(false);
            }}
            style={{ display: show ? "block" : "none" }}
            color="failure"
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </main>
  );
}

export default HRAddServiceSectors;
