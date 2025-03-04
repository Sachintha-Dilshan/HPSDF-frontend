"use client";
import { Button, Table } from "flowbite-react";
import PopUp from "./hr-pop-up";
import HRLeaveStatusTimeLine from "./hr-leave-status-timeline";
import { useEffect, useState} from "react";
import PastRecordService from "../leave/services/leave-type-past-record-service";
import LeaveRegisterService from "../leave/services/leave-register-service";
import LeaveApplicationService from "../leave/services/leave-application-service";

function HRIndividualLeaveRegister(props) {
  const nicNo = props.nicNo;

  const [records, setRecords] = useState([]);
  const [approvedLeaveApplications, setApprovedLeaveApplications] = useState([]);

  const [leaveRegister, setLeaveRegister] = useState("");
  

  useEffect(() => {
    const getPastLeaveRecords = async () => {
      try {
        const response = await PastRecordService.getByNicNo(nicNo);
        setRecords(response.data);
      } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
          console.log(error.response.data.error);
        }
      }
    };


    const getLeaveRegister = async () => {
      try {
        const response = await LeaveRegisterService.getLeaveRegister(nicNo);
        setLeaveRegister(response.data);
      } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
          console.log(error.response.data.error);
        }
      }
    }

    const getApprovedLeaveApplications = async () => {
      try {
        const response = await LeaveApplicationService.getApprovedLeaveApplications(nicNo);
        setApprovedLeaveApplications(response.data);
      } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
          console.log(error.response.data.error);
        }
      }
    }

    getPastLeaveRecords();
    getLeaveRegister();
    getApprovedLeaveApplications();

  }, [nicNo]);

  
  return (
    <div className="overflow-auto flex flex-col gap-10">
      <Table striped hoverable className="text-center">
        <Table.Head>
          <Table.HeadCell>Year</Table.HeadCell>
          <Table.HeadCell>Casual Leave</Table.HeadCell>
          <Table.HeadCell>Vacation Leave</Table.HeadCell>
          <Table.HeadCell>Expired Vaccation Leave</Table.HeadCell>
          <Table.HeadCell>Commuted Half Pay</Table.HeadCell>
          <Table.HeadCell>Half Pay</Table.HeadCell>
          <Table.HeadCell>No Pay</Table.HeadCell>
          <Table.HeadCell>Duty Leave</Table.HeadCell>
        </Table.Head>

        <Table.Body className="divide-y">
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 ">
            <Table.Cell>{new Date().getFullYear()}</Table.Cell>
            <Table.Cell>
              <Button pill className="inline-block">
                <span className="flex justify-center flex-grow">{leaveRegister.casualLeave}</span>
              </Button>
            </Table.Cell>
            <Table.Cell>
              <Button pill className="inline-block">
                <span className="flex justify-center flex-grow">{leaveRegister.vacationLeave}</span>
              </Button>
            </Table.Cell>
            <Table.Cell>
              <Button pill className="inline-block">
                <span className="flex justify-center flex-grow">{leaveRegister.expiredVacationLeave}</span>
              </Button>
            </Table.Cell>
            <Table.Cell>
              <Button pill className="inline-block">
                <span className="flex justify-center flex-grow">{leaveRegister.commutedHalfPayLeave}</span>
              </Button>
            </Table.Cell>
            <Table.Cell>
              <Button pill className="inline-block">
                <span className="flex justify-center flex-grow">{leaveRegister.halfPayLeave}</span>
              </Button>
            </Table.Cell>
            <Table.Cell>
              <Button pill className="inline-block">
                <span className="flex justify-center flex-grow">{leaveRegister.noPayLeave}</span>
              </Button>
            </Table.Cell>
            <Table.Cell>
              <Button pill className="inline-block">
                <span className="flex justify-center flex-grow">{leaveRegister.dutyLeave}</span>
              </Button>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>

      <Table striped hoverable className="text-center">
        <Table.Head>
          <Table.HeadCell>Year</Table.HeadCell>
          <Table.HeadCell>Casual Leave</Table.HeadCell>
          <Table.HeadCell>Vacation Leave</Table.HeadCell>
        </Table.Head>

        <Table.Body className="divide-y">
          {records &&
            records.map((record) => {
              return (
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 " key={record[0]}>
                  <Table.Cell>{record[0]}</Table.Cell>
                  <Table.Cell>
                    <Button pill className="inline-block">
                      <span className="flex justify-center flex-grow">
                        {record[1]}
                      </span>
                    </Button>
                  </Table.Cell>
                  <Table.Cell>
                    <Button pill className="inline-block">
                      <span className="flex justify-center flex-grow">
                        {record[2]}
                      </span>
                    </Button>
                  </Table.Cell>
                </Table.Row>
              );
            })}
        </Table.Body>
      </Table>

      <Table striped hoverable className="text-center shadow-lg">
        <Table.Head>
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
          {approvedLeaveApplications && approvedLeaveApplications.map((application) => (
            <Table.Row
              key={application[0]}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell>{application[1]}</Table.Cell>
              <Table.Cell>{application[2]}</Table.Cell>
              <Table.Cell>{application[3]}</Table.Cell>
              <Table.Cell>{application[4]}</Table.Cell>
              <Table.Cell>{application[5]}</Table.Cell>
              <Table.Cell>
                <PopUp content={<HRLeaveStatusTimeLine applicationId={application[0]} />} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

export default HRIndividualLeaveRegister;
