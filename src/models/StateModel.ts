import { ThemeModel } from "../redux/Reducers/ThemeReducer"
import { CategoryModel } from "./CategoryModel"
import { TaskModel } from "./TaskModel"

export type StateModel = {
    tasks: TaskModel[],
    theme: ThemeModel,
    categories: CategoryModel[]
}