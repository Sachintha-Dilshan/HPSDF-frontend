import { useEffect, useState } from "react";
import HRCollapseBar from "../components/hr-collapse-bar";
import HRLeaveStatusTimeLine from "../components/hr-leave-status-timeline";
import LeaveApplicationService from "../leave/services/leave-application-service";
import LeaveCollapseBar from "../leave/components/hr-leave-collapse-bar";
import userRoles from "../../data/user-roles";
import { Table } from "flowbite-react";
import PopUp from "../components/hr-pop-up";

function HROnLeaveToday() {
  const [leaveApplications, setLeaveApplications] = useState([]);
  const currentUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).roles
    : null;
  const roles = userRoles;

  const getOnLeaveTodayApplications = async () => {
    try {
      const response =
        await LeaveApplicationService.getOnLeaveTodayApplications();
      setLeaveApplications(response.data);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        console.log(error.response.data.error);
      }
    }
  };

  useEffect(() => {
    getOnLeaveTodayApplications();
  }, []);

  return (
    <main>
      {/* Collapse bar starts here */}
      {currentUser.some((role) =>
        [roles.hrAdmin, roles.chairman, roles.secretary].includes(role)
      ) && <HRCollapseBar />}
      {currentUser.includes(roles.leaveAdmin) && <LeaveCollapseBar />}
      {/* Collapse bae ends here */}

      <div className="flex flex-col gap-2 m-5">
        <h3 className="text-center text-lg text-slate-500 font-semibold border-b-2 border-b-slate-200 uppercase mx-5">
          Employees on leave today
        </h3>

        <div className="overflow-auto">
          <Table striped hoverable className="text-center shadow-lg">
            <Table.Head>
              <Table.HeadCell>Employee Name</Table.HeadCell>
              <Table.HeadCell>From</Table.HeadCell>
              <Table.HeadCell>To</Table.HeadCell>
              <Table.HeadCell>Leave Period</Table.HeadCell>
              <Table.HeadCell>Leave Type</Table.HeadCell>
              <Table.HeadCell>Reason</Table.HeadCell>

              <Table.HeadCell>
                <span className="sr-only">View</span>
              </Table.HeadCell>
            </Table.Head>

            <Table.Body className="divide-y">
              {leaveApplications &&
                leaveApplications.map((application) => (
                  <Table.Row
                    key={application[0]}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell>{application[1]}</Table.Cell>
                    <Table.Cell>{application[2]}</Table.Cell>
                    <Table.Cell>{application[3]}</Table.Cell>
                    <Table.Cell>{application[4]}</Table.Cell>
                    <Table.Cell>{application[5]}</Table.Cell>
                    <Table.Cell>{application[6]}</Table.Cell>
                    <Table.Cell>
                      <PopUp
                        content={
                          <HRLeaveStatusTimeLine
                            applicationId={application[0]}
                          />
                        }
                      />
                    </Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
        </div>
      </div>
    </main>
  );
}

export default HROnLeaveToday;
