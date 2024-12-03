// eslint-disabled-next-line
import React, { FC, useEffect, useState, useRef, useMemo } from "react";
import QuestionCard from "../../components/QuestionCard";
import styles from "./Common.module.scss";
import { useRequest, useTitle, useDebounceFn } from "ahooks";
import { Empty, Spin, Typography } from "antd";
import ListSearch from "../../components/ListSearch";
import { useSearchParams } from "react-router-dom";
import { getQuestionListService } from "../../servers/question";
import { LIST_PAGE_SIZE, LIST_SEARCH_PARAM_KEY } from "../../constant";
const { Title } = Typography;
const List: FC = () => {
  useTitle("调查君 - 我的问卷");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState([]); //全部的数据 上滑加载更多
  const haveMoreData = total > list.length; // 是否需要加载更多数据
  const [searchParams] = useSearchParams();
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false); // 是否已经加载过数据;
  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || "";

  // 搜索发生变化， 重置信息
  useEffect(() => {
    setList([]);
    setPage(1);
    setTotal(0);
    setStarted(false);
  }, [keyword]);
  // 真正加载
  const { run: load, loading } = useRequest(
    async () => {
      const data = await getQuestionListService({
        page,
        pageSize: LIST_PAGE_SIZE,
        keyword,
      });
      return data;
    },
    {
      manual: true,
      onSuccess(data) {
        const { list: l = [], total } = data;
        setList(list.concat(l));
        setTotal(total);
        setPage(page + 1);
      },
    }
  );

  // 尝试触发加载更多数据
  const { run: tryLoadMore } = useDebounceFn(
    () => {
      const elem = loadMoreRef.current;
      if (elem === null) return;
      const domRect = elem.getBoundingClientRect();
      if (domRect === null) return;
      const { bottom } = domRect;
      if (bottom < document.body.clientHeight) {
        // 触发加载
        load();
        setStarted(true);
      }
    },
    {
      wait: 500,
    }
  );
  useEffect(() => {
    tryLoadMore();
  }, [searchParams]);

  // 滑动的时候也需要加载
  useEffect(() => {
    if (haveMoreData) {
      window.addEventListener("scroll", tryLoadMore);
    }
    return () => {
      window.removeEventListener("scroll", tryLoadMore); // 解除dom事件
    };
  }, [searchParams, haveMoreData]);
  const loadMoreContent = useMemo(() => {
    if (!started || loading) return <Spin />;
    if (total === 0) return <Empty description="暂无数据" />;
    if (!haveMoreData) return <div>没有更多数据了</div>;
    return <span>开始加载下一页</span>;
  }, [haveMoreData, loading, started]);
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>{<ListSearch />}</div>
      </div>
      <div className={styles.content}>
        {/* 问卷列表 */}
        {list.length > 0 &&
          list.map((q: any) => {
            const { _id } = q;
            return <QuestionCard key={_id} {...q} />;
          })}
      </div>
      <div className={styles.footer}>
        <div ref={loadMoreRef}>{loadMoreContent}</div>
      </div>
    </>
  );
};
export default List;
