import { useEffect, useState } from "react";
import { Avatar } from "flowbite-react";
import EmployeeService from "../services/add-new-employee-service";
 

function HREmployeeCard(props) {

  const [imageUrl, setImageUrl] = useState("");


  useEffect(() => {
    EmployeeService.getImage(props.nicNo)
    .then((response) => {
      const imageUrl = URL.createObjectURL(response.data);
      setImageUrl(imageUrl)
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
  }, [props.nicNo]);

  return (

      <div className="flex flex-col items-center justify-between p-5 m-5 rounded-2xl shadow-lg transform hover:scale-105 transition ease-out duration-500 cursor-pointer" > 
       
          <Avatar
            img={process.env.PUBLIC_URL + imageUrl}
            alt="Profile Image"
            size="lg"
            rounded
            // bordered
            // color="gray"
            className="mb-2"
          />
        <div className="flex flex-col justify-center items-center">
          <p className="font-bold text-slate-600 text-center">{props.name}</p>
          <p className="font-semibold text-slate-500 text-sm text-center my-2">
            {props.designation}
          </p>
          <div>
            <i className="fas fa-phone text-slate-500">
              <span className="px-2 text-slate-500">{props.contact}</span>
            </i>
          </div>
        </div>
      </div>
   
  );
}

export default HREmployeeCard;
