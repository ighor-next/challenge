import {
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
} from "@/components/ui/dialog";
import { APP_COLOR, BG_DARK_GRAY } from "@/utils/colors";
import { Box, Button } from "@chakra-ui/react";
import InputText from "../input/InputText";
import { TaskUIStateProps } from "@/ui/types/TaskUIStateProps";

interface Props {
    isShowTaskDialog: boolean,
    onChangeText(event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>): void
    taskUi: TaskUIStateProps
    onCloseAddTaskDialog: () => void
    onAddTask(): void
    onUpdateTask(): void
}

const AddTaskDialog = (props: Props) => {
    const { onCloseAddTaskDialog, isShowTaskDialog, onChangeText, taskUi, onAddTask, onUpdateTask } = props

    return (
        <DialogRoot
            open={isShowTaskDialog}
            onOpenChange={onCloseAddTaskDialog}
        >
            <DialogContent bg={BG_DARK_GRAY}>
                <DialogHeader  >
                    <DialogTitle>
                        {taskUi.title === "" ? "Adicionar nova tarefa" : "Editar tarefa"}
                    </DialogTitle>
                </DialogHeader>
                <DialogBody>

                    <Box>
                        <InputText
                            title={"Título"}
                            value={taskUi.title}
                            name={"title"}
                            placeholder={"Título"}
                            onChangeText={onChangeText} isTextarea={false}
                        />
                        <InputText
                            title={"Descrição"}
                            value={taskUi.description}
                            name={"description"}
                            placeholder={"Descrição"}
                            onChangeText={onChangeText}
                            isTextarea={true}
                        />

                    </Box>
                </DialogBody>

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={onCloseAddTaskDialog}
                    >
                        Cancelar
                    </Button>

                    <Button
                        bg={APP_COLOR}
                        color={"#fff"}
                        loading={taskUi.addLoading}
                        onClick={
                            ()=>{
                                if(taskUi.isUpDate){
                                    onUpdateTask()
                                }else{
                                    onAddTask()
                                }
                            }
                        }
                    >
                        Salvar
                    </Button>
                </DialogFooter>
                <DialogCloseTrigger />

            </DialogContent>
        </DialogRoot>
    );
};

export default AddTaskDialog;