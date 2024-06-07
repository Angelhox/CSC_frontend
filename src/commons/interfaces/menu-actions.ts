import { IconType } from "react-icons/lib";
export interface IMenuActions {
  id?: number;
  icon: IconType;
  title?: string;
  onClick?: () => void;
}
