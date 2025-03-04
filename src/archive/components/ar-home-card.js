import { useEffect, useState } from 'react'
import { IoIosPeople  } from "react-icons/io";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { BsGraphUpArrow } from "react-icons/bs";
import { GrUserSettings } from "react-icons/gr";
import { FaHandsHolding } from "react-icons/fa6";
import { BsFillCartCheckFill } from "react-icons/bs";
import fileService from '../services/add-file-service';

function ARhomecard(props) {
    const [count, setCount] = useState(0);

    

    useEffect(() => {
        const getFileCountBySection = async () => {
            const response = await fileService.getFileCountBySection(props.section);
            setCount(response.data);
        }
        props.section && getFileCountBySection();
    },[props.section]);

    const iconComponents = {
        IoIosPeople: IoIosPeople,
        LiaFileInvoiceDollarSolid: LiaFileInvoiceDollarSolid,
        BsGraphUpArrow: BsGraphUpArrow,
        GrUserSettings: GrUserSettings,
        FaHandsHolding: FaHandsHolding,
        BsFillCartCheckFill : BsFillCartCheckFill
        // Add more icons as needed
      };
      const SelectedIcon = iconComponents[props.icon];
    return (
        //<Link to={props.url}>
            <div className="display flex shadow-lg items-center rounded-xl transform hover:scale-105 transition ease-out duration-200 cursor-pointer border-2 ml-5 mr-5 h-48"  style={{ overflow: 'hidden' }}>
                <div>
                    <div className= "w-12 h-80 top-0 left-0 absolute" style={{backgroundColor : props.color}} >
                    </div>
                </div>
                <div className="flex-grow mt-12 mb-12">
                    <h5 className="text-lg font-bold tracking-tight text-slate-500 uppercase text-center mx-12 mt-8 pl-4">
                        {props.title}
                    </h5>
                    <h3 className="font-bold text-red-700 dark:text-gray-400 text-4xl text-center m-4">
                        {props.count ? props.count : count}
                    </h3>
                    <h2 className="text-lg font-bold tracking-tight  text-slate-500 uppercase text-center m-4">
                    Total Files
                    </h2>
                </div>
                <div className="flex-l w-100 h-100">
                    {/* {props.icon} */}
                    {/* <{props.icon} style={{ fontSize:'100px', margin:'10px' }} /> */}
                    {SelectedIcon && <SelectedIcon style={{ fontSize: '100px', margin: '10px' }} />}
                </div>
            </div>
        //</Link>
    )
}

export default ARhomecard
