import React, { useState } from "react";
import clsx from "clsx";
import If from "@/components/If";

import type { DropdownProps } from "@/types/types";

import IconArrow from "@/assets/IconArrow.svg?react";
import "./DropDown.scss";

export const Dropdown: React.FC<DropdownProps> = ({
  type = "DEFAULT",
  options = [],
  leftImage,
  className,
  placeholder,
  onSelect,
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
    onSelect?.(option);
    if (type !== "DEFAULT") setIsOpen(false);
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

            <p>{selected || displayPlaceholder}</p>
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
            {["All Status", "Active", "Inactive"].map((status) => (
              <div
                key={status}
                className="DropDownOption"
                onClick={() => handleSelect(status)}
              >
                {status !== "All Status" && (
                  <div
                    className={clsx("DropDownDot", {
                      ActiveDot: status === "Active",
                      InactiveDot: status === "Inactive",
                    })}
                  ></div>
                )}
                <p>{status}</p>
              </div>
            ))}
          </div>
        </If>

        <If state={type === "PUBLISH"}>
          <div className="DropDownOptions">
            {["Publish", "Draft"].map((status) => (
              <div
                key={status}
                className="DropDownOption"
                onClick={() => handleSelect(status)}
              >
                <div
                  className={clsx("DropDownDot", {
                    PublishDot: status === "Publish",
                    DraftDot: status === "Draft",
                  })}
                ></div>
                <p>{status}</p>
              </div>
            ))}
          </div>
        </If>

        <If state={type === "POSTS"}>
          <div className="DropDownOptions">
            {["All Posts", "News", "Announcement"].map((postType) => (
              <div
                key={postType}
                className="DropDownOption"
                onClick={() => handleSelect(postType)}
              >
                <p>{postType}</p>
              </div>
            ))}
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
