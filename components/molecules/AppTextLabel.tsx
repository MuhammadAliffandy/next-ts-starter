import { Typography, Box } from "@mui/material";

interface AppTextLabelProps {
    title? : React.ReactNode;
    subtitle?: React.ReactNode;
    titleStyle? : string;
    subtitleStyle?: string;
}

const AppTextLabel: React.FC<AppTextLabelProps> = (props) => {
    return(
        <>
        <Box borderBottom={'1px solid black '} >
            <Typography 
                margin={'0px'}
                className={props.titleStyle || 'text-black !text-[14px] '} 
            >
                {props.title as String ?? ''}
            </Typography>
                <Typography 
                    className={props.subtitleStyle || 'text-black !text-[18px] !font-semibold'} 
                >
                    {props.subtitle as String ?? ''}
                </Typography>
            </Box>
        </>
    )
}

export default AppTextLabel;