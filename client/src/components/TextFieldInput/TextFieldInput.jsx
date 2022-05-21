import React from 'react'
import { TextField } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";



const TextFieldInput = (props) => {
    
    return(
        <>
         <Controller
            control={control}
            name={props.name}
            render={({ field: { onChange, onBlur, value, ref } }) => (
            <TextField
                onChange={onChange}
                onBlur={onBlur}
                selected={value}
            />
            )}
        />
        </>
    )
}


export default TextFieldInput