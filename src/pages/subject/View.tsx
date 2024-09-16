/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Row from "./components/row";
import { toast } from "react-toastify";
import SubjectService from "@/services/subject";
import { Subject } from "@/utils/responseTypes";
import { createPortal } from "react-dom";
import Details from "./components/details";
import * as XLSX from "xlsx";

const View = () => {
  const [subject, setSubject] = useState<Array<Subject>>([]);
  const [target, setTarget] = useState<Subject | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res = await SubjectService.getAll();
      setSubject(res || []);
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const handleFileUpload = (event: any) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = async (e: any) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });

        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        const columnData = XLSX.utils.sheet_to_json(sheet, {
          header: ["name"],
          range: 1,
        });
        if (!columnData) {
          return toast.warn("Wrong format");
        }

        const [, ...rest] = columnData.map((row: any) => row.name);
        const res: string = await SubjectService.importExcel({
          body: { data: rest },
        });
        toast.success(res);
      };

      reader.readAsBinaryString(file);
    }
    
  };

  return (
    <div>
      {target &&
        createPortal(
          <Details data={target} load={loadData} setTarget={setTarget} />,
          document.body
        )}
      <div className="mt-3 mx-3">
        <button
          className="bg-green-200 w-20 py-2 rounded-md mr-3"
          onClick={() => setTarget({} as Subject)}
        >
          New
        </button>
        <input
          hidden
          id="nameImport"
          type="file"
          onChange={(e) => handleFileUpload(e)}
        />
        <label
          htmlFor="nameImport"
          className="cursor-pointer ml-6 p-3 bg-gray-200 rounded-md"
        >
          Import name
        </label>
      </div>
      <div className="mt-5 h-[calc(100vh-200px)] overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-500">
        <div className="relative">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {subject.map((item) => (
                <Row
                  data={item}
                  onEdit={() => setTarget(item)}
                  setTarget={setTarget}
                  load={loadData}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default View;
