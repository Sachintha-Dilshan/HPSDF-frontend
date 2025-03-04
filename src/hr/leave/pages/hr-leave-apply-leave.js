import { useEffect, useState } from "react";
import LeaveCollapseBar from "../components/hr-leave-collapse-bar";
import LeaveTypeService from "../services/leave-type-service";
import EmployeeService from "../../services/add-new-employee-service";
import editLeaveOfficerService from "../services/leave-edit-leave-officers-service";
import LeaveApplicationService from "../services/leave-application-service";
import LeaveTrackingService from "../services/leave-tracker-service";
import userRoles from "../../../data/user-roles";
import HRCollapseBar from "../../components/hr-collapse-bar";

import {
  FloatingLabel,
  Select,
  Datepicker,
  Label,
  Button,
  Modal,
  Spinner
} from "flowbite-react";
import { MdError, MdDoneOutline, MdRadioButtonUnchecked } from "react-icons/md";
import { IoSend } from "react-icons/io5";

function HRLeaveApplyLeave() {
  const currentUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).roles
    : null;
  const roles = userRoles;

  const [leaveTypes, setLeaveTypes] = useState([]);
  const [employeeLeavePersonalData, setEmployeeLeavePersonalData] = useState(
    []
  );

  const [actingOfficerName, setActingOfficerName] = useState("");

  const [heads, setHeads] = useState([]);
  const [supervisors, setSupervisors] = useState([]);

  const [message, setMessage] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState("");

  const [applicationData, setApplicationData] = useState({
    employeeLeaveId: "",
    actingOfficerLeaveId: "",
    supervisorNicNo: "",
    hodNicNo: "",
    leaveType: "",
    leaveCommencingDate: "",
    dateOfResumingDuties: "",
    leavePeriod: "",
    reason: "",
    status: 0,  // Status => {0 : Pending, 1 : Approved, 2 : Rejected }
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setApplicationData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const resetApplicationData = () => {
    setApplicationData({
      employeeLeaveId: "",
      actingOfficerLeaveId: "",
      supervisorNicNo: "",
      hodNicNo: "",
      leaveType: "",
      leaveCommencingDate: "",
      dateOfResumingDuties: "",
      leavePeriod: "",
      reason: "",
      status: 1,
    });
  };
  const getHeads = async () => {
    try {
      const response = await editLeaveOfficerService.getLeaveOfficers(
        "ROLE_CHAIRMAN"
      );
      setHeads(response.data);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        console.log(error.response.data.error);
      }
    }
  };

  const getSupervisors = async () => {
    try {
      const response = await editLeaveOfficerService.getLeaveOfficers(
        "ROLE_SECRETARY"
      );
      setSupervisors(response.data);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        console.log(error.response.data.error);
      }
    }
  };

  useEffect(() => {
    getHeads();
    getSupervisors();
  }, []);

  useEffect(() => {
    if (applicationData.employeeLeaveId === "") {
      setEmployeeLeavePersonalData([]);
    } else {
      EmployeeService.getEmployeeLeavePersonalData(
        applicationData.employeeLeaveId
      )
        .then((response) => {
          if (response.data && response.data.length > 0) {
            setEmployeeLeavePersonalData(response.data || []);
          } else {
            setEmployeeLeavePersonalData([]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [applicationData.employeeLeaveId]);

  useEffect(() => {
    if (applicationData.actingOfficerLeaveId === "") {
      setActingOfficerName("");
    } else {
      EmployeeService.getEmployeeName(applicationData.actingOfficerLeaveId)
        .then((response) => {
          if (response.data && response.data.length > 0)
            setActingOfficerName(response.data || "");
          else setActingOfficerName("");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [applicationData.actingOfficerLeaveId]);

  useEffect(() => {
    LeaveTypeService.getAllLeaveTypes()
      .then((response) => {
        setLeaveTypes(response.data || []);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const saveApplication = async () => {
    if (applicationData.employeeLeaveId === "" && employeeLeavePersonalData) {
      setMessage("අයදුම්කරුගේ නිවාඩු අංකය ඇතුලත් කිරීම අනිවාර්යයි.");
      setTitle("Empty");
      setOpenModal(true);
    } else if (
      applicationData.actingOfficerLeaveId === "" &&
      actingOfficerName
    ) {
      setMessage("වැඩ බලන නිලධාරිගෙ නිවාඩු අංකය ඇතුලත් කිරීම අනිවාර්යයි.");
      setTitle("Empty");
      setOpenModal(true);
    } else if (applicationData.supervisorNicNo === "") {
      setMessage("අධීක්ෂණ නිලධාරියෙකු ඇතුලත් කිරීම අනිවාර්යයි.");
      setTitle("Empty");
      setOpenModal(true);
    } else if (applicationData.hodNicNo === "") {
      setMessage("දෙපාර්තමේන්තු ප්‍රධානීව ඇතුලත් කිරීම අනිවාර්යයි.");
      setTitle("Empty");
      setOpenModal(true);
    } else if (applicationData.leaveCommencingDate === "") {
      setMessage("නිවාඩු පටන් ගන්නා දිනය ඇතුලත් කිරීම අනිවාර්යයි.");
      setTitle("Empty");
      setOpenModal(true);
    } else if (applicationData.dateOfResumingDuties === "") {
      setMessage("නැවත සේවයට පැමිණෙන දිනය ඇතුලත් කිරීම අනිවාර්යයි.");
      setTitle("Empty");
      setOpenModal(true);
    } else if (applicationData.leavePeriod === "") {
      setMessage("නිවාඩු ඉල්ලා සිටින දින ගණන ඇතුලත් කිරීම අනිවාර්යයි.");
      setTitle("Empty");
      setOpenModal(true);
    } else if (applicationData.reason === "") {
      setMessage("නිවාඩු ඉල්ලීමට හේතුව ඇතුලත් කිරීම අනිවාර්යයි.");
      setTitle("Empty");
      setOpenModal(true);
    } else {
      try {
        setMessage("සැකසෙමින් පවතී..");
        setTitle("Processing");
        setOpenModal(true);

        const response = await LeaveApplicationService.saveLeaveApplication(
          applicationData
        );
        await LeaveTrackingService.saveLeaveTrackingDetails
        (
          {
            applicationSubmittedTimeStamp : new Date(),
            leaveApplicationId : response.data.applicationId
          }
        )
        setMessage(
        "නිවාඩුව සාර්ථකව අයදුම් කරන ලදී. \n අයදුම්පත්‍ර අංකය : " +
            response.data.applicationId
        );
        setTitle("Success");
        setOpenModal(true);
        resetApplicationData();

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

  return (
    <main>
      {currentUser.some((role) =>
        [roles.hrAdmin, roles.chairman, roles.secretary].includes(role)
      ) && <HRCollapseBar />}
      {currentUser.includes(roles.leaveAdmin) && <LeaveCollapseBar />}
      <div className="flex flex-col  gap-2 m-5">
        <h3 className="text-center text-lg text-slate-500 font-semibold border-b-2 border-b-slate-200 uppercase">
          Apply Leave
        </h3>
        <fieldset className="border rounded-lg p-5 md:gap-10 gap-5 m-5 grid lg:grid-cols-4">
          <FloatingLabel
            variant="filled"
            label="නිවාඩු අංකය"
            name="employeeLeaveId"
            value={applicationData.employeeLeaveId}
            onChange={handleChange}
          />
          <FloatingLabel
            variant="filled"
            label="නම"
            disabled
            value={
              employeeLeavePersonalData && employeeLeavePersonalData.length > 0
                ? employeeLeavePersonalData[0][0]
                : ""
            }
            className="cursor-not-allowed bg-slate-200"
          />
          <FloatingLabel
            variant="filled"
            label="තනතුර"
            disabled
            className="cursor-not-allowed bg-slate-200"
            value={
              employeeLeavePersonalData && employeeLeavePersonalData.length > 0
                ? employeeLeavePersonalData[0][1]
                : ""
            }
          />
          <FloatingLabel
            variant="filled"
            label="මුල් පත්වීමේ දිනය"
            className="cursor-not-allowed bg-slate-200"
            disabled
            value={
              employeeLeavePersonalData && employeeLeavePersonalData.length > 0
                ? employeeLeavePersonalData[0][2]
                : ""
            }
          />
        </fieldset>

        <fieldset className="border rounded-lg p-5 md:gap-10 gap-5 m-5 grid lg:grid-cols-3 items-center">
          <legend className="text-slate-600">
            නිවාඩුව අනුමත කරන නිලධාරින්
          </legend>

          <fieldset className="border rounded-lg p-5 gap-5 grid">
            <legend className="text-slate-600">වැඩ බලන නිලධාරි</legend>
            <FloatingLabel
              variant="filled"
              label="නිවාඩු අංකය"
              value={applicationData.actingOfficerLeaveId}
              name="actingOfficerLeaveId"
              onChange={handleChange}
            />

            <FloatingLabel
              id="actingOfficer"
              variant="filled"
              label="නම"
              className="cursor-not-allowed bg-slate-200"
              disabled
              name="actingOfficerName}"
              value={actingOfficerName}
            />
          </fieldset>

          <div>
            <Label
              htmlFor="leaveType"
              className="text-slate-500 text-base ml-2"
            >
              අධීක්ෂණ නිලධාරි
            </Label>
            <Select
              id="supervisor"
              name="supervisorNicNo"
              value={applicationData.supervisorNicNo}
              onChange={handleChange}
            >
              <option value="">-----Select-----</option>
              {supervisors.map((supervisor) => (
                <option value={supervisor[0]} key={supervisor[0]}>
                  {supervisor[1]}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <Label
              htmlFor="leaveType"
              className="text-slate-500 text-base ml-2"
            >
              දෙපාර්තමේන්තු ප්‍රධානි
            </Label>
            <Select
              id="head"
              name="hodNicNo"
              value={applicationData.hodNicNo}
              onChange={handleChange}
            >
              <option value="">-----Select-----</option>
              {heads.map((head) => (
                <option value={head[0]} key={head[0]}>
                  {head[1]}
                </option>
              ))}
            </Select>
          </div>
        </fieldset>

        <fieldset className="border rounded-lg p-5 md:gap-10 gap-5 m-5 grid lg:grid-cols-3 items-center">
          <legend className="text-slate-600">නිවාඩු අයදුම් පත්‍රය</legend>
          <div>
            <Label
              htmlFor="leaveType"
              className="text-slate-500 text-base ml-2"
            >
              නිවාඩු වර්ගය
            </Label>
            <Select
              id="leaveType"
              name="leaveType"
              value={applicationData.leaveType}
              onChange={handleChange}
            >
              <option value="">-----Select-----</option>
              {leaveTypes.map((item) => {
                return (
                  <option value={item.id} key={item.id}>
                    {item.leaveType}
                  </option>
                );
              })}
            </Select>
          </div>

          <div>
            <Label
              htmlFor="leaveCommencingDate"
              className="text-slate-500 text-base ml-2"
            >
              නිවාඩු පටන් ගන්නා දිනය
            </Label>
            <Datepicker
              id="leaveCommencingDate"
              name="leaveCommencingDate"
              value={applicationData.leaveCommencingDate}
              onSelectedDateChanged={(date) => {
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, "0");
                const day = String(date.getDate()).padStart(2, "0");
                setApplicationData((prevData) => {
                  return {
                    ...prevData,
                    leaveCommencingDate: `${year}-${month}-${day}`,
                  };
                });
              }}
            />
          </div>

          <div>
            <Label
              htmlFor="dateOfResumingDuties"
              className="text-slate-500 text-base ml-2"
            >
              නැවත සේවයට පැමිණෙන දිනය
            </Label>
            <Datepicker
              id="dateOfResumingDuties"
              name="dateOfResumingDuties"
              value={applicationData.dateOfResumingDuties}
              onSelectedDateChanged={(date) => {
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, "0");
                const day = String(date.getDate()).padStart(2, "0");
                setApplicationData((prevData) => {
                  return {
                    ...prevData,
                    dateOfResumingDuties: `${year}-${month}-${day}`,
                  };
                });
              }}
            />
          </div>
          <FloatingLabel
            variant="filled"
            label="නිවාඩු ඉල්ලා සිටින දින ගණන"
            type="number"
            name="leavePeriod"
            value={applicationData.leavePeriod}
            onChange={handleChange}
          />

          <FloatingLabel
            variant="filled"
            label="නිවාඩු ඉල්ලීමට හේතු"
            name="reason"
            value={applicationData.reason}
            onChange={handleChange}
          />
          <Button className="font-bold" onClick={saveApplication}>
            <IoSend className="mr-4 h-5 w-5" />
            අයදුම් කරන්න
          </Button>
        </fieldset>
      </div>

      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>
        {title === "Processing" && <Spinner size="xl" className="mr-5" />}
          {title === "Error" && (
            <MdError className="inline-block text-red-500 text-4xl mr-5" />
          )}
          {title === "Empty" && (
            <MdRadioButtonUnchecked className="inline-block text-red-500 text-4xl mr-5" />
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
        </Modal.Footer>
      </Modal>
    </main>
  );
}

export default HRLeaveApplyLeave;
