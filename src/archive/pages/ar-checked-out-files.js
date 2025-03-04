import ARFileCollapseBar from "../components/ar-file-collapse-bar";
import { Table } from "flowbite-react";
import { useLocation } from "react-router-dom";
import FormattedDate from "../../hr/components/hr-date-converter";


function ARCheckedOutFiles() {
  const location = useLocation();
  const files = location.state;
  return (
    <main>
      <ARFileCollapseBar />
      <div className="flex flex-col gap-2 m-5">
        <h3 className="text-center text-lg text-slate-500 font-semibold border-b-2 border-b-slate-200 uppercase mx-5">
          Checked Out Files
        </h3>

        <div className="overflow-auto">
          <Table striped hoverable className="text-center shadow-lg">
            <Table.Head>
              <Table.HeadCell>File Number</Table.HeadCell>
              <Table.HeadCell>File Name</Table.HeadCell>
              <Table.HeadCell>Year</Table.HeadCell>
              <Table.HeadCell>Employee Name</Table.HeadCell>
              <Table.HeadCell>Checked Out Time</Table.HeadCell>

              <Table.HeadCell>
                <span className="sr-only">View</span>
              </Table.HeadCell>
            </Table.Head>

            <Table.Body className="divide-y">
              {files &&
                files.map((file) => (
                  <Table.Row
                    key={file.id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell>{file.archiveFile.fileNumber}</Table.Cell>
                    <Table.Cell>{file.archiveFile.fileName}</Table.Cell>
                    <Table.Cell>{file.archiveFile.year}</Table.Cell>
                    <Table.Cell>{file.employee.nameWithInitials}</Table.Cell>
                    <Table.Cell>{
                    <FormattedDate
                      dateString={file.checkedOutTimeStamp}
                    ></FormattedDate>
                  }</Table.Cell>
                    <Table.Cell>
                      
                    </Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
        </div>
      </div>
    </main>
  );
}

export default ARCheckedOutFiles;
