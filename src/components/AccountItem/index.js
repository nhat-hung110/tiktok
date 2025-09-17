import classNames from "classnames/bind";
import styles from "./AccountItem.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function AccountItem() {
  return (
    <div className={cx("wrapper")}>
      <img
        className={cx("avatar")}
        src="https://p16-sign-sg.tiktokcdn.com/tos-alisg-avt-0068/118441977edc639baf728fd892d500b3~tplv-tiktokx-cropcenter:1080:1080.jpeg?dr=14579&refresh_token=b23d66d3&x-expires=1758268800&x-signature=0nH7cXIvl01xRIo8ohQFbtrBcHM%3D&t=4d5b0474&ps=13740610&shp=a5d48078&shcp=81f88b70&idc=my2"
        alt="A"
      />
      <div className={cx("info")}>
        <h4 className={cx("name")}>
          <span>Nguyen Van A</span>
          <FontAwesomeIcon className={cx("check")} icon={faCheckCircle} />
        </h4>
        <span className={cx("username")}>Nguyenvana</span>
      </div>
    </div>
  );
}

export default AccountItem;
