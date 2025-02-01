import { TaskTypes } from "./TaskTypes"

export type TaskUIStateProps =  {
    loading: boolean
    selectedTask: TaskTypes | undefined
    title: string
    description: string,
    deleteLoading: boolean,
    addLoading: boolean,
    state: string
    isUpDate: boolean
}