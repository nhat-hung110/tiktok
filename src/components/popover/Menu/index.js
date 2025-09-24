import Tippy from "@tippyjs/react/headless";
import classNames from "classnames/bind";
import styles from "./Menu.module.scss";
import { Wrapper as PopoverWrapper } from "../../popover";
import MenuItem from "./MenuItem";
import Header from "./Header";
import { useState } from "react";

const cx = classNames.bind(styles);

const defaultFn = () => {};

function Menu({
  children,
  items = [],
  hideOnClick = "false",
  onChange = defaultFn,
}) {
  const [history, setHistory] = useState([{ data: items }]);
  const currentMenu = history[history.length - 1];

  const renderItems = () => {
    return currentMenu.data.map((item, index) => {
      const isParent = !!item.children;

      return (
        <MenuItem
          key={index}
          data={item}
          onClick={() => {
            if (isParent) {
              setHistory((prev) => [...prev, item.children]);
            } else {
              onChange(item);
            }
          }}
        />
      );
    });
  };

  const handleResetMenu = () => {
    setHistory((prev) => prev.slice(0, 1));
  };

  return (
    <Tippy
      interactive
      offset={[12, 10]}
      delay={[0, 500]}
      placement="bottom-end"
      hideOnClick={hideOnClick}
      render={(attrs) => (
        <div className={cx("menu-list")} tabIndex="-1" {...attrs}>
          <PopoverWrapper className={cx("menu-popover")}>
            {history.length > 1 && (
              <Header
                title="Language"
                onBack={() => {
                  setHistory((prev) => prev.slice(0, prev.length - 1));
                }}
              />
            )}
            <div className={cx("menu-body")}>{renderItems()}</div>
          </PopoverWrapper>
        </div>
      )}
      onHide={handleResetMenu}
    >
      {children}
    </Tippy>
  );
}

export default Menu;
