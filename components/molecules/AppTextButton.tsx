import Button from '@mui/material/Button';


interface TextButtonProps {
    label: string;
    className?: string;
    onClick: () => void;
}

const AppTextButton: React.FC<TextButtonProps> = (props) => {
    return (
        <Button variant='text' className={  props.className || ` !text-black `} onClick={props.onClick}>
            {props.label}
        </Button>
    );
};

export default AppTextButton;
