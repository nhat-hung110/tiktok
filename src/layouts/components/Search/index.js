import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faMagnifyingGlass,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import HeadlessTippy from "@tippyjs/react/headless";
import classNames from "classnames/bind";

import * as searchServices from "../../../services/searchService";
import { Wrapper as PopoverWrapper } from "../../../components/popover";
import AccountItem from "../../../components/AccountItem";
import styles from "./Search.module.scss";
import useDebounce from "../../../hooks/useDebounce";

const cx = classNames.bind(styles);

function Search() {
  const [searchResult, setSearchResult] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [showResult, setShowResult] = useState(true);
  const [loading, setLoading] = useState(false);

  const debouncedValue = useDebounce(searchValue, 500);

  const inputRef = useRef();

  useEffect(() => {
    if (debouncedValue.trim()) {
      const fetchApi = async () => {
        setLoading(true);
        const result = await searchServices.search(debouncedValue);
        setSearchResult(result);

        setLoading(false);
      };

      fetchApi();
    } else {
      setSearchResult([]);
    }
  }, [debouncedValue]);

  const handleClear = () => {
    setSearchValue("");
    setSearchResult([]);
    inputRef.current.focus();
  };

  const handleHideResult = () => {
    setShowResult(false);
  };

  const handleChange = (e) => {
    const searchValue = e.target.value;
    if (!searchValue.startsWith(" ") || searchValue.trim()) {
      setSearchValue(searchValue);
    }
  };

  return (
    <div>
      <HeadlessTippy
        interactive
        visible={showResult && searchResult.length > 0}
        render={(attrs) => (
          <div className={cx("search-result")} tabIndex="-1" {...attrs}>
            <PopoverWrapper>
              <h4 className={cx("search-title")}>Account</h4>
              {searchResult.map((result) => {
                return <AccountItem key={result.id} data={result} />;
              })}
            </PopoverWrapper>
          </div>
        )}
        onClickOutside={handleHideResult}
      >
        <div className={cx("search")}>
          <input
            ref={inputRef}
            value={searchValue}
            placeholder="Search account and video"
            spellCheck="false"
            onChange={(e) => handleChange(e)}
            onFocus={() => setShowResult(true)}
          />
          {searchValue.trim() && !loading && (
            <button className={cx("clear")} onClick={handleClear}>
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
          )}
          {loading && (
            <FontAwesomeIcon className={cx("loading")} icon={faSpinner} />
          )}

          <button
            className={cx("search-btn")}
            onMouseDown={(e) => e.preventDefault()}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
      </HeadlessTippy>
    </div>
  );
}

export default Search;
