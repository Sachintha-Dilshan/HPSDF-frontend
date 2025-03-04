import { useEffect, useState } from "react";
import HRCollapseBar from "../components/hr-collapse-bar";
import Tab from "../../components/tabs";
import HREmployeeLeaveChit from "../components/hr-employee-leave-chit";
import HRIndividualLeaveRegister from "../components/hr-employee-individual-leave-register";
import HREmployeeCard from "../components/hr-employee-card";
import HRLeaveStatusTimeLine from "../components/hr-leave-status-timeline";
import HREmployeeAttendantSheet from "../components/hr-employee-individual-attendance-sheet";
import { Button, Modal, Spinner } from "flowbite-react";
import LeaveApplicationService from "../leave/services/leave-application-service";
import EmployeeService from "../services/add-new-employee-service";
import userRoles from "../../data/user-roles";
import LeaveRegisterService from "../leave/services/leave-register-service";

import {
  FaCalendarMinus,
  FaClipboardList,
  FaCalendarCheck,
} from "react-icons/fa";
import { useLocation } from "react-router-dom";
import LeaveTrackingService from "../leave/services/leave-tracker-service";

import { MdError, MdDoneOutline } from "react-icons/md";
import { IoIosWarning } from "react-icons/io";

function HREmployeeLeaveRequest() {
  const location = useLocation();
  const applicationId = location.state.applicationId;
  const employeeNicNo = location.state.employeeNicNo;
  const currentUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).roles
    : null;
  const roles = userRoles;

  const [employeeData, setEmployeeData] = useState([]);

  const [leaveChit, setLeaveChit] = useState("");

  const [message, setMessage] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [show, setShow] = useState(false);
  const [key, setKey] = useState(0);

  const getRegisterRecord = () => {
    if (leaveChit[0] === "අනියම් නිවාඩු") {
      return { casualLeave: leaveChit[1], nicNo: employeeNicNo };
    } else if (leaveChit[0] === "විවේක නිවාඩු") {
      return { vacationLeave: leaveChit[1], nicNo: employeeNicNo };
    } else if (leaveChit[0] === "ඉකුත් නිවාඩු") {
      return { expiredVacationLeave: leaveChit[1], nicNo: employeeNicNo };
    } else if (leaveChit[0] === "පරිවර්තික අඩ වැටුප් සහිත නිවාඩු") {
      return { commutedHalfPayLeave: leaveChit[1], nicNo: employeeNicNo };
    } else if (leaveChit[0] === "අඩ වැටුප් සහිත නිවාඩු") {
      return { halfPayLeave: leaveChit[1], nicNo: employeeNicNo };
    } else if (leaveChit[0] === "පඩි රහිත නිවාඩු") {
      return { noPayLeave: leaveChit[1], nicNo: employeeNicNo };
    } else if (leaveChit[0] === "රාජකාරි නිවාඩු") {
      return { dutyLeave: leaveChit[1], nicNo: employeeNicNo };
    } else if (leaveChit[0] === "කෙටි නිවාඩු") {
      return { shortLeave: leaveChit[1], nicNo: employeeNicNo };
    } else {
      return { vacationLeave: leaveChit[1], nicNo: employeeNicNo };
    }
  };

  const getLeaveChit = async (applicationId) => {
    try {
      const response = await LeaveApplicationService.getLeaveChit(
        applicationId
      );
      setLeaveChit(response.data[0]);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        console.log(error.response.data.error);
      }
    }
  };

  useEffect(() => {
    getLeaveChit(applicationId);
  }, [applicationId]);

  useEffect(() => {
    const getEmployeeData = async () => {
      try {
        const response = await EmployeeService.sortEmployeesByNicNo(
          employeeNicNo
        );
        setEmployeeData(response.data[0]);
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          console.log(error.response.data.error);
        }
      }
    };
    getEmployeeData();
  }, [employeeNicNo]);

  const approveRequest = (status) => {
    setStatus(status);
    const message =
      status === 1
        ? "ඔබට මෙම නිවාඩුව අනුමත කිරීමට අවශ්‍යද ?"
        : "ඔබට මෙම නිවාඩුව අවලංගු කිරීමට අවශ්‍යද ?";
    setMessage(message);
    setTitle("Warning");
    setShow(true);
    setOpenModal(true);
  };

  const data = [
    {
      id: 1,
      active: true,
      title: "Leave Chit",
      icon: FaCalendarMinus,
      content: <HREmployeeLeaveChit data={leaveChit} />,
    },
    currentUser.some(role => [roles.hrAdmin, roles.leaveAdmin, roles.chairman, roles.secretary].includes(role)) &&{
      id: 2,
      active: true,
      title: "Leave Register",
      icon: FaClipboardList,
      content: <HRIndividualLeaveRegister nicNo={employeeNicNo} key={key} />,
    },
    currentUser.some(role => [roles.hrAdmin, roles.leaveAdmin, roles.chairman, roles.secretary].includes(role)) &&{
      id: 3,
      active: true,
      title: "Employee Attendance ",
      icon: FaCalendarCheck,
      content: <HREmployeeAttendantSheet />,
    },
  ];
  return (
    <main>
      <HRCollapseBar />
      <div className="flex flex-col gap-2 m-5">
        <h3 className="text-center text-lg text-slate-500 font-semibold border-b-2 border-b-slate-200 uppercase mx-5">
          Leave Request
        </h3>
        <div className="flex md:flex-row flex-col items-center  flex-grow gap-10">
          <div>
            <HREmployeeCard
              nicNo={employeeNicNo}
              name={employeeData[1]}
              designation={employeeData[3]}
              contact={employeeData[2]}
            />
          </div>
          <div>
            {/* Leave tracking status goes here */}
            <HRLeaveStatusTimeLine applicationId={applicationId} key={key} />
          </div>
          <div>
            <fieldset className="border rounded-lg p-5 flex gap-20">
              <legend>{currentUser.includes(roles.chairman) ? "දෙපාර්තමේන්තු ප්‍රධානි අනුමැතිය" : (currentUser.includes(roles.secretary) ? "අධීක්ෂණ නිලධාරි අනුමැතිය" : "වැඩ බලන නිලධාරි අනුමැතිය")}</legend>
              <Button
                color="success"
                pill
                className="uppercase"
                onClick={() => {
                  approveRequest(1);
                }}
              >
                Approve
              </Button>
              <Button
                color="failure"
                pill
                className="uppercase"
                onClick={() => {
                  approveRequest(2);
                }}
              >
                Reject
              </Button>
            </fieldset>
          </div>
        </div>

        <div className="grid grid-cols-1">
          <Tab para={data} />
        </div>
      </div>

      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>
          {title === "Processing" && <Spinner size="xl" className="mr-5" />}
          {title === "Error" && (
            <MdError className="inline-block text-red-500 text-4xl mr-5" />
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
            onClick={async () => {
              try {
                setMessage("සැකසෙමින් පවතී..");
                setTitle("Processing");
                setOpenModal(true);

                var request;
                if (currentUser.includes(roles.chairman)) {
                  request = {
                    hodApprovalTimeStamp: new Date(),
                    hodApprovalStatus: status === 1 ? 1 : 2,
                    leaveApplicationId: applicationId,
                  };
                  if (request.hodApprovalStatus === 1) {
                    var record = getRegisterRecord();
                    await LeaveRegisterService.saveLeaveRegister(record);
                  }

                  await LeaveApplicationService.updateApplicationStatus(
                    { status: request.hodApprovalStatus },
                    applicationId
                  );
                } else if (currentUser.includes(roles.secretary)) {
                  request = {
                    supervisorApprovalTimeStamp: new Date(),
                    supervisorApprovalStatus: status === 1 ? 1 : 2,
                    leaveApplicationId: applicationId,
                  };
                } else {
                  request = {
                    actingOfficerApprovalTimeStamp: new Date(),
                    actingOfficerApprovalStatus: status === 1 ? 1 : 2,
                    leaveApplicationId: applicationId,
                  };
                }

                await LeaveTrackingService.updateLeaveTrackerDetails(
                  request,
                  applicationId
                );

                const message =
                  status === 1
                    ? "නිවාඩුව සාර්ථකව අනුමත කරන ලදී"
                    : "නිවාඩුව සාර්ථකව අවලංගු කරන ලදී ";
                setMessage(message);
                setTitle("Success");
                setShow(false);
                setOpenModal(true);
                setKey((prevKey) => prevKey + 1);
              } catch (error) {
                if (
                  error.response &&
                  error.response.data &&
                  error.response.data.error
                ) {
                  console.log(error.response.data.error);
                }
              }
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

export default HREmployeeLeaveRequest;
