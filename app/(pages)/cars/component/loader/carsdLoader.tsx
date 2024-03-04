import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Image from 'next/image';

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export const CardLoader =  () =>  {
    return (
        <Card 
            className=' flex items-center justify-between shadow-md min-w-[100] border-[2px] border-transparent rounded-[10px] hover:border-[2px] hover:border-indigo-500'
        >
            
            <Box sx={{display : 'flex' , gap: '10px'}}>
                <Box style={{ width: '150px', height: '150px' }}>
                        <Skeleton width={150} height={140}/>
                </Box>

                <CardContent>
                    <Box className = 'flex gap-[10px] items-center'>
                        <Skeleton width={150} height={10} />
                        <Skeleton width={150} height={10}/>
                        <Skeleton width={150} height={10} />
                    </Box>
                    <Typography variant="body1" className='w-[80%]' >
                        <Skeleton  height={10}/>
                        <Skeleton  height={10}/>
                    </Typography>
                </CardContent>
            </Box>

            <Box sx={{ display : 'flex' , flexDirection: 'column' , gap : '10px' ,  paddingRight : '10px'}}>
                <Skeleton width={100} />
                <Skeleton width={100} />
            </Box>

        </Card>
    );  
}
