import {useKeyPress} from "ahooks";
import {
	copySelectedComponent,
	deleteComponent,
	pasteCopiedComponent, selectNextComponent,
	selectPrevComponent
} from "../store/componentReducer";
import {useDispatch} from "react-redux";

/**
 * 判断删除组件是否合法
 */
const isActiveEnementValid = () => {
    const activeElement = document.activeElement
    return activeElement === document.body;

}
const useBandCanvasKeyPress = () => {
    const dispatch = useDispatch()

    // 删除组件
    useKeyPress(
            ['backspace', 'delete'],
        () => {
							if(!isActiveEnementValid()) return
            dispatch(deleteComponent());
        }
    )
    // 复制
    useKeyPress(
        ['ctrl.c', 'meta.c'],
        () => {
					dispatch(copySelectedComponent())
        }
    )
    // 粘贴
    useKeyPress(
        ['ctrl.v', 'meta.v'],
        () => {
					dispatch(pasteCopiedComponent())
        }
    )

	// 向上移动
	useKeyPress(
		['uparrow'],
		() => {
			dispatch(selectPrevComponent())
		}
	)
	// 向下移动
	useKeyPress(
		['downarrow'],
		() => {
			dispatch(selectNextComponent())
		}
	)
}
export default  useBandCanvasKeyPress