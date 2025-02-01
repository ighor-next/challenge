import { DialogBody, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle } from "@/components/ui/dialog"
import { APP_COLOR} from "@/utils/colors"
import { Button } from "@chakra-ui/react"


interface Props {
	isOpen: boolean
	onClose: () => void,
	loading: boolean
	onDelete(): void
}

export default function DeleteTaskDialog(pros: Props): JSX.Element {

	const { isOpen, onClose, loading, onDelete } = pros

	return (
		<DialogRoot
			lazyMount
			open={isOpen}
			onOpenChange={(open) => {
				if (!open) {
					onClose();
				}
			}}
		>
			<DialogContent
				bgColor={"#333"}
			>
				<DialogBody padding={10}>
					<DialogHeader>
						<DialogTitle>
							Tem certeza de que deseja apagar esta tarefa?
						</DialogTitle>
					</DialogHeader>
				</DialogBody>
				<DialogFooter>
					<Button
						w={100}
						bg={"#000"}
						onClick={onClose}
						color={"#fff"}
					>Não</Button>
					<Button
						w={100}
						color={"#fff"}
						bg={APP_COLOR}
						loading={loading}
						loadingText="Aguarde..."
						onClick={onDelete}
					>Sim</Button>
				</DialogFooter>
			</DialogContent>

		</DialogRoot>
	)
}