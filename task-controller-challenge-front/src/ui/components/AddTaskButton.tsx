import { APP_COLOR } from "@/utils/colors";
import { Button, Flex } from "@chakra-ui/react";


interface Props{
    onClick: ()=>void
}

export default function AddTaskButton(props:Props): JSX.Element {
    const {onClick} = props
    return (
        <Flex
            justify="flex-end"
            align="right"
            w={"100%"}
            padding={10}
        >
            <Button
                color="#fff"
                bg={APP_COLOR}
                px={6}
                h={43}
                borderRadius={10}
                onClick={onClick}
            >
                + Adicionar nova tarefa
            </Button>
        </Flex>
    )
}
