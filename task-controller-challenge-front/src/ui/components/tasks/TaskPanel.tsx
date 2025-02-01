import React, { useState, useEffect } from "react";
import {
    Box,
    VStack,
    Heading,
    HStack,
    Card,
    CardBody,
    Button,
    createListCollection,
} from "@chakra-ui/react";
import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
} from "@hello-pangea/dnd";
import { TaskState, TaskTypes } from "@/ui/types/TaskTypes";
import {
    SelectContent,
    SelectItem,
    SelectRoot,
    SelectTrigger,
    SelectValueText,
} from "@/components/ui/select";
import { LOCAL_STORAGE_KEY } from "@/utils/contants";


type TaskBoardProps = {
    listOfTasks: TaskTypes[];
    selectTask(task: TaskTypes, isToDelete: boolean): void;

};



const TaskPanel: React.FC<TaskBoardProps> = ({ listOfTasks, selectTask }) => {
    // Estado interno das tarefas, inicializado com os dados do localStorage (se houver)

    // const [tasks, setTasks] = useState<TaskTypes[]>(() => {
    //     const storedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
    //     if (storedTasks) {
    //         return [...JSON.parse(storedTasks), listOfTasks];
    //     }
    //     return listOfTasks;
    // });

     const [tasks, setTasks] = useState<TaskTypes[]>([]);

 

    useEffect(() => {
        setTasks(listOfTasks);
        // const storedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);

        // if (storedTasks) {
        //     const mergedTasks = [...JSON.parse(storedTasks), ...listOfTasks];

        //     // Remover duplicatas com base no ID
        //     const uniqueTasks = mergedTasks.filter(
        //         (task, index, self) => index === self.findIndex((t) => t.id === task.id)
        //     );

        //     setTasks(uniqueTasks);
        //     localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(uniqueTasks));
        // } else {
        //     setTasks(listOfTasks);
        //     localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(listOfTasks));
        // }
        
    }, [listOfTasks.length]);


    const groupedTasks: Record<TaskState, TaskTypes[]> = {
        [TaskState.Pending]: tasks.filter((task) => task.state === TaskState.Pending),
        [TaskState.InProgress]: tasks.filter((task) => task.state === TaskState.InProgress),
        [TaskState.Done]: tasks.filter((task) => task.state === TaskState.Done),
    };

    // Coleção de estados para o componente Select
    const stateOrder = createListCollection({
        items: [
            { label: TaskState.Pending, value: TaskState.Pending },
            { label: TaskState.InProgress, value: TaskState.InProgress },
            { label: TaskState.Done, value: TaskState.Done },
        ],
    });

    // Atualiza o estado da tarefa
    const moveTask = (task: TaskTypes, newState: string) => {
        const updatedTask = { ...task, state: newState };
        const result = tasks.map((t) => (t.id === task.id ? updatedTask : t))
        setTasks(result);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(result));
    };

    // Função chamada quando o drag termina
    const handleDragEnd = (result: DropResult) => {
        const { source, destination, draggableId } = result;
        if (!destination) return;

        // Se a tarefa foi solta na mesma coluna, não altera nada
        if (source.droppableId === destination.droppableId) return;

        // Encontra a tarefa movida e atualiza seu estado com base na coluna de destino
        const taskToMove = tasks.find((task) => task.id === draggableId);
        if (taskToMove) {
            moveTask(taskToMove, destination.droppableId as TaskState);
        }
    };

    return (
        <Box w="100%">
            <DragDropContext onDragEnd={handleDragEnd}>
                <VStack height="100vh" borderRadius={10} p={4}>
                    <Heading color="white">Gerenciador de Tarefas</Heading>
                    <HStack align="start" p={6} width="full" justifyContent="center">
                        {Object.entries(groupedTasks).map(([status, tasksInGroup]) => (
                            <Droppable key={status} droppableId={status}>
                                {(provided) => (
                                    <VStack
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        w="33%"
                                        p={4}
                                        bg="gray.700"
                                        borderRadius="md"
                                        minH="400px"
                                    >
                                        <Heading size="md" color="white">
                                            {status}
                                        </Heading>
                                        {tasksInGroup.length > 0 ? (
                                            tasksInGroup.map((task, index) => (
                                                <Draggable key={task.id} draggableId={task.id} index={index}>
                                                    {(provided) => (
                                                        <Card.Root
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            w="full"
                                                            bg="gray.600"
                                                            color="white"
                                                            mb={4}
                                                        >
                                                            <CardBody>
                                                                <Heading size="sm">{task.title}</Heading>
                                                                <Box>{task.description}</Box>
                                                                <HStack mt={2} p={2}>
                                                                    <Button
                                                                        size="xs"
                                                                        colorScheme="blue"
                                                                        onClick={() => selectTask(task, false)}
                                                                    >
                                                                        Editar
                                                                    </Button>

                                                                    {/* Componente Select para mudança de estado via clique */}
                                                                    <SelectRoot
                                                                        size="xs"
                                                                        collection={stateOrder}
                                                                    >
                                                                        <SelectTrigger>
                                                                            <SelectValueText placeholder="Estado da Tarefa" />
                                                                        </SelectTrigger>

                                                                        <SelectContent>
                                                                            {stateOrder.items.map((item) => (
                                                                                <SelectItem
                                                                                    item={item} key={item.label}
                                                                                    onClick={
                                                                                        () => {
                                                                                            moveTask(
                                                                                                task,
                                                                                                item.label
                                                                                            )
                                                                                        }
                                                                                    }
                                                                                >
                                                                                    {item.value}
                                                                                </SelectItem>
                                                                            ))}
                                                                        </SelectContent>
                                                                    </SelectRoot>

                                                                    <Button
                                                                        size="xs"
                                                                        bg="red"
                                                                        color="#fff"
                                                                        onClick={() => selectTask(task, true)}
                                                                    >
                                                                        Excluir
                                                                    </Button>
                                                                </HStack>
                                                            </CardBody>
                                                        </Card.Root>
                                                    )}
                                                </Draggable>
                                            ))
                                        ) : (
                                            <Box color="gray.400">Nenhuma tarefa</Box>
                                        )}
                                        {provided.placeholder}
                                    </VStack>
                                )}
                            </Droppable>
                        ))}
                    </HStack>
                </VStack>
            </DragDropContext>
        </Box>
    );
};

export default TaskPanel;
