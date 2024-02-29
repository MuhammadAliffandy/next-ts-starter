"use client"

import { Container , Box , TextField ,Typography , Button} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { fetchCarsId , updateCars } from "@/app/api/repository/carRepository";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const CarsUpdatePage = () => {
    const [carName , setCarName] = useState('')
    const [description , setDescription] = useState('')
    const [msg , setMsg] = useState('')
    const carId = useSelector((state: any) => state.car.value);

    const notify = () => {
        toast.success('Update Berhasil')
    }

    const handleCarById = async () => {
        const res = await fetchCarsId(carId)
        setCarName(res[0].manufacture)
    }

    const handleChangeDescription = (event: any)=>{
        setDescription(event.target.value)
    }

    const handleUpdateCar = async () => {

        const data = {
            description : description
        }
        const res = await updateCars(carId , data);
        setMsg(res.message)

        notify();

    }
    
    useEffect(()=>{
        handleCarById();
    })


    return (
        <>
            <Container fixed sx={{
                backgroundColor : 'black',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh'
            }}>
                <Box sx={{ 
                    backgroundColor : 'white',
                    padding: '10px'
                }} >
                    <Typography variant="h5" sx={{ color : 'black' }}>
                        Update Cars 
                    </Typography>
                    <Box >

                        <TextField sx={{
                            width : '100%',
                            padding : '10px 0px 10px 0px'
                        }}  id="outlined-basic" label="Description" placeholder={`Mobil ${carName}`} variant="outlined" 
                            onChange={handleChangeDescription} 
                            value={description}
                        />
                        <Button variant="contained" sx={{
                            color: 'white' ,
                            background : 'blue'
                        }} disableRipple 
                        onClick={handleUpdateCar}
                        >Update data Mobil</Button>
                    </Box>
                </Box>
                <ToastContainer/>
            </Container>
        </>
    )
}

export default CarsUpdatePage;