import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleQuestion,
  faCoins,
  faEarthAsia,
  faEllipsisVertical,
  faGear,
  faKeyboard,
  faSignOut,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { Link } from "react-router-dom";

import Button from "../../../components/Button";
import styles from "./Header.module.scss";
import images from "../../../assets/images";
import Menu from "../../../components/popover/Menu";
import { MessageIcon, UploadIcon } from "../../../components/icons";
import Image from "../../../components/Image";
import Search from "../Search";
import routesConfig from "../../../config/routes";

const cx = classNames.bind(styles);

const MENU_ITEMS = [
  {
    icon: <FontAwesomeIcon icon={faEarthAsia} />,
    title: "English",
    children: {
      title: "Language",
      data: [
        {
          code: "vi",
          title: "Tiếng việt",
        },
        {
          code: "en",
          title: "English",
        },
      ],
    },
  },
  {
    icon: <FontAwesomeIcon icon={faCircleQuestion} />,
    title: "Feedback and help",
    to: "/feedback",
  },
  {
    icon: <FontAwesomeIcon icon={faKeyboard} />,
    title: "Keyboard shortcuts",
  },
];

function Header() {
  const currentUser = false;

  // Handle logic
  const handleMenuChange = (menuItem) => {
    // console.log(menuItem);
  };

  const userMenu = [
    {
      icon: <FontAwesomeIcon icon={faUser} />,
      title: "View profile",
      to: "/@user",
    },
    {
      icon: <FontAwesomeIcon icon={faCoins} />,
      title: "Get coins",
      to: "/coin",
    },
    {
      icon: <FontAwesomeIcon icon={faGear} />,
      title: "Settings",
      to: "/setting",
    },
    ...MENU_ITEMS,
    {
      icon: <FontAwesomeIcon icon={faSignOut} />,
      title: "Log out",
      to: "/logout",
      separate: true,
    },
  ];

  return (
    <header className={cx("wrapper")}>
      <div className={cx("inner")}>
        <Link to={routesConfig.home}>
          <div className={cx("logo")}>
            <img src={images.logo} alt="Tiktok logo" />
          </div>
        </Link>

        <Search />

        <div className={cx("action")}>
          {currentUser ? (
            <>
              <Tippy delay={[0, 100]} content="Upload video" placement="bottom">
                <button className={cx("action-btn")}>
                  <UploadIcon className={cx("action-icon")} />
                </button>
              </Tippy>
              <Tippy delay={[0, 100]} content="Message" placement="bottom">
                <button className={cx("action-btn")}>
                  <MessageIcon className={cx("action-icon")} />
                  <span className={cx("badge")}>12</span>
                </button>
              </Tippy>
            </>
          ) : (
            <>
              <Button text>Upload</Button>
              <Button primary to = '/'>Log in</Button>
            </>
          )}
          <Menu onChange={handleMenuChange} items={userMenu}>
            {currentUser ? (
              <Image
                className={cx("user-avatar")}
                src=""
                fallback="https://www.slotcharter.net/wp-content/uploads/2020/02/no-avatar.png"
                alt="Nguyen Van A"
              />
            ) : (
              <button className={cx("more-btn")}>
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </button>
            )}
          </Menu>
        </div>
      </div>
    </header>
  );
}

export default Header;
