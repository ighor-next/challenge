import { Box, Text } from '@chakra-ui/react'

export default function EmptyMessage(): JSX.Element {
	return (
		<Box
			textAlign="center"
			mt="20px"
			p={10}
			borderRadius="md"
			height={"100vh"}
		>
			<Text fontSize="lg" fontWeight="bold" color="#fff">
				Nada aqui ainda
			</Text>
			<Text mt="10px" color="#fff">
				Nenhuma tarefa disponível no momento.
			</Text>
		</Box>
	)
}