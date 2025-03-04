import { Tabs } from "flowbite-react";
//import { HiAdjustments,HiUserCircle } from "react-icons/hi";
//import { MdDashboard } from "react-icons/md";


function Tab(props) {
  return (
    <Tabs aria-label="Default tabs" >

      {props.para.map(prop => <Tabs.Item title={prop.title} icon={prop.icon}  key={prop.id}>{prop.content}</Tabs.Item>)}
     
   
    </Tabs>
  );
}

export default Tab;
