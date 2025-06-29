import { CategoryModel } from "./CategoryModel";

export interface TaskModel {
    id?: string,
    title: string,
    description: string,
    completed: boolean,
    dateTime: Date,
    isAlert?: boolean,
    categoryId?: string,
    category?: CategoryModel,
    actualFocusTimeInSec?: number,
    startAt?: Date,
    repeat?: string 
}