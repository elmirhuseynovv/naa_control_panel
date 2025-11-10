// Table.tsx
import React from "react";
import TableElement from "./tableElement/TableElement";
import IconIMage from "@/assets/img.png";
import type { TableElementProps } from "@/types/types";
import "./Table.scss";

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

  const data: TableElementProps[] = [
    {
      image: IconIMage,
      title:
        "Milli Aviasiya Akademiyası kitabı Milli Aviasiya Akademiyası kitabı",
      description:
        "Kitab haqqında uzun description Milli Aviasiya Akademiyası kitabı Milli Aviasiya Akademiyası kitabı Milli Aviasiya Akademiyası kitabı",
      contentType: "Announcement",
      date: "06/11/2026",
      time: "10:19 AM",
      status: "Active",
      author: "snovruzlu",
    },
    {
      image: IconIMage,
      title:
        "Milli Aviasiya Akademiyası kitabı Milli Aviasiya Akademiyası kitabı",
      description:
        "Kitab haqqında uzun description Milli Aviasiya Akademiyası kitabı Milli Aviasiya Akademiyası kitabı Milli Aviasiya Akademiyası kitabı",
      contentType: "News",
      date: "06/11/2026",
      time: "10:19 AM",
      status: "Inactive",
      author: "snovruzlu",
    },
  ];

  return (
    <table className="Table">
      <thead>
        <tr>
          {headers.map((header, idx) => (
            <th key={idx}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, idx) => (
          <TableElement key={idx} {...item} />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
