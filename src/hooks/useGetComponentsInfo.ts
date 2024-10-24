import { useSelector } from "react-redux";
import { StateType } from "../store";
import { ComponentStateType } from "../store/componentReducer";
function useGetComponentsInfo() {
  const components = useSelector<StateType>(state => state.components)
  const {componentList = [], selectedId = ''} = components as ComponentStateType
  return {componentList, selectedId}
}
export default useGetComponentsInfo