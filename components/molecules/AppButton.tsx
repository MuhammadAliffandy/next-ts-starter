import Button from '@mui/material/Button';
import { useTheme } from '@mui/material';


interface ButtonProps {
    label: string;
    color?: any;
    type?: any;
    className? : string;
    disabled?: boolean | undefined;
    sx?:any;
    onClick?: () => void;
}

const AppButton: React.FC<ButtonProps> = (props) => {
    const theme = useTheme();
    return (
        <Button 
            className={ props.className || ` !text-white !py-[12px] !w-[100%]`}
            
            type={props.type}
            onClick={props.onClick}
            sx={props.sx || { backgroundColor: theme.palette.primary.main }}
            disabled={props.disabled}
        >
            {props.label}
            
        </Button>
    );
};

export default AppButton;
