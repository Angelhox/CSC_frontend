/* eslint-disable @typescript-eslint/no-unused-vars */
import { IMenuItem } from "../../../commons/interfaces/left-menu";
import "./SideBarMenuItemView.scss";
import { classNames } from "../../../util/clases";
import { useLocation } from "react-router-dom";

interface Props {
  item: IMenuItem;
  isOpen: boolean;
}
export function SideBarMenuItemView({ item, isOpen }: Props) {
  const { pathname } = useLocation();
  const isCurrentPage = (route: string) => {
    return route === pathname;
  };
  return (
    <div className="SideBarMenuItemView">
      <a
        href={item.url}
        className={classNames(
          isCurrentPage(item.url) ? "active" : "",
          classNames( isOpen ? "expanded" : "collapsed")
        )}
      >
        <div className={classNames("ItemContent", isOpen ? "" : "collapsed")}>
          <div className="icon">
            <item.icon size="32" />
          </div>
          <span className="label">{item.label}</span>
        </div>
      </a>
      {!isOpen ? <div className="tooltip">{item.label}</div> : ""}
    </div>
  );
}
