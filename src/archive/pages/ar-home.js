import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import sectionService from "../services/add-section-service";
import ARhomecard from "../components/ar-home-card";
import CollapseBar from "../components/ar-file-collapse-bar";
import archiveTransactionService from "../services/archive-transaction-service";
import userRoles from "../../data/user-roles";

function ARHome() {
  const navigate = useNavigate();
  const currentUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).roles : null;
  const roles = userRoles;

  const [sections, setSections] = useState([]);
  const [checkedOutFiles, setCheckedOutFiles] = useState([]);

  useEffect(() => {
    const getCheckedOutFiles = async () => {
      try {
        const response = await archiveTransactionService.getCheckedOutFiles();
        setCheckedOutFiles(response.data);
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
    getCheckedOutFiles();
  }, []);

  const getSections = async () => {
    try {
      const response = await sectionService.getAllSections();
      setSections(response.data);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        console.log(error.response.data.error);
      }
    }
  };

  useEffect(() => {
    getSections();
  }, []);

  return (
    <main >
      <CollapseBar />
      <div className="flex flex-col gap-2 m-5">
        <h3 className="text-center text-lg text-slate-500 font-semibold border-b-2 border-b-slate-200 uppercase">
          Archive Dashboard
        </h3>

        {/* Dashboard cards starts here */}
        <div className="grid  xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 gap-8  mt-8 mx-20">
          {sections.map((section) => (
              <ARhomecard
                key={section.id}
                title={section.sectionName}
                icon={section.sectionIcon}
                color={section.sectionColor}
                section={section}
              />
          ))}
          <div
            onClick={() =>
              navigate("/AR/checkedOutFiles", { state: checkedOutFiles })
            }
          >
            {currentUser.includes(roles.archivist) && <ARhomecard
              title={"Checked Out Files"}
              count={checkedOutFiles.length}
              icon="BsFillCartCheckFill"
            />}
          </div>
        </div>
      </div>
    </main>
  );
}

export default ARHome;
