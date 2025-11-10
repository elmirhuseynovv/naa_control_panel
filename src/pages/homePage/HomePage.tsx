import { useState } from "react";
import IconPlus from "@/assets/plus.svg";
import IconSearch from "@/assets/search.svg";
import SideBar from "@/components/sideBar/SideBar";
import { Dropdown } from "@/components/dropDown/DropDown";
import Table from "@/components/table/Table";
import If from "@/components/If";
import CreateNewsModal from "@/components/createNewsModal/CreateNewsModal";
import { usePosts } from "@/hooks/UsePosts";
import { DropdownType } from "@/types/types";
import "./HomePage.scss";

const HomePage = () => {
  const { data } = usePosts();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="HomePage">
      <SideBar />
      <div className="TableContainer">
        <div className="HeaderSection">
          <div className="LeftSide">
            <p className="MainText">News & Announcements</p>
            <p className="SubText">
              <If state={Boolean(data)}>{data?.length} Posts</If>
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
          <Dropdown type={DropdownType.POSTS} className="FilterBarDropDown" />
          <Dropdown type={DropdownType.STATUS} className="FilterBarDropDown" />

          <div className="SearchBar">
            <img src={IconSearch} alt="Search" className="SearchIcon" />
            <input type="text" placeholder="Search" />
          </div>
        </div>

        <Table />
      </div>

      <If state={showModal}>
        <CreateNewsModal onClose={() => setShowModal(false)} />
      </If>
    </div>
  );
};

export default HomePage;
