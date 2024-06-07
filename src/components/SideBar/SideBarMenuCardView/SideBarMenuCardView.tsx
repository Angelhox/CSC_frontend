/* eslint-disable @typescript-eslint/no-unused-vars */
import { IUsercard } from "../../../commons/interfaces/left-menu";
import { classNames } from "../../../util/clases";
import "./SideBarMenuCardView.scss";
interface Props {
  isOpen: boolean;
  card: IUsercard;
}
export function SideBarMenuCardView({ card, isOpen }:Props) {
  return (
    <div className="SideBarMenuCardView">
      <img
        className="profile"
        alt={card.displayName}
        src={card.photoUrl}
        width="100%"
      />
      <div className={classNames("profileInfo", isOpen ? "" : "collapsed")}>
        <div className="name">{card.displayName}</div>
        <div className="title">{card.title}</div>
        <div className="url">
          <a href={card.url}>Ir al perfil</a>
        </div>
      </div>
    </div>
  );
}

