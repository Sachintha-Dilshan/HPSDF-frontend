import { useEffect, useState } from "react";
import EmployeeService from "../services/add-new-employee-service";

import { FloatingLabel } from "flowbite-react";

function HREmployeePersonalData(props) {
  const [employee, setEmployee] = useState(null);
  const nicNo = props.nicNo;

  useEffect(() => {
    EmployeeService.getEmployeeAllDataByNic(nicNo)
      .then((response) => {
        console.log(response.data);
        setEmployee(response.data);
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          console.log(error.response.data.error);
        }
      });
  }, [nicNo]);

  // const employeeData = Object.values(props.personalData);
  const labels = [
    "ජාතික හැදුනුම්පත් අංකය",
    "මුලකුරු සම‌ඟ නම",
    "සම්පූර්ණ නම",
    "ස්ථිර ලිපිනය",
    "ස්ත්‍රී / පුරුෂ භාවය",
    "සිවිල් තත්වය",
    "උපන් දිනය",
    "ජංගම දුරකථන අංකය",
    "පෞද්ගලික විද්‍යුත් තැපෑල",
    "වර්ථමාන සේවා ස්ථානයේ රාජකාරි භාරගත් දිනය",
    "තනතුර",
    "තනතුර අයත් වන සේවා කාණ්ඩය",
    "තනතුර අයත් වන පන්තිය",
    "තනතුර අයත්වන ශ්‍රේණිය",
    "මුල් පත්වීම් දිනය",
    "මුල් පත්වීම අනුව රාජකාරි භාරගත් දිනය",
    "පත්වීම ස්ථිරද ? නැත්ද ? යන්න",
    "සේවය ස්ථීර කල දිනය",
    "වැටුප් වර්ධක දිනය",
    "වැටුප් කේතය",
    "වැ.අ.වි.වැ අංකය",
    "අංශය",
    "විෂය",
    "අදාල අංශයෙහි වැඩ භාරගත් දිනය",
    "පත්වීමේ ස්වභාවය",
    "නිවාඩු අංකය",
  ];

  const displayEmployeeData = (start, end) => {
    const data = [];
    employee[0][4] === "M"
      ? (employee[0][4] = "පුරුෂ")
      : (employee[0][4] = "ස්ත්‍රී");
    employee[0][5] === "married"
      ? (employee[0][5] = "විවාහක")
      : (employee[0][5] = "අවිවාහක");
    employee[0][16]
      ? (employee[0][16] = "ස්ථීරයි")
      : (employee[0][16] = "ස්ථීර නැත");
    employee[0][19] = employee[0][19] + employee[0][20];
    employee[0].splice(20, 1);
    for (let i = start; i < end; i++) {
      if (employee[0][i] !== null) {
        data.push(
          <FloatingLabel
            key={i} // Assuming each label corresponds to the data at the same index
            variant="filled"
            label={labels[i]}
            value={employee[0][i]}
            disabled={true}
          />
        );
      }
    }

    return data;
  };
  return (
    <fieldset className="border rounded-lg grid lg:grid-cols-3 p-5 gap-5 m-5">
      <legend className="text-slate-600">
        {props.data === "personal"
          ? "පුද්ගලික තොරතුරු"
          : "රැකියාව පිළිබ‌ඳ තොරතුරු"}
      </legend>
      {props.data === "personal" && employee && displayEmployeeData(0, 9)}
      {props.data === "job" && employee && displayEmployeeData(9, 26)}
    </fieldset>
  );
}

export default HREmployeePersonalData;
