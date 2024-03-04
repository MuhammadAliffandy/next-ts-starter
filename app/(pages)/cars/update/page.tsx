"use client"

import { Container , Box , TextField ,Typography , Button} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { fetchCarsId , updateCars } from "@/app/api/repository/carRepository";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons'
import CustomSpacing from "../component/customSpacing";
import { useRouter } from "next/navigation";
import UpdateModal from "./component/updateModal";

const CarsUpdatePage = () => {
    const [carName , setCarName] = useState('')
    const [description , setDescription] = useState('')
    const [capacity , setCapacity] = useState('')
    const [rentPerDay , setRentPerDay] = useState('')
    const [msg , setMsg] = useState('')
    const carId = useSelector((state: any) => state.car.value);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { push } = useRouter();

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
    const handleChangeRentPerDay = (event: any)=>{
        setRentPerDay(event.target.value)
    }
    const handleChangeCapacity = (event: any)=>{
        setCapacity(event.target.value)
    }

    const handleUpdateCar = async () => {

        const data = {
            capacity : capacity,
            rentPerDay : rentPerDay ,
            description : description 
        }

        const removeEmptyValues = (jsonObject : any) =>  {
            for (let key in jsonObject) {
                if (jsonObject[key] === '') {
                    delete jsonObject[key];
                }
            }
            return jsonObject;
        }
        
        const dataJSON = removeEmptyValues(data);

        handleOpen()
        const res = await updateCars(carId , dataJSON);
        setMsg(res.message)
        handleClose()
        notify();

    }
    
    useEffect(()=>{
        handleCarById();
    })


    return (
        <>
            <Container fixed sx={{
                backgroundColor : 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh'
            }}>
                <Box className= 'bg-white p-[30px] rounded-lg w-[70%] shadow-xl ' >
                    <Box className = 'flex justify-between'>
                        <Button onClick={() => { push('/cars') }} className="bg-transparent text-CUSTOM-GREY text-[20px]" ><FontAwesomeIcon icon = {faArrowLeftLong} /></Button>
                        <Typography variant="h5" className = 'text-CUSTOM-GREY font-poppins'>
                            Update Cars 
                        </Typography>
                    </Box>
                    <CustomSpacing height = {20}/>
                    <Box className = 'flex flex-col items-center'>

                        <TextField sx={{
                            width : '100%',
                            padding : '10px 0px 10px 0px'
                        }}  id="outlined-basic" label="Description" placeholder={`Mobil ${carName}`} variant="outlined" 
                            onChange={handleChangeDescription} 
                            value={description}
                        />
                        <TextField sx={{
                            width : '100%',
                            padding : '10px 0px 10px 0px'
                        }}  id="outlined-basic" label="Capacity" placeholder={`Mobil ${carName}`} variant="outlined" 
                            onChange={handleChangeCapacity} 
                            value={capacity}
                        />
                        <TextField sx={{
                            width : '100%',
                            padding : '10px 0px 10px 0px'
                        }}  id="outlined-basic" label="Rent Per Day" placeholder={`Mobil ${carName}`} variant="outlined" 
                            onChange={handleChangeRentPerDay} 
                            value={rentPerDay}
                        />
                        <CustomSpacing height = {20}/>
                        <Button variant="contained" className="bg-blue-300 h-[40px] w-[80%] "
                        onClick={handleUpdateCar}
                        >Update</Button>
                    </Box>
                </Box>
                <ToastContainer/>
            </Container>
            <UpdateModal
                open = {open}
            />
        </>
    )
}

export default CarsUpdatePage;