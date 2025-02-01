import { useState } from "react"
import { TaskUIStateProps } from "../types/TaskUIStateProps"

export default function useTaskUiState() {

    const [taskUi, setTaskUi] = useState<TaskUIStateProps>({
        loading: false,
        selectedTask: undefined,
        title: '',
        description: '',
        deleteLoading: false,
        addLoading: false,
        state: "",
        isUpDate: false
        
    })

    return {
        taskUi,
        setTaskUi
    }
}