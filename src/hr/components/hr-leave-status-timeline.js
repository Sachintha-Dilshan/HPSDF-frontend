"use client";

import { useEffect, useState } from "react";
import { Button, Timeline } from "flowbite-react";
import { HiArrowNarrowRight, HiCalendar } from "react-icons/hi";
import FormattedDate from "./hr-date-converter";
import LeaveTrackingService from "../leave/services/leave-tracker-service";

function HRLeaveStatusTimeLine(props) {
  const applicationId = props.applicationId;

  const [leaveRequest, setLeaveRequest] = useState([]);

  const getLeaveRequest = async (applicationId) => {
    try {
      const response = await LeaveTrackingService.getLeaveTrackingData(
        applicationId
      );
      setLeaveRequest(response.data[0]);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        console.log(error.response.data.error);
      }
    }
  };

  useEffect(() => {
    getLeaveRequest(applicationId);
  }, [applicationId]);

  const leaveStatus = [
    {
      id: 1,
      time: <FormattedDate dateString={leaveRequest[1]} />,
      title: "අයදුම් කරු",
      body: leaveRequest[0],
      state: "අයදුම් කරන ලදී"
    },
    {
      id: 2,
      time: <FormattedDate dateString={leaveRequest[4]} />,
      title: "වැඩ බලන නිලධාරි",
      body: leaveRequest[2],
      state: leaveRequest[3] === 0 ? "සැකසෙමින් පවතී" : (leaveRequest[3] === 1 ? "අනුමත කරන ලදී" : "ප්‍රතික්ෂේප කරන ලදී")
    },
    {
      id: 3,
      time: <FormattedDate dateString={leaveRequest[7]} />,
      title: "අධීක්ෂණ නිලධාරි",
      body: leaveRequest[5],
      state: leaveRequest[6] === 0 ? "සැකසෙමින් පවතී" : (leaveRequest[6] === 1 ? "අනුමත කරන ලදී" : "ප්‍රතික්ෂේප කරන ලදී")

    },
    {
      id: 4,
      time: <FormattedDate dateString={leaveRequest[10]} />,
      title: "දෙපාර්තමේන්තු ප්‍රධානි",
      body: leaveRequest[8],
      state: leaveRequest[9] === 0 ? "සැකසෙමින් පවතී" : (leaveRequest[9] === 1 ? "අනුමත කරන ලදී" : "ප්‍රතික්ෂේප කරන ලදී")
    }
  ];
  return (
    <Timeline horizontal>
      {leaveStatus && leaveStatus.map((status) => {
        return (
          <Timeline.Item key={status.id}>
            <Timeline.Point icon={HiCalendar} className="m-5"/>
            <Timeline.Content>
              <Timeline.Time >{status.time}</Timeline.Time>
              <Timeline.Title className="font-medium">{status.title}</Timeline.Title>
              <Timeline.Body>{status.body}</Timeline.Body> 
              <Timeline.Body>{props.title}</Timeline.Body>
              <Button color="gray" className={status.state === "සැකසෙමින් පවතී" ? "bg-orange-400" : (status.state === "ප්‍රතික්ෂේප කරන ලදී" ? "bg-red-500" : "bg-green-400")}>
              {status.state}
                <HiArrowNarrowRight className="ml-2 h-3 w-3" />
              </Button>
            </Timeline.Content>
          </Timeline.Item>
        );
      })}
    </Timeline>
  );
}

export default HRLeaveStatusTimeLine;
