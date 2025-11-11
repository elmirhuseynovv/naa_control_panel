import { useState, useMemo } from "react";
import IconPlus from "@/assets/plus.svg";
import IconSearch from "@/assets/search.svg";
import SideBar from "@/components/sideBar/SideBar";
import { Dropdown } from "@/components/dropDown/DropDown";
import Table from "@/components/table/Table";
import If from "@/components/If";
import CreateNewsModal from "@/components/createNewsModal/CreateNewsModal";
import Modal from "@/components/modal/Modal";
import { usePosts } from "@/hooks/UsePosts";
import { DropdownType } from "@/types/types";
import "./HomePage.scss";

const HomePage = () => {
  const { data } = usePosts();

  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [selectedPost, setSelectedPost] = useState<any>(null);

  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [selectedPostType, setSelectedPostType] = useState("All Posts");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSuccess = (mode: "create" | "edit") => {
    setShowModal(false);
    setTimeout(() => {
      setModalMode(mode);
      setShowSuccess(true);
    }, 50);
  };

  const filteredData = useMemo(() => {
    if (!data) return [];

    const normalizedStatus = selectedStatus.trim().toLowerCase();
    const normalizedType = selectedPostType.trim().toLowerCase();
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return data.filter((post) => {
      const postStatus = post.status?.trim().toLowerCase() || "";
      const postType = post.contentType?.trim().toLowerCase() || "";
      const postTitle = post.title?.toLowerCase() || "";
      const postDescription = post.description?.toLowerCase() || "";

      const matchesStatus =
        normalizedStatus === "all status"
          ? true
          : postStatus === normalizedStatus;

      const matchesType =
        normalizedType === "all posts" ? true : postType === normalizedType;

      const matchesSearch =
        !normalizedSearch ||
        postTitle.includes(normalizedSearch) ||
        postDescription.includes(normalizedSearch);

      return matchesStatus && matchesType && matchesSearch;
    });
  }, [data, selectedStatus, selectedPostType, searchTerm]);

  return (
    <div className="HomePage">
      <SideBar />

      <div className="TableContainer">
        <div className="HeaderSection">
          <div className="LeftSide">
            <p className="MainText">News & Announcements</p>
            <p className="SubText">{`${filteredData.length} Posts`}</p>
          </div>

          <div className="RightSide">
            <button
              className="AddButton"
              onClick={() => {
                setModalMode("create");
                setSelectedPost(null);
                setShowModal(true);
              }}
            >
              <div className="IconBox">
                <img src={IconPlus} alt="Add" className="AddIcon" />
              </div>
              <span>Add News or Announcement</span>
            </button>
          </div>
        </div>

        <div className="FilterBar">
          <Dropdown
            type={DropdownType.POSTS}
            className="FilterBarDropDown"
            onSelect={(value) => setSelectedPostType(value)}
          />
          <Dropdown
            type={DropdownType.STATUS}
            className="FilterBarDropDown"
            onSelect={(value) => setSelectedStatus(value)}
          />

          <div className="SearchBar">
            <img src={IconSearch} alt="Search" className="SearchIcon" />
            <input
              type="text"
              placeholder="Search by title or description"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <If state={filteredData.length > 0}>
          <Table
            data={filteredData}
            onEdit={(post) => {
              setModalMode("edit");
              setSelectedPost(post);
              setShowModal(true);
            }}
          />
        </If>

        <If state={filteredData.length === 0}>
          <div className="NoDataContainer">
            <p className="NoDataText">No posts match your filters</p>
          </div>
        </If>
      </div>

      <If state={showModal}>
        <CreateNewsModal
          mode={modalMode}
          post={selectedPost}
          onClose={() => setShowModal(false)}
          onSuccess={() => handleSuccess(modalMode)}
        />
      </If>

      <If state={showSuccess}>
        <Modal
          type="success"
          title="Success!"
          message={
            modalMode === "edit"
              ? "Post has been successfully updated!"
              : "New post created successfully!"
          }
          onClose={() => setShowSuccess(false)}
        />
      </If>
    </div>
  );
};

export default HomePage;
