import React from "react";
import { DropdownType, type TableElementProps } from "@/types/types";
import { Dropdown } from "@/components/dropDown/DropDown";
import IconEdit from "@/assets/edit.svg";
import IconTrash from "@/assets/trash.svg";
import "./TableElement.scss";

const TableElement: React.FC<TableElementProps> = ({
  id,
  image,
  title,
  description,
  contentType,
  date,
  time,
  status,
  author,
  onDelete,
  onUpdate,
}) => {
  const getContentTypeStyle = () => {
    return contentType === "News"
      ? { color: "#1447E6", backgroundColor: "#C4DEFF" }
      : { color: "#8200DB", backgroundColor: "#F3E8FF" };
  };

  const getStatusStyle = () => {
    return status === "Active"
      ? { color: "#145E00", backgroundColor: "#E7FFE1" }
      : { color: "#A40000", backgroundColor: "#FFEAEA" };
  };

  const getStatusDotColor = () => {
    return status === "Active" ? "#145E00" : "#A40000";
  };

  return (
    <tr className="TableElement">
      <td className="ElementPost">
        <div className="ElementImageText">
          <img
            src={image}
            alt={title}
            className="ElementImage"
            onError={(e) => {
              e.currentTarget.src = "/placeholder-image.png";
            }}
          />
          <div className="ElementTextGroup">
            <p className="ElementTitle" title={title}>
              {title}
            </p>
            <p className="ElementDescription" title={description}>
              {description}
            </p>
          </div>
        </div>
      </td>

      <td>
        <div className="ElementTypeContainer">
          <div className="ElementType" style={getContentTypeStyle()}>
            {contentType}
          </div>
        </div>
      </td>

      <td>
        <div className="ElementDate">
          <p className="DateText">{date}</p>
          <p className="TimeText">{time}</p>
        </div>
      </td>

      <td>
        <div className="ElementStatus">
          <div className="ElementStatusContainer" style={getStatusStyle()}>
            <span
              className="StatusDot"
              style={{ backgroundColor: getStatusDotColor() }}
            />
            {status}
          </div>
        </div>
      </td>

      <td>
        <Dropdown type={DropdownType.PUBLISH} />
      </td>

      <td>
        <p className="ElementAuthor">{author}</p>
      </td>

      <td>
        <div className="ElementActions">
          <button
            type="button"
            className="ActionButton"
            onClick={() => onUpdate && onUpdate(id)}
            aria-label="Edit"
          >
            <img src={IconEdit} alt="" className="ActionIcon" />
          </button>
          <button
            type="button"
            className="ActionButton"
            onClick={() => onDelete && onDelete(id)}
            aria-label="Delete"
          >
            <img src={IconTrash} alt="" className="ActionIcon" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TableElement;
