import { Images } from "../contants"
import { CategoryModel } from "../models"

const DefaultCategories: CategoryModel[] = [
    {
        id: '1',
        icon: Images.work,
        text: 'Work',
        color: '#205DB9'
    },
    {
        id: '2',
        icon: Images.study,
        text: 'Study',
        color: '#A71C1C'
    },
    {
        id: '3',
        icon: Images.health,
        text: 'Health',
        color: '#D69407'
    },
    {
        id: '4',
        icon: Images.finance,
        text: 'Finance',
        color: '#17AB2D'
    },
    {
        id: '5',
        icon: Images.relation,
        text: 'Relation',
        color: '#AE1EBB'
    },
    {
        id: '6',
        icon: Images.meditation,
        text: 'Relax',
        color: '#12A6B7'
    },
    {
        id: '7',
        icon: Images.homework,
        text: 'Home',
        color: '#759B46'
    },
    {
        id: '8',
        icon: Images.food,
        text: 'Nutrition',
        color: '#4817AB'
    },
]

export const NUMBER_DEFAULT_CATEGORIES = 8

export default DefaultCategories