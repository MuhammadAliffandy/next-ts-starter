import { TextField } from "@mui/material";

interface TextFieldProps {
    id : string,
    label? : string;
    type: string;
    className?: string;
    placeholder:string;
    register?: any;
    error?:any;
    helperText : any;
    disabled?: boolean;
    value?: string;
    sx?:any ;
    onChange?: (data:any)=>void
}


const AppTextField: React.FC<TextFieldProps> = (props) => {
    return(
        <TextField
            className={`${props.className || 'w-[100%]'}`}
            id={props.id}
            label={props.label}
            value= {props.value}
            type={props.type}
            placeholder={props.placeholder}
            {...props.register}
            error={props.error}
            disabled={props.disabled || false}
            helperText={props.helperText}
            onChange={props.onChange}
            sx={props.sx}
        />
    )
}

export default AppTextField;