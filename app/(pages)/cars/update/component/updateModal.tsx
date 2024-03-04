import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CustomSpacing from '../../component/customSpacing';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'black',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    };

export default function UpdateModal(props : any ) {


    return (
        <>
        <Modal
            open={props.open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} className = 'flex flex-col items-center rounded-xl'>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Update
                </Typography>
                <CustomSpacing height = {20} />
                <Box className = 'flex flex-col items-center'>
                    <CircularProgress/>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Proses Update sedang di muat
                    </Typography>
                </Box>
            </Box>
        </Modal>
        </>
    );
}