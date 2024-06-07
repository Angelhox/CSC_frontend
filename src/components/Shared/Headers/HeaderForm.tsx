import "./HeaderForm.scss";
import { IMenuActions } from "../../../commons/interfaces/menu-actions";
type Props = {
  menuActions: IMenuActions[];
  title: string;
};
export function HeaderForm({ title, menuActions }: Props) {
  return (
    <section className="header">
      {" "}
      <h1>{title}</h1>
      <div className="Items">
        {menuActions.map((menuAction) => (
          <div
            className="item"
            key={menuAction.id}
            onClick={menuAction.onClick}
          >
            <menuAction.icon />
            <span>{menuAction.title}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
