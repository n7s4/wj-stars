import React, { FC, useEffect, useState } from "react";
import { Pagination } from "antd";
import {
  LIST_PAGE_PARAM_KEY,
  LIST_PAGE_SIZE,
  LIST_PAGE_SIZE_PARAM_KEY,
} from "../constant";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
type PageType = {
  total: number;
};
const ListPage: FC<PageType> = (props: PageType) => {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(LIST_PAGE_SIZE);
  // 从页面url中找到page和pageSize并同步到Pagination组件
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || "") || 1;
    setCurrent(page);
    const pageSezie =
      parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || "") ||
      LIST_PAGE_SIZE;
    setPageSize(pageSezie);
  }, [searchParams]);
  const { total } = props;

  const nav = useNavigate();
  const { pathname } = useLocation();
  const handleChangePage = (page: number, pageSize: number) => {
    searchParams.set(LIST_PAGE_PARAM_KEY, page.toString());
    searchParams.set(LIST_PAGE_SIZE_PARAM_KEY, pageSize.toString());
    nav({
      pathname,
      search: searchParams.toString(),
    });
  };
  return (
    <div>
      <Pagination
        style={{ textAlign: "center" }}
        pageSize={pageSize}
        current={current}
        total={total}
        onChange={handleChangePage}
      />
    </div>
  );
};
export default ListPage;
