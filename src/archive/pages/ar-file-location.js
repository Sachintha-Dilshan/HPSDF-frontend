import { Button, FloatingLabel } from "flowbite-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GiBookshelf } from "react-icons/gi";
import { ImDrawer } from "react-icons/im";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { VscFileSubmodule } from "react-icons/vsc";
import ARFileCollapseBar from "../components/ar-file-collapse-bar";
import ARFileLocationCard from "../components/ar-file-location-card";
import fileService from "../services/add-file-service";
import { Modal, Spinner } from "flowbite-react";
import { MdDoneOutline, MdRadioButtonUnchecked, MdError } from "react-icons/md";
import { IoIosWarning } from "react-icons/io";
import { HiDocumentDuplicate } from "react-icons/hi";
import { FaSearchMinus } from "react-icons/fa";
import archiveTransactionService from "../services/archive-transaction-service";
import userRoles from "../../data/user-roles";

function ARFileLocation() {
  const location = useLocation();
  const navigate = useNavigate();
  const file = location.state;

  const currentUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).roles : null;
  const roles = userRoles;

  const [employeeId, setEmployeeId] = useState("");
  const [message, setMessage] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState("");

  const handleCheckOut = async () => {
    if (employeeId === "") {
      setMessage("Please enter the NIC No of employee");
      setTitle("Empty");
      setOpenModal(true);
    } else {
      try {
        const request = {
          employee: {
            nicNo: employeeId,
          },
          archiveFile: {
            id: file.id,
          },
          checkedOutTimeStamp: new Date(),
        };

        await archiveTransactionService.saveTransaction(request);

        const updateRequest = {
          checkedOut: true,
        };
        await fileService.updateFile(file.id, updateRequest);

        navigate("/AR/checkedOutFilesEmployee", { state: employeeId });
      } catch (error) {
        if (error.response.status === 404) {
          setMessage(employeeId + " is not a valid Nic number");
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
    }
  };

  const cardData = [
    {
      id: 1,
      title: "RACK NUMBER",
      count: file.rack.rackNumber,
      Icon: <GiBookshelf className="w-40 h-40" />,
    },
    {
      id: 2,
      title: "BOX NUMBER",
      count: file.boxNumber,
      Icon: <ImDrawer className="w-40 h-40" />,
    },
    {
      id: 3,
      title: "FILE INDEX",
      count: file.fileIndex,
      Icon: <VscFileSubmodule className="w-40 h-40" />,
    },
  ];

  return (
    <main>
      <ARFileCollapseBar />
      <div className="flex flex-col gap-2 m-5">
        <h3 className="text-center text-lg text-slate-500 font-semibold border-b-2 border-b-slate-200 uppercase">
          FILE LOCATION
        </h3>
      </div>

      <fieldset className="border rounded-lg grid lg:grid-cols-4 p-5 gap-5 m-5">
        <legend className="text-slate-600">Search File</legend>
        <FloatingLabel
          variant="filled"
          label="File Number"
          value={file.fileNumber}
          className="uppercase"
          readOnly
        />
        <FloatingLabel
          variant="filled"
          label="File Name"
          value={file.fileName}
          className="uppercase"
          readOnly
        />
        <FloatingLabel
          variant="filled"
          label="Year"
          value={file.year}
          className="uppercase"
          readOnly
        />
        <FloatingLabel
          variant="filled"
          label="Section"
          value={file.archiveSection.sectionName}
          className="uppercase"
          readOnly
        />
        <FloatingLabel
          variant="filled"
          label="Subject"
          value={file.archiveSubject.subjectName}
          className="uppercase"
          readOnly
        />
      </fieldset>

      {/* cards starts here */}
      <div className="grid col-span-2 lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-1 gap-16 my-5 mx-10 mt-10 sm:ml-4">
        {cardData.map((data) => (
          <ARFileLocationCard
            key={data.id}
            title={data.title}
            count={data.count}
            Icon={data.Icon}
          />
        ))}
      </div>

      {currentUser.includes(roles.archivist) && <div>
        <fieldset className="border rounded-lg flex lg:flex-row flex-col justify-center items-center p-5 gap-5 m-5">
          <FloatingLabel
            variant="filled"
            label="NIC NO"
            name="employeeId"
            value={employeeId}
            onChange={(event) => {
              setEmployeeId(event.target.value);
            }}
            disabled={file.checkedOut}
            className={file.checkedOut && "cursor-not-allowed"}
          />
          <div>
            <Button
              className="uppercase w-52"
              color="green"
              onClick={handleCheckOut}
              disabled={file.checkedOut}
            >
              <MdOutlineShoppingCartCheckout className="mr-2 h-5 w-5 uppercase" />
              Check Out
            </Button>
            <small className="text-orange-900">
              {file.checkedOut ? "The file is already checked out." : ""}
            </small>
          </div>
        </fieldset>
      </div>}
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
          <div className="normal-case text-center">{message}</div>
        </Modal.Body>
        <Modal.Footer className="flex justify-center">
          <Button onClick={() => setOpenModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </main>
  );
}

export default ARFileLocation;
