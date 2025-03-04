import { FloatingLabel } from "flowbite-react";

function HREmployeeLeaveChit(props) {
  const leaveData = props.data;
  const labels = [
    "නිවාඩු වර්ගය",
    "නිවාඩු ඉල්ලා සිටින දින ගණන",
    "නිවාඩු පටන් ගන්නා දිනය",
    "නැවත සේවයට පැමිණෙන දිනය",
    "වැඩ බලන නිලධාරි",
    "නිවාඩු ඉල්ලීමට හේතුව"
  ];
  return(
    <fieldset className="border rounded-lg grid lg:grid-cols-3 p-5 gap-5 m-5">
    <legend className="text-slate-600">නිවාඩු අයදුම්පත</legend>
    {labels.map((data, index) => (
      <FloatingLabel
        key={data} // Assuming each label corresponds to the data at the same index
        variant="filled"
        label={data}
        value={leaveData[index]}
        disabled={true}
      />
    ))}
  </fieldset>
  );
}

export default HREmployeeLeaveChit;
