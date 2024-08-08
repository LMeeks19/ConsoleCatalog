import { BarProps } from "../functions/interfaces";
import "../styling/bottombar.css";

function BottomBar(props: BarProps) {
  return <div className={`bottom-bar ${props.page}`}></div>;
}

export default BottomBar;
