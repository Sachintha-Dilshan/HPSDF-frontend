import HRCollapseBar from "../components/hr-collapse-bar";
import Tab from "../../components/tabs";
import HREmployeePersonalData from "../components/hr-employee-personal-data";
import HRIndividualLeaveRegister from "../components/hr-employee-individual-leave-register";
import HREmployeeAttendantSheet from "../components/hr-employee-individual-attendance-sheet";
import HREmployeeCard from "../components/hr-employee-card";
import { useLocation } from "react-router-dom";
//import { FloatingLabel } from "flowbite-react";
//import { Button } from "flowbite-react";
import { HiUserCircle } from "react-icons/hi";
import {
  FaBriefcase,
  FaCalendarCheck,
  FaUmbrellaBeach,
  FaFile,
} from "react-icons/fa";

function HREmployeeProfile() {
  const location = useLocation();
  const employee = location.state;


  const data = [
    {
      id: 1,
      active: true,
      title: "Personal Data",
      icon: HiUserCircle,
      content: <HREmployeePersonalData nicNo={employee[0]} data={"personal"} />
    },
    {
      id: 2,
      active: true,
      title: "Job Data",
      icon: FaBriefcase,
      content: <HREmployeePersonalData nicNo={employee[0]} data={"job"} />
    },
    {
      id: 3,
      active: true,
      title: "Personal File",
      icon: FaFile,
      //content: <HREmployeeAttendantSheet />,
    },
    {
      id: 4,
      active: true,
      title: "Attendance Data",
      icon: FaCalendarCheck,
      content: <HREmployeeAttendantSheet />,
    },
    {
      id: 5,
      active: true,
      title: "Leave Data",
      icon: FaUmbrellaBeach,
      content: <HRIndividualLeaveRegister nicNo = {employee[0]}/>,
    },
  ];
  return (
    <main>
      <HRCollapseBar />
      <div className="flex flex-col gap-2 m-5">
        <h3 className="text-center text-lg text-slate-500 font-semibold border-b-2 border-b-slate-200 uppercase mx-5">
          Employee Profile
        </h3>
        <div className="grid md:grid-cols-3  gap-10 items-center">
          <div>
            <HREmployeeCard
              nicNo={employee[0]}
              name={employee[1]}
              designation={employee[3]}
              contact={employee[2]}
            />
          </div>
          {/* <div>
            <fieldset className="border rounded-lg p-5 flex gap-20">
              <legend>Edit</legend>
              <Button color="success" pill className="uppercase">
                Edit Profile
              </Button>
              <Button color="failure" pill className="uppercase">
                Reset Password
              </Button>
            </fieldset>
          </div> */}
          {/* <div>
            <fieldset className="border rounded-lg p-5 flex gap-20 ">
              <legend>Change User Credentials</legend>
              <FloatingLabel
                variant="filled"
                label={"Username"}
                value={"Chani/hak/123"}
                disabled={true}
              />
              <Button color="failure" pill className="uppercase h-11">
                Reset Password
              </Button>
            </fieldset>
          </div> */}
        </div>

        <div className="grid grid-cols-1">
          <Tab para={data} />
        </div>
      </div>
    </main>
  );
}

export default HREmployeeProfile;
