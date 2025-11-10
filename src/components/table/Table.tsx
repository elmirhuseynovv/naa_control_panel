import { useState } from "react";
import { usePosts } from "@/hooks/UsePosts";
import TableElement from "./tableElement/TableElement";
import Pagination from "@/components/pagination/Pagination";
import "./Table.scss";
import Modal from "../modal/Modal";
import If from "../If";
import CreateNewsModal from "@/components/createNewsModal/CreateNewsModal";

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
  const { data, deletePost } = usePosts();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedData = data?.slice(startIdx, startIdx + itemsPerPage) ?? [];
  const [selectedDeleteId, setSelectedDeleteId] = useState<number | null>(null);
  const [selectedUpdateId, setSelectedUpdateId] = useState<number | null>(null);
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
            <TableElement
              key={idx}
              {...item}
              onDelete={(id) => setSelectedDeleteId(id)}
              onUpdate={(id) => setSelectedUpdateId(id)}
            />
          ))}
        </tbody>
      </table>
      <Pagination
        totalItems={data?.length ?? 0}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      <If state={selectedDeleteId !== null}>
        <Modal
          type="delete"
          title="Delete Post"
          message="Are you sure you want to delete this item?"
          onClose={() => setSelectedDeleteId(null)}
          onConfirm={() => {
            if (selectedDeleteId !== null) {
              deletePost.mutate(selectedDeleteId);
              setSelectedDeleteId(null);
            }
          }}
        />
      </If>

      <If state={selectedUpdateId !== null}>
        <CreateNewsModal onClose={() => setSelectedUpdateId(null)} />
      </If>
    </>
  );
};

export default Table;
