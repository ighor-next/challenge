import { useEffect } from 'react'
import { Box, useDisclosure, VStack } from '@chakra-ui/react'
import { useTaskRepository } from './repository/TaskRepository'
import useTaskUiState from './ui/states/TaskUIstate'
import AddTaskDialog from './ui/components/dialogs/AddTaskDialog'
import { BG_DARK_GRAY } from './utils/colors'
import LoadingComponent from './ui/components/loading/Loading'
import EmptyMessage from './ui/components/message/EmptyMessage'
import DeleteTaskDialog from './ui/components/dialogs/DeleteTaskDialog'
import AddTaskButton from './ui/components/AddTaskButton'
import TaskPanel from './ui/components/tasks/TaskPanel'
import { TaskState, TaskTypes } from './ui/types/TaskTypes'
import { ToasteMessage } from './ui/components/toaste'
import { ToastStatus } from './ui/types/ToastStatus'
import { Toaster } from './components/ui/toaster'

function App(): JSX.Element {
	const getAllTasks = useTaskRepository((state) => state.getAllTasks)
	const listOfTasks = useTaskRepository((state) => state.listOfTasks)
	const loading = useTaskRepository((state) => state.loading)
	const addNewTask = useTaskRepository((state) => state.addNewTask)
	const updateTask = useTaskRepository((state) => state.updateTask)
	const deleteTask = useTaskRepository((state) => state.deleteTask)

	const { setTaskUi, taskUi } = useTaskUiState()
	const { open: isShowTaskDialog, onOpen: handleShowTaskAddTaskDialog, onClose: onCloseAddTaskDialog } = useDisclosure();
	const { open: isShowDeleteDialog, onOpen: onOpenDeleteDialog, onClose: onCloseDeleteDialog } = useDisclosure();

	useEffect(() => { getAllTasks() }, [])

	function onChangeText(event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) {
		const newValue = event.target.value;
		const field = event.target.name;

		setTaskUi({
			...taskUi,
			[field]: newValue
		});
	}

	function clearState() {
		setTaskUi(prevLogin => ({
			...prevLogin,
			loading: false,
			selectedTask: undefined,
			title: '',
			description: '',
			deleteLoading: false
		}))
	}


	function onUpdateTask() {
		if (taskUi.selectedTask) {
			setTaskUi(prevLogin => ({ ...prevLogin, addLoading: true }))

			const updatedTask: TaskTypes = {
				title: taskUi.title,
				description: taskUi.description,
				state: taskUi.selectedTask.state,
				id: taskUi.selectedTask.id,
				createdAt: taskUi.selectedTask.createdAt
			}

			updateTask(updatedTask, listOfTasks)
				.then(() => {
					setTaskUi(prevLogin => ({ ...prevLogin, addLoading: false }))
					ToasteMessage(
						"Tarefa",
						"Tarefa atualizada com sucesso.",
						ToastStatus.SUCCESS
					)
					clearState()
					onCloseAddTaskDialog()
				}).catch(() => {
					setTaskUi(prevLogin => ({ ...prevLogin, addLoading: false }))
					ToasteMessage(
						"Tarefa",
						"Houve um problema ao atualizar a tarefa.",
						ToastStatus.ERROR
					)
					onCloseAddTaskDialog()
				})
		}
	}


	function onAddTask() {
		if (taskUi.title == "") {
			ToasteMessage(
				"Tarefa",
				"Adicone o titulo da tarefa",
				ToastStatus.WARNING
			)
			return
		}

		if (taskUi.description === "") {
			ToasteMessage(
				"Tarefa",
				"Adicone a descrição da tarefa",
				ToastStatus.WARNING
			)
			return
		}

		setTaskUi(prevLogin => ({ ...prevLogin, addLoading: true }))

		const value: TaskTypes = {
			title: taskUi.title,
			description: taskUi.description,
			state: TaskState.Pending,
			id: `${new Date().getTime() * 1000}`,
			createdAt: new Date()
		}

		addNewTask(value)
			.then(() => {
				setTaskUi(prevLogin => ({ ...prevLogin, addLoading: false }))
				ToasteMessage(
					"Tarefa",
					"Tarefa adicionada com sucesso.",
					ToastStatus.SUCCESS
				)
				clearState()
				onCloseAddTaskDialog()
			}).catch(() => {
				setTaskUi(prevLogin => ({ ...prevLogin, addLoading: false }))
				ToasteMessage(
					"Tarefa",
					"Houve um problema ao adiconar a tarefa.",
					ToastStatus.ERROR
				)
				onCloseAddTaskDialog()
			})
	}


	function selectTask(task: TaskTypes, isToDelete: boolean) {

		setTaskUi(prevLogin => ({ ...prevLogin, selectedTask: task }))
		if (isToDelete) {
			onOpenDeleteDialog()
		} else {
			setTaskUi(prevLogin => (
				{
					...prevLogin,
					title: task.title,
					description: task.description,
					isUpDate: true
				})
			)
			handleShowTaskAddTaskDialog()
		}
	}

	function onDeleteTask() {
		if (taskUi.selectedTask) {
			setTaskUi(prevLogin => ({ ...prevLogin, deleteLoading: true }))
			deleteTask(taskUi.selectedTask, listOfTasks)
				.then(() => {
					setTaskUi(prevLogin => ({ ...prevLogin, deleteLoading: false }))
					ToasteMessage(
						"Tarefa",
						"Tarefa removida com sucesso.",
						ToastStatus.SUCCESS
					)
					clearState()
					onCloseDeleteDialog()
				}).catch(() => {
					setTaskUi(prevLogin => ({ ...prevLogin, deleteLoading: false }))
					ToasteMessage(
						"Tarefa",
						"Houve um problema ao apagar a tarefa.",
						ToastStatus.ERROR
					)
					onCloseDeleteDialog()
				})
		}

	}

	function onClose() {

		onCloseAddTaskDialog()
	}



	return (
		<Box
			bg={BG_DARK_GRAY}
			padding={5}
		>
			<VStack
				maxW="8xl"
				mx="auto"
				height={"outo"}
				bg={BG_DARK_GRAY}
				//justifyContent={"center"}
				borderRadius={10}
			>
				<AddTaskButton
					onClick={()=>{
						clearState()
						handleShowTaskAddTaskDialog()
					}}
				/>

				{loading ?
					<LoadingComponent />
					:
					listOfTasks.length > 0 ?
						<TaskPanel
							listOfTasks={listOfTasks}
							selectTask={selectTask}
						/>
						:
						<EmptyMessage />
				}

				<AddTaskDialog
					onCloseAddTaskDialog={onClose}
					isShowTaskDialog={isShowTaskDialog}
					onChangeText={onChangeText}
					taskUi={taskUi}
					onAddTask={onAddTask}
					onUpdateTask={onUpdateTask}
				/>

				<DeleteTaskDialog
					isOpen={isShowDeleteDialog}
					onClose={onCloseDeleteDialog}
					loading={taskUi.deleteLoading}
					onDelete={onDeleteTask}
				/>
			</VStack>
			<Toaster />
		</Box>
	)
}

export default App
