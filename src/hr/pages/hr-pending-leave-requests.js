"use client";
import { FaCheck, FaHourglass } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { Table } from "flowbite-react";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import LeaveApplicationService from "../leave/services/leave-application-service";
import { useState, useEffect } from "react";
import HRCollapseBar from "../components/hr-collapse-bar";
import LeaveCollapseBar from "../leave/components/hr-leave-collapse-bar";
import userRoles from "../../data/user-roles";

function HRPendingLeaveRequests() {
  const navigate = useNavigate();
  const nicNo = JSON.parse(localStorage.getItem("nicNo"));
  const currentUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).roles
    : null;
  const roles = userRoles;

  const [leaveStatus, setLeaveStatus] = useState("");

  useEffect(() => {
    const getLeaveRequests = async () => {
      try {
        const response = await LeaveApplicationService.getLeaveRequests(nicNo);
        setLeaveStatus(response.data);
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
    getLeaveRequests();
  }, [nicNo]);

  

  return (
    <main>
      {/* Collapse bar starts here */}
      {currentUser.some(role => [roles.hrAdmin, roles.chairman, roles.secretary].includes(role)) && <HRCollapseBar />}
      {currentUser.includes(roles.leaveAdmin) && <LeaveCollapseBar />}
      {/* Collapse bae ends here */}
      <div className="overflow-auto">
        <h3 className="text-center text-lg text-slate-500 font-semibold border-b-2 border-b-slate-200 uppercase mx-5">
          Pending Leave Requests
        </h3>
        <Table striped hoverable>
          <Table.Head>
            <Table.HeadCell>Employee Name</Table.HeadCell>
            <Table.HeadCell>Leave Type</Table.HeadCell>
            <Table.HeadCell>Officer Acting</Table.HeadCell>
            <Table.HeadCell>Supervising Officer</Table.HeadCell>
            <Table.HeadCell>Head of The Department</Table.HeadCell>

            <Table.HeadCell>
              <span className="sr-only">View</span>
            </Table.HeadCell>
          </Table.Head>

          <Table.Body className="divide-y">
            {leaveStatus &&
              leaveStatus.map((status) => (
                <Table.Row
                  key={status[1]}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {status[2]}
                  </Table.Cell>
                  <Table.Cell>{status[3]}</Table.Cell>

                  <Table.Cell>
                    {status[4] === 0 && (
                      <span className="text-orange-400 uppercase flex gap-5 items-center">
                        {" "}
                        <FaHourglass className="text-xl" /> Pending
                      </span>
                    )}
                    {status[4] === 1 && (
                      <span className="text-green-500 uppercase flex gap-5 items-center">
                        {" "}
                        <FaCheck className="text-xl" /> Approved
                      </span>
                    )}
                    {status[4] === 2 && (
                      <span className="text-red-600 uppercase flex gap-5 items-center">
                        {" "}
                        <MdCancel className="text-xl" /> Rejected
                      </span>
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    {status[5] === 0 && (
                      <span className="text-orange-400 uppercase flex gap-5 items-center">
                        {" "}
                        <FaHourglass className="text-xl" /> Pending
                      </span>
                    )}
                    {status[5] === 1 && (
                      <span className="text-green-500 uppercase flex gap-5 items-center">
                        {" "}
                        <FaCheck className="text-xl" /> Approved
                      </span>
                    )}
                    {status[5] === 2 && (
                      <span className="text-red-600 uppercase flex gap-5 items-center">
                        {" "}
                        <MdCancel className="text-xl" /> Rejected
                      </span>
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    {status[6] === 0 && (
                      <span className="text-orange-400 uppercase flex gap-5 items-center">
                        {" "}
                        <FaHourglass className="text-xl" /> Pending
                      </span>
                    )}
                    {status[6] === 1 && (
                      <span className="text-green-500 uppercase flex gap-5 items-center">
                        {" "}
                        <FaCheck className="text-xl" /> Approved
                      </span>
                    )}
                    {status[6] === 2 && (
                      <span className="text-red-600 uppercase flex gap-5 items-center">
                        {" "}
                        <MdCancel className="text-xl" /> Rejected
                      </span>
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    <Button
                      onClick={() => {
                        navigate("/HR/leave/leaveRequest", {
                          state: {
                            applicationId: status[1],
                            employeeNicNo: status[0],
                          },
                        });
                      }}
                    >
                      View
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
      </div>
    </main>
  );
}

export default HRPendingLeaveRequests;
