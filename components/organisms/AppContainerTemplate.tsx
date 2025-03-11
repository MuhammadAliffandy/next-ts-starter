import { Box, Typography } from "@mui/material";

interface AppContainerTemplateProps {
    title: string;
    subtitle?: string;
    flexDirection?: any ;
    aligntItems?: any;
    justifyContent?: any;
    color?: string;
    height? :string;
    width?:string;
    margin?:string;
    alignItemsContainer? : any;
    marginContainer?: any;
    children: React.ReactNode;
}

const AppContainerTemplate: React.FC<AppContainerTemplateProps> = (props) => {
    return (
        <Box
            display="flex"
            flexDirection={ "column"  }
            alignItems={ props.alignItemsContainer || 'center' }
            justifyContent="center"
            minHeight="100vh"
            margin={props.marginContainer}
        >
            <Typography variant="h4" fontWeight="bold" color="black" >
                {props.title || ''} 
            </Typography>
            {props.subtitle && <Typography variant="subtitle1" color="black">{props.subtitle}</Typography>}

            <Box 
                width={ props.width || "100%" } 
                maxWidth="100vw" 
                height={props.height}
                margin={props.margin}
                display={'flex'}
                flexDirection={ props.flexDirection || "column"  }
                alignItems= { props.aligntItems || "center" }
                justifyContent= { props.justifyContent || "center" }
                gap={2}
                flexWrap={'wrap'}
                color={props.color}
                >
                {props.children as String || ''}
            </Box>
        </Box>
    );
};

export default AppContainerTemplate;
