import type { IfProps } from "@/types/types";
import React from "react";

const If: React.FC<IfProps> = ({ state, children }) => {
  return state ? <>{children}</> : null;
};

export default If;
