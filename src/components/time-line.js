"use client";

import { Button, Timeline } from "flowbite-react";
import { HiArrowNarrowRight, HiCalendar } from "react-icons/hi";

function TimeLine() {
  const alerts = [
    {
      id: 1,
      time: "1 February 10:30 AM",
      title: "Leave Application Submitted",
      body: "Your leave application has been successfully submitted.",
    },
    {
      id: 2,
      time: "1 February 12:45 PM",
      title: "Leave Approved",
      body: "Your leave request has been approved. Enjoy your time off!",
    },
    {
      id: 3,
      time: "2 February 3:15 PM",
      title: "Leave Rejected",
      body: "Unfortunately, your leave request has been rejected. Please contact HR for more details.",
    },
    {
      id: 4,
      time: "6 February 9:00 AM",
      title: "Upcoming Leave",
      body: "Reminder: Your upcoming leave is scheduled for tomorrow. Make sure all tasks are completed.",
    },
    {
      id: 5,
      time: "6 February5:30 PM",
      title: "Leave Balance Update",
      body: "Your leave balance has been updated. Check your profile for the latest information.",
    },
  ];
  return (
    <Timeline>
      {alerts.map((alert) => {
        return (
          <Timeline.Item key={alert.id}>
            <Timeline.Point icon={HiCalendar} />
            <Timeline.Content>
              <Timeline.Time>{alert.time}</Timeline.Time>
              <Timeline.Title>
                {alert.title}
              </Timeline.Title>
              <Timeline.Body>
                {alert.body}
              </Timeline.Body>
              <Button color="gray">
                More
                <HiArrowNarrowRight className="ml-2 h-3 w-3" />
              </Button>
            </Timeline.Content>
          </Timeline.Item>
        );
      })}
    </Timeline>
  );
}

export default TimeLine;
