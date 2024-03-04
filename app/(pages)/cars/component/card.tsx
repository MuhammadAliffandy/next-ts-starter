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
import { motion } from 'framer-motion';


export default function BasicCard({
    title  , description , image , available , availableAt , onClickUp , onClickDel 
}: any) {
    return (
        <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            whileHover={{ scale: 1.03 }} 
            whileTap={{ scale: 1.0 }}
            transition={{ duration: 0.5 }}
            >
            <Card 
                className=' flex items-center justify-between shadow-md min-w-[100] border-[2px] border-transparent rounded-[10px] hover:border-[2px] hover:border-indigo-500 hover:shadow-xl'
            >       
                <Box sx={{display : 'flex' , gap: '10px'}}>
                    <Box style={{ width: '150px', height: '150px' }}>
                        <Box style={{ width: '100%', height: '100%', position: 'relative' }}>
                            <Image
                            src={image || <Skeleton  width={20} height={20} />}
                            layout="fill"
                            objectFit="cover"
                            alt="Gambar"
                            />
                        </Box>
                    </Box>

                    <CardContent>
                        <Box className = 'flex gap-[10px] items-center '>
                            <Typography variant="h3" component="div" className='m-0 p-0 text-CUSTOM-GREY'>
                                {title }  
                            </Typography>
                            <Chip label={available ? 'Tersedia' : 'Kosong'} className= { available ? 'bg-green-400 text-white' : 'bg-red-400 text-white'} />
                            <Chip label={availableAt}  />
                        </Box>
                        <Typography variant="body1" className='w-[80%] text-CUSTOM-GREY-LIGHT' >
                            {description}
                        </Typography>
                    </CardContent>
                </Box>

                <Box sx={{ display : 'flex' , flexDirection: 'column' , gap : '10px' ,  paddingRight : '10px'}}>
                    <Button variant='outlined' color='primary' onClick={onClickUp}  >Update</Button>
                    <Button variant='outlined' color='secondary' onClick= {onClickDel}  >Hapus</Button>
                </Box>

            </Card>
        </motion.div>
    );  
}
