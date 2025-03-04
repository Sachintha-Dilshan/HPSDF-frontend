import { useEffect, useState } from "react";
import ARFileCollapseBar from "../components/ar-file-collapse-bar";
import { FloatingLabel, Table, Button, Modal } from "flowbite-react";

import { HiOutlineSave } from "react-icons/hi";
import { FaSyncAlt, FaEraser } from "react-icons/fa";
import { MdDelete, MdError, MdDoneOutline } from "react-icons/md";
import { IoIosWarning } from "react-icons/io";
import rackService from "../services/add-rack-service";

function AREditRacks() {
  const [rackName, setRackName] = useState("");
  const [racks, setRacks] = useState([]);
  const [rackId, setRackId] = useState("");
  const [message, setMessage] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState("");
  const [show, setShow] = useState(false);

  const getAllRacks = async () => {
    try {
      setRacks([]);
      const response = await rackService.getAllRacks();
      setRacks(response.data);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        console.log(error.response.data.error);
      }
    }
  };

  useEffect(() => {
    getAllRacks();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (rackName === "") {
      setMessage("Please enter the rack name");
      setTitle("Empty");
      setOpenModal(true);
    } else {
      try {
        const data = {
          rackNumber: rackName,
        };
        const response = await rackService.addRacks(data);
        setMessage(response.data.rackNumber + " has been added successfully");
        setTitle("Success");
        setOpenModal(true);
        setRackName("");
        setRackId("");
        getAllRacks();
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          setMessage(error.response.data.error);
          setTitle("Error");
          setOpenModal(true);
        }
      }
    }
  };

  const updateRacks = async () => {
    if (rackId === "" || rackName === "") {
      setMessage("Please first select a rack from the table");
      setTitle("Empty");
      setOpenModal(true);
    } else {
      try {
        const data = {
          rackNumber: rackName,
        };
        const response = await rackService.updateRacks(rackId, data);
        if (response.status === 200) {
          setMessage(
            response.data.rackNumber + " has been updated successfully"
          );
          setTitle("Success");
          setOpenModal(true);
          setRackName("");
          setRackId("");
          getAllRacks();
        }
        // Continue with any other logic after a successful response
      } catch (error) {
        if (error.response.status === 404) {
          setMessage(rackName + " is not found");
          setTitle("Not Found");
          setOpenModal(true);
        } else if (error.response.status === 409) {
          setMessage(error.response.data.error);
          setTitle("Duplicate");
          setOpenModal(true);
        } else if (error.response.status === 500) {
          setMessage(error.response.data.error);
          setTitle("Error");
          setOpenModal(true);
        }
      }
    }
  };

  const deleteRacks = () => {
    if (rackId !== "" && rackName !== "") {
      setMessage("Are you sure you want to delete the rack : " + rackName);
      setTitle("Warning");
      setShow(true);
      setOpenModal(true);
    } else {
      setMessage("Please first select a rack from the table");
      setTitle("Empty");
      setOpenModal(true);
    }
  };

  const handleClick = (rackName, rackId) => {
    setRackName(rackName);
    setRackId(rackId);
  };

  return (
    <main>
      <ARFileCollapseBar />
      <div className="flex flex-col  gap-2 m-5">
        <h3 className="text-center text-lg text-slate-500 font-semibold border-b-2 border-b-slate-200 uppercase">
          Edit Racks
        </h3>
        {/* Personal details starts here */}
        <div style={{ fontFamily: "Noto Sans Sinhala" }}>
          <form onSubmit={handleSubmit}>
            <fieldset className="border rounded-lg flex items-center justify-center lg:flex-row  flex-col p-5 md:gap-10 gap-5 m-5">
              <FloatingLabel
                variant="filled"
                label="Rack Name"
                className="w-96"
                value={rackName}
                onChange={(event) => {
                  setRackName(event.target.value);
                }}
              />

              <div className="grid lg:grid-cols-4 gap-5">
                <Button className="uppercase" type="submit">
                  {" "}
                  <HiOutlineSave className="mr-2 h-5 w-5" />
                  Add Rack
                </Button>
                <Button
                  className="uppercase"
                  color="purple"
                  onClick={updateRacks}
                >
                  {" "}
                  <FaSyncAlt className="mr-2 h-5 w-5" />
                  Update Rack
                </Button>
                <Button
                  className="uppercase"
                  color="failure"
                  onClick={deleteRacks}
                >
                  {" "}
                  <MdDelete className="mr-2 h-5 w-5" />
                  Delete Rack
                </Button>
                <Button
                  className="uppercase bg-slate-600"
                  onClick={() => {
                    setRackId("");
                    setRackName("");
                  }}
                >
                  {" "}
                  <FaEraser className="mr-2 h-5 w-5" />
                  Clear Rack
                </Button>
              </div>
            </fieldset>
          </form>
        </div>
        <div className="overflow-auto flex justify-center">
          <Table striped hoverable>
            <Table.Head className="text-center">
              <Table.HeadCell>Rack Name</Table.HeadCell>
            </Table.Head>

            <Table.Body className="divide-y">
              {racks &&
                racks.map((rack) => {
                  return (
                    <Table.Row
                      className="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer"
                      key={rack.id}
                      onClick={() => handleClick(rack.rackNumber, rack.id)}
                    >
                      <Table.Cell
                        className="whitespace-nowrap font-medium text-gray-900 dark:text-white"
                        key={rack.id}
                      >
                        {rack.rackNumber}
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
          {title === "Warning" && (
            <IoIosWarning className="inline-block text-amber-500 text-4xl mr-5" />
          )}
          {title === "Success" && (
            <MdDoneOutline className="inline-block text-lime-600 text-4xl mr-5" />
          )}{" "}
          {title}
        </Modal.Header>
        <Modal.Body>
          <div>{message}</div>
        </Modal.Body>
        <Modal.Footer className="flex justify-center">
          <Button onClick={() => setOpenModal(false)}>Close</Button>
          <Button
            onClick={async () => {
              try {
                await rackService.deleteRacks(rackId);
                setMessage(rackName + " has been deleted successfully");
                setTitle("Success");
                setOpenModal(true);
                setRackId("");
                setRackName("");
                getAllRacks();
              } catch (error) {
                if (error.response.status === 404) {
                  setMessage(rackName + " is not found");
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
    </main>
  );
}

export default AREditRacks;
