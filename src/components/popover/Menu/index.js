import Tippy from "@tippyjs/react/headless";
import classNames from "classnames/bind";
import styles from "./Menu.module.scss";
import { Wrapper as PopoverWrapper } from "../../popover";
import MenuItem from "./MenuItem";

const cx = classNames.bind(styles);

function Menu({ children, items = [] }) {
  const renderItems = () => {
    return items.map((item, index) => <MenuItem key={index} data={item} />);
  };

  console.log(renderItems());

  return (
    <Tippy
      interactive
      delay={[0, 800]}
      placement="bottom-end"
      render={(attrs) => (
        <div className={cx("menu-list")} tabIndex="-1" {...attrs}>
          <PopoverWrapper className={cx("menu-popover")}>
            {renderItems()}
          </PopoverWrapper>
        </div>
      )}
    >
      {children}
    </Tippy>
  );
}

export default Menu;
