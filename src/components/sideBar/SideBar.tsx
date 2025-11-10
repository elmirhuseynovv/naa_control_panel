import { DropdownType } from "@/types/types";
import { Dropdown } from "@/components/dropDown/DropDown";
import IconLogo from "@/assets/logo.svg";
import IconHome from "@/assets/home.svg";
import IconProfile from "@/assets/profile.png";
import IconSettings from "@/assets/setting.svg";
import IconLibrary from "@/assets/book.svg";
import IconMuseum from "@/assets/museum.svg";
import IconWeather from "@/assets/weather.svg";
import "./SideBar.scss";

const SideBar = () => {
  return (
    <div className="Sidebar">
      <div className="SidebarLogoContainer">
        <img src={IconLogo} alt="" />
        <p className="ControlPanel">NAA Control Panel</p>
      </div>
      <div className="SidebarDropDownsContainer">
        <Dropdown
          type={DropdownType.DEFAULT}
          placeholder="NAA Website"
          leftImage={IconHome}
          options={[
            { label: "Post", value: "post" },
            { label: "Media Library", value: "media-library" },
            { label: "System Settings", value: "system-settings" },
          ]}
        />
        <Dropdown
          type={DropdownType.DEFAULT}
          placeholder="Library"
          leftImage={IconLibrary}
          options={[
            { label: "Post", value: "post" },
            { label: "Media Library", value: "media-library" },
            { label: "System Settings", value: "system-settings" },
          ]}
        />
        <Dropdown
          type={DropdownType.DEFAULT}
          placeholder="Meteorology"
          leftImage={IconWeather}
          options={[
            { label: "Post", value: "post" },
            { label: "Media Library", value: "media-library" },
            { label: "System Settings", value: "system-settings" },
          ]}
        />
        <Dropdown
          type={DropdownType.DEFAULT}
          placeholder="Museum"
          leftImage={IconMuseum}
          options={[
            { label: "Post", value: "post" },
            { label: "Media Library", value: "media-library" },
            { label: "System Settings", value: "system-settings" },
          ]}
        />
      </div>
      <div className="SidebarUserAreaContainer">
        <div className="SettingsBox">
          <img src={IconSettings} alt="" />
          <p>Settings</p>
        </div>
        <div className="UserProfileBox">
          <img src={IconProfile} alt="" />
          <div className="NameAndUserName">
            <p className="Name">Khayal Ahmadli</p>
            <p className="UserName">khahmadli</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
