"use client";

import { Table } from "flowbite-react";
import { useEffect, useState} from "react";
import LeaveRegisterService from "../leave/services/leave-register-service";

function HRLeaveRegister() {
  const [leaveRegisters, setLeaveRegisters] = useState("");

  useEffect(() => {
    const getAllLeaveRegister = async () => {
      try {
        const response = await LeaveRegisterService.getAllLeaveRegisters();
        setLeaveRegisters(response.data);
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

    getAllLeaveRegister();
  }, []);

  return (
    <div className="overflow-auto">
      <Table striped hoverable className="text-center">
        <Table.Head>
          <Table.HeadCell>Leave ID</Table.HeadCell>
          <Table.HeadCell>Employee Name</Table.HeadCell>
          <Table.HeadCell>Casual Leave</Table.HeadCell>
          <Table.HeadCell>Vaccation Leave</Table.HeadCell>
          <Table.HeadCell>Expired Vaccation Leave</Table.HeadCell>
          <Table.HeadCell>Commuted Half Pay</Table.HeadCell>
          <Table.HeadCell>Half Pay</Table.HeadCell>
          <Table.HeadCell>No Pay</Table.HeadCell>
          <Table.HeadCell>Duty Leave</Table.HeadCell>
          <Table.HeadCell>Total</Table.HeadCell>
        </Table.Head>

        <Table.Body className="divide-y">
          {leaveRegisters && leaveRegisters.map((register) => (
            <Table.Row
              key={register[0]}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell >{register[0]}</Table.Cell>
              <Table.Cell>{register[1]}</Table.Cell>
              <Table.Cell>{register[2]}</Table.Cell>
              <Table.Cell>{register[3]}</Table.Cell>
              <Table.Cell>{register[4]}</Table.Cell>
              <Table.Cell>{register[5]}</Table.Cell>
              <Table.Cell>{register[6]}</Table.Cell>
              <Table.Cell>{register[7]}</Table.Cell>
              <Table.Cell>{register[8]}</Table.Cell>
              <Table.Cell className="bg-blue-200">{register[2] + register[3] + register[4] + register[5] + register[6] + register[7] + register[8]}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

export default HRLeaveRegister;
