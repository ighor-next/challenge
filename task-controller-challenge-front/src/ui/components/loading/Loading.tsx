import { Box, Spinner, Text } from "@chakra-ui/react"
import { APP_COLOR } from "@/utils/colors"


export default function LoadingComponent() {
    return (
        <Box
            textAlign="center"
            p={5}
            flex={1}
            justifyContent={"center"}
        >
            <Spinner size="lg" color={APP_COLOR} />
            <Text mt="10px"
                color={"#fff"}
            >Aguarde...</Text>
        </Box>
    )
}
