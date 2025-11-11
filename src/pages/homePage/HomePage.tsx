import { useState, useMemo } from "react";
import SideBar from "@/components/sideBar/SideBar";
import { Dropdown } from "@/components/dropDown/DropDown";
import Table from "@/components/table/Table";
import If from "@/components/If";
import CreateNewsModal from "@/components/createNewsModal/CreateNewsModal";
import { usePosts } from "@/hooks/UsePosts";
import IconSearch from "@/assets/search.svg";
import { DropdownType } from "@/types/types";
import IconPlus from "@/assets/plus.svg";
import "./HomePage.scss";

const HomePage = () => {
  const { data = [] } = usePosts();
  const [showModal, setShowModal] = useState(false);

  const [selectedPostType, setSelectedPostType] = useState<string>("All Posts");
  const [selectedStatus, setSelectedStatus] = useState<string>("All Status");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = useMemo(() => {
    if (!data.length) return [];
    return data.filter((item) => {
      const matchesType =
        selectedPostType === "All Posts" ||
        item.contentType.toLowerCase() === selectedPostType.toLowerCase();
      const matchesStatus =
        selectedStatus === "All Status" ||
        item.status.toLowerCase() === selectedStatus.toLowerCase();
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesType && matchesStatus && matchesSearch;
    });
  }, [data, selectedPostType, selectedStatus, searchQuery]);

  return (
    <div className="HomePage">
      <SideBar />

      <div className="TableContainer">
        <div className="HeaderSection">
          <div className="LeftSide">
            <p className="MainText">News & Announcements</p>
            <p className="SubText">
              {filteredData.length}{" "}
              {filteredData.length === 1 ? "Post" : "Posts"}
            </p>
          </div>

          <div className="RightSide">
            <button className="AddButton" onClick={() => setShowModal(true)}>
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
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <If state={filteredData.length > 0}>
          <Table data={filteredData} />
        </If>

        <If state={filteredData.length === 0}>
          <div className="NoResults">
            <p>😕 No posts found for this filter combination.</p>
          </div>
        </If>
      </div>

      <If state={showModal}>
        <CreateNewsModal onClose={() => setShowModal(false)} />
      </If>
    </div>
  );
};

export default HomePage;
