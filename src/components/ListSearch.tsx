import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { Input } from "antd";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { LIST_SEARCH_PARAM_KEY } from "../constant";
const { Search } = Input;

const ListSearch: FC = () => {
  const [value, setValue] = useState("");
  const nav = useNavigate();
  const [searchParams] = useSearchParams();

  const { pathname } = useLocation();
  useEffect(() => {
    const search = searchParams.get(LIST_SEARCH_PARAM_KEY) || "";
    setValue(search);
  }, [searchParams]);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  const hanldeSearch = (value: string) => {
    // 跳转到具体页面
    nav({ pathname, search: `?${LIST_SEARCH_PARAM_KEY}=${value}` });
  };
  return (
    <Search
      allowClear
      placeholder="请输入关键字"
      onSearch={hanldeSearch}
      onChange={handleChange}
      value={value}
      style={{ width: "200px" }}
    />
  );
};
export default ListSearch;
