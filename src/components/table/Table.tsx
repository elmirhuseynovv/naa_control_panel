import { useState } from "react";
import { usePosts } from "@/hooks/UsePosts";
import TableElement from "@/components/table/tableElement/TableElement";
import Pagination from "@/components/pagination/Pagination";
import Modal from "@/components/modal/Modal";
import If from "@/components/If";
import CreateNewsModal from "@/components/createNewsModal/CreateNewsModal";
import type { TableElementProps } from "@/types/types";
import "./Table.scss";

interface TableProps {
  data?: TableElementProps[];
}

const Table: React.FC<TableProps> = ({ data }) => {
  const headers = [
    "Posts",
    "Type",
    "Sharing time",
    "Status",
    "Publish Status",
    "Author",
    "Actions",
  ];

  const { data: fetchedData, deletePost } = usePosts();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const effectiveData = data && data.length > 0 ? data : fetchedData ?? [];

  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedData = effectiveData.slice(startIdx, startIdx + itemsPerPage);

  const [selectedDeleteId, setSelectedDeleteId] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<TableElementProps | null>(
    null
  );
  const [mode, setMode] = useState<"create" | "edit" | "none">("none");

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
          {paginatedData.length > 0 ? (
            paginatedData.map((item, idx) => (
              <TableElement
                key={idx}
                {...item}
                onDelete={(id) => {
                  setSelectedDeleteId(id);
                  setMode("none");
                }}
                onEdit={(post) => {
                  setSelectedPost(post);
                  setMode("edit");
                }}
              />
            ))
          ) : (
            <tr>
              <td colSpan={headers.length} className="NoData">
                No posts found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <If state={effectiveData.length > itemsPerPage}>
        <Pagination
          totalItems={effectiveData.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </If>

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

      <If state={mode === "edit" && Boolean(selectedPost)}>
        <CreateNewsModal
          mode="edit"
          post={selectedPost!}
          onClose={() => {
            setMode("none");
            setSelectedPost(null);
          }}
        />
      </If>
    </>
  );
};

export default Table;
