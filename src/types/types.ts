import type { ReactNode } from "react";

export type DropdownItem = {
  label: string;
  value: string;
};

export const DropdownType = {
  DEFAULT: "DEFAULT",
  PUBLISH: "PUBLISH",
  STATUS: "STATUS",
  POSTS: "POSTS",
} as const;

export type DropdownProps = {
  type?: "DEFAULT" | "STATUS" | "PUBLISH" | "POSTS";
  options?: DropdownItem[];
  leftImage?: string;
  className?: string;
  placeholder?: string;
};

export interface IfProps {
  state: boolean;
  children: ReactNode;
}
