import { FormErrorMessage, FormLabel, FormLabelProps, Input, InputProps } from "@chakra-ui/react"
import { FieldValues, FormState, UseFormRegister } from "react-hook-form"


type FormInputProps = {
    formLabelProps?: Omit<FormLabelProps, 'htmlFor'>
    inputProps?: Omit<InputProps, 'id'>
    useFormRegister?: UseFormRegister<FieldValues>
    formState?: FormState<FieldValues>
    name: string
    label?: string
}

export default function FormInput({
    formLabelProps,
    inputProps,
    name,
    label,
    useFormRegister,
    formState

}: FormInputProps) {
    const useFormRegiterFn = useFormRegister ? useFormRegister : () => { }


    return (
        <>
            {label &&
                <FormLabel m="0" htmlFor={name} {...formLabelProps}>{label}</FormLabel>
            }
            <Input id={name} {...inputProps} {...useFormRegiterFn(name)} />
            {formState && 
            <FormErrorMessage position="absolute" mt="2px">{formState.errors[name]?.message}</FormErrorMessage>}
        </>)
} 