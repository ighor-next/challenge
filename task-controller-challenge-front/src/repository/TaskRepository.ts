import { getData, saveData } from "@/database/localstorageDao";
import { TaskTypes } from "@/ui/types/TaskTypes";
import { LOCAL_STORAGE_KEY, storedTasks } from "@/utils/contants";
import axios from "axios";
import { create } from "zustand";


interface State {
    loading: boolean,
    listOfTasks: TaskTypes[]
}

const initialState: State = {
    loading: false,
    listOfTasks: []
}

interface Actions {
    addNewTask: (task: TaskTypes) => Promise<void>
    updateTask: (task: TaskTypes, listOfTasks: TaskTypes[]) => Promise<void>
    deleteTask: (task: TaskTypes, listOfTasks: TaskTypes[]) => Promise<void>
    getAllTasks: () => Promise<void>
}

const API_URL = 'http://localhost:3001/tasks';

export const useTaskRepository = create<Actions & State>((set, get) => ({
    ...initialState,
    listOfTasks: [],
    getAllTasks: () => {

        set({ loading: true })

        return new Promise(async (resolve) => {

            const { data } = await axios.get(API_URL);

            const storedTasks = getData(LOCAL_STORAGE_KEY) as TaskTypes[];

            if (storedTasks) {

                const uniqueTasks = storedTasks.filter(
                    (task, index, self) => index === self.findIndex((t) => t.id === task.id)
                );

                set({ listOfTasks: uniqueTasks, loading: false })
                saveData(LOCAL_STORAGE_KEY, uniqueTasks)
                resolve()
            } else {
                set({ listOfTasks: data, loading: false })
                saveData(LOCAL_STORAGE_KEY, data)
            }

        })
    },

    addNewTask: (task: TaskTypes) => {

        const { listOfTasks } = get()

        return new Promise(async (resolve) => {
            await axios.post(API_URL, task);
            set((state) => (
                { listOfTasks: [...state.listOfTasks, task] }
            ))

            saveData(LOCAL_STORAGE_KEY, [...listOfTasks, task])
            resolve()
        })
    },

    updateTask: async (updatedTask: TaskTypes) => {
        const { listOfTasks } = get();
        await axios.put(`${API_URL}/${updatedTask.id}`, updatedTask);

        const updatedList = listOfTasks.map((task) =>
            task.id === updatedTask.id ? { ...task, ...updatedTask } : task
        );
        
        saveData(LOCAL_STORAGE_KEY, updatedList);
        set({ listOfTasks: [...listOfTasks, updatedTask], loading: false });
        window.location.reload()
    },



    deleteTask: (taskData: TaskTypes, listOfTasks: TaskTypes[]) => {

        return new Promise((resolve) => {
            axios.delete(`${API_URL}/${taskData.id}`);
            const result = listOfTasks.filter((task) => task.id !== taskData.id)

            set({ listOfTasks: result, loading: false })
            // localstorage
            const storedTasksResult = storedTasks.filter((task) => task.id !== taskData.id)
            saveData(LOCAL_STORAGE_KEY, storedTasksResult)

            resolve()
        })
    },
}))