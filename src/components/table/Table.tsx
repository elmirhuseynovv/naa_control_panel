import { useState } from "react";
import { usePosts } from "@/hooks/UsePosts";
import TableElement from "./tableElement/TableElement";
import Pagination from "@/components/pagination/Pagination";
import "./Table.scss";

const Table = () => {
  const headers = [
    "Posts",
    "Type",
    "Sharing time",
    "Status",
    "Publish Status",
    "Author",
    "Actions",
  ];
  const { data } = usePosts();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedData = data?.slice(startIdx, startIdx + itemsPerPage) ?? [];
  return (
    <>
      <table className="Table">
        <thead>
          <tr>
            {headers.map((header, idx) => (
              <th key={idx}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData?.map((item, idx) => (
            <TableElement key={idx} {...item} />
          ))}
        </tbody>
      </table>
      <Pagination
        totalItems={data?.length ?? 0}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </>
  );
};

export default Table;
