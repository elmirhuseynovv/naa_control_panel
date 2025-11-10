import React, { useState } from "react";
import type { DropdownProps } from "@/types/types";
import clsx from "clsx";
import IconArrow from "@/assets/IconArrow.svg?react";
import If from "@/components/If";
import "./DropDown.scss";

export const Dropdown: React.FC<DropdownProps> = ({
  type = "DEFAULT",
  options = [],
  leftImage,
  className,
  placeholder,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string>("");

  const getDefaultPlaceholder = () => {
    switch (type) {
      case "STATUS":
        return "All Status";
      case "PUBLISH":
        return "Publish";
      case "POSTS":
        return "All Posts";
      default:
        return placeholder;
    }
  };

  const displayPlaceholder = placeholder || getDefaultPlaceholder();

  const handleSelect = (option: string) => {
    setSelected(option);
    if (type !== "DEFAULT") {
      setIsOpen(false);
    }
  };

  return (
    <div className={clsx(className, "DropDown")}>
      <div
        className={clsx("DropdownSelectedItem", {
          DropDownDefault: type === "DEFAULT",
          DropDownDefaultActive: type === "DEFAULT" && isOpen,
        })}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="DropDownOption">
          <If state={Boolean(leftImage)}>
            <img
              src={leftImage}
              className={clsx({ leftImageActive: isOpen })}
            />
          </If>

          <div className="DropDownOption">
            <If
              state={
                selected === "Active" ||
                selected === "Inactive" ||
                selected === "Publish" ||
                selected === "Draft"
              }
            >
              <div
                className={clsx("DropDownDot", {
                  ActiveDot: selected === "Active",
                  InactiveDot: selected === "Inactive",
                  PublishDot: selected === "Publish",
                  DraftDot: selected === "Draft",
                })}
              ></div>
            </If>
            <If state={type === "DEFAULT"}>
              <p>{displayPlaceholder}</p>
            </If>
            <If state={type !== "DEFAULT"}>
              <p>{selected || displayPlaceholder}</p>
            </If>
          </div>
        </div>

        <IconArrow
          className={clsx("DropDownArrow", {
            DropdownArrowReverse: isOpen,
            DwfaultDropdownArrowReverse: type === "DEFAULT" && isOpen,
          })}
        />
      </div>

      <If state={isOpen}>
        <If state={type === "STATUS"}>
          <div className="DropDownOptions">
            <div
              className="DropDownOption"
              onClick={() => handleSelect("All Status")}
            >
              <p>All Status</p>
            </div>
            <div
              className="DropDownOption"
              onClick={() => handleSelect("Active")}
            >
              <div className="DropDownDot ActiveDot"></div>
              <p>Active</p>
            </div>
            <div
              className="DropDownOption"
              onClick={() => handleSelect("Inactive")}
            >
              <div className="DropDownDot InactiveDot"></div>
              <p>Inactive</p>
            </div>
          </div>
        </If>

        <If state={type === "PUBLISH"}>
          <div className="DropDownOptions">
            <div
              className="DropDownOption"
              onClick={() => handleSelect("Publish")}
            >
              <div className="DropDownDot PublishDot"></div>
              <p className="DropDownPublish">Publish</p>
            </div>
            <div
              className="DropDownOption"
              onClick={() => handleSelect("Draft")}
            >
              <div className="DropDownDot DraftDot"></div>
              <p className="DropDownDraft">Draft</p>
            </div>
          </div>
        </If>

        <If state={type === "POSTS"}>
          <div className="DropDownOptions">
            <div
              className="DropDownOption"
              onClick={() => handleSelect("All Posts")}
            >
              <p>All Posts</p>
            </div>
            <div
              className="DropDownOption"
              onClick={() => handleSelect("News")}
            >
              <p>News</p>
            </div>
            <div
              className="DropDownOption"
              onClick={() => handleSelect("Announcements")}
            >
              <p>Announcements</p>
            </div>
          </div>
        </If>

        <If state={type === "DEFAULT"}>
          <div className="DropDownOptions DropDownDefault">
            {options.map((opt) => (
              <div
                key={opt.value}
                className={clsx("DropDownOption", {
                  "DropDownOption--active": selected === opt.label,
                })}
                onClick={() => handleSelect(opt.label)}
              >
                <p>{opt.label}</p>
              </div>
            ))}
          </div>
        </If>
      </If>
    </div>
  );
};
