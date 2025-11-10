import SideBar from "@/components/sideBar/SideBar";
import IconPlus from "@/assets/plus.svg";
import IconSearch from "@/assets/search.svg";
import "./HomePage.scss";
import { Dropdown } from "@/components/dropDown/DropDown";
import { DropdownType } from "@/types/types";
import Table from "@/components/table/Table";
const HomePage = () => {
  const handleClick = () => {
    console.log("Button clicked");
  };
  return (
    <div className="HomePage">
      <SideBar />
      <div className="TableContainer">
        <div className="HeaderSection">
          <div className="LeftSide">
            <p className="MainText">News & Announcements</p>
            <p className="SubText">210 posts</p>
          </div>

          <div className="RightSide">
            <button className="AddButton" onClick={handleClick}>
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
    </div>
  );
};

export default HomePage;
