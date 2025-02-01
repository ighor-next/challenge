import { Box, Input, Text, Textarea } from "@chakra-ui/react";

type Props = {
    title: string
    value: string
    name: string
    placeholder: string
    isTextarea: boolean
    onChangeText(event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>): void
}

export default function InputText(props: Props): JSX.Element {
    const { title, value, onChangeText, name, placeholder, isTextarea } = props
    return (
        <Box>
            <Text fontWeight="medium" mb={2}>
                {title}
            </Text>
            {
                isTextarea ?
                    <Textarea
                        name={name}
                        placeholder={placeholder}
                        mb={2}
                        bg={"#111"}
                        value={value}
                        onChange={onChangeText}
                        height={200}
                    />
                    :
                    <Input
                        name={name}
                        placeholder={placeholder}
                        mb={4}
                        bg={"#111"}
                        value={value}
                        onChange={onChangeText}
                    />
            }

        </Box>
    )
}
