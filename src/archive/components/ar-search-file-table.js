import { Button, Table } from "flowbite-react";
import { useNavigate } from "react-router-dom";

function ARSearchFileTable(props) {
  const navigate = useNavigate();
  return (
    <div className="overflow-auto">
      <Table striped hoverable>
        <Table.Head>
          <Table.HeadCell>File Number</Table.HeadCell>
          <Table.HeadCell>File Name</Table.HeadCell>
          <Table.HeadCell>Section</Table.HeadCell>
          <Table.HeadCell>Subject</Table.HeadCell>
          <Table.HeadCell>Year</Table.HeadCell>
          <Table.HeadCell>Location</Table.HeadCell>
          <Table.HeadCell>Availability</Table.HeadCell>
        </Table.Head>

        <Table.Body className="divide-y">
          {props.files &&
            props.files.map((file) => (
              <Table.Row
                key={file.id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {file.fileNumber}
                </Table.Cell>
                <Table.Cell>{file.fileName}</Table.Cell>
                <Table.Cell>{file.archiveSection.sectionName}</Table.Cell>
                <Table.Cell>{file.archiveSubject.subjectName}</Table.Cell>
                <Table.Cell>{file.year} </Table.Cell>
                <Table.Cell>
                  {/* <Link  to={"/AR/fileLocation"} state={{fromSearch:{searchedFile}}}> */}
                  <Button
                    onClick={() => {
                      navigate("/AR/fileLocation", { state: file });
                    }}
                  >
                    VIEW
                  </Button>
                  {/* </Link> */}
                </Table.Cell>
                <Table.Cell>
                  {file.checkedOut ? <span className="text-red-600">CHECKED OUT</span> : <span className="text-emerald-700">AVAILABLE</span>}
                </Table.Cell>
                {/*  */}
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
    </div>
  );
}

export default ARSearchFileTable;
