import React, { useState } from "react";
import { Input, Button } from "antd";
import classNames from "classnames";
import { IoIosSearch, IoIosArrowDown } from "react-icons/io";

function SearchColumns({ searchQuery, setSearchParams, searchParams }) {
  const [selectedKeys, setSelectedKeys] = useState(searchQuery || "");
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const handleSearch = (searchValue) => {
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      search_query: searchValue,
    });
  };

  const handleReset = () => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.delete("search_query");
      return newParams;
    });
    setSelectedKeys("");
  };

  return (
    <div>
      <Button onClick={toggleSearch} className="mb-2 flex items-center">
        <span
          className={classNames("transition-all duration-300 transform", {
            "rotate-180": isSearchVisible,
          })}
        >
          {isSearchVisible ? (
            <IoIosArrowDown size={20} />
          ) : (
            <IoIosSearch size={20} />
          )}
        </span>
        <span>Αναζήτηση</span>
      </Button>

      <div
        className={classNames(
          "transition-max-height duration-500 ease-in-out overflow-hidden flex flex-col",
          { "max-h-0": !isSearchVisible, "max-h-40": isSearchVisible }
        )}
      >
        <Input
          className="mb-2 w-[300px]"
          placeholder="Αναζήτηση"
          value={selectedKeys}
          onChange={(e) => setSelectedKeys(e.target.value)}
          onPressEnter={() => handleSearch(selectedKeys)}
        />
        <div className="flex items-center gap-2">
          <Button onClick={handleReset} size="small">
            Καθαρισμός
          </Button>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys)}
            icon={<IoIosSearch />}
            size="small"
            className="w-full"
            disabled={selectedKeys === ""}
          >
            Αναζήτηση
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SearchColumns;
