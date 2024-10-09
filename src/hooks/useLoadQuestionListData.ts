import { useRequest } from "ahooks";
import { getQuestionListService } from "../servers/question";
import { useSearchParams } from "react-router-dom";
import { LIST_PAGE_PARAM_KEY, LIST_PAGE_SIZE, LIST_PAGE_SIZE_PARAM_KEY, LIST_SEARCH_PARAM_KEY } from "../constant";
type Option = {
  isStar: boolean;
  isDeleted: boolean;
};
const useLoadQuestionListData = (opt: Partial<Option>) => {
  const { isStar, isDeleted } = opt;
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");
  const pageSize = searchParams.get("pageSize");

  const { data, error, loading } = useRequest(
    async () => {
      const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || "";
      const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || "") || 1
      const pageSize = parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || "") || LIST_PAGE_SIZE
      const data = await getQuestionListService({ keyword, isStar, isDeleted, page, pageSize });
      return data as any;
    },
    {
      refreshDeps: [searchParams],
    }
  );
  return {
    data,
    error,
    loading,
  };
};
export default useLoadQuestionListData;
