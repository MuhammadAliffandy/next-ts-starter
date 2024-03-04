"use client"

import { Container , Box , TextField, Stack, Button , MenuItem, Typography , Divider} from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import BasicCard from "./component/card";
import { fetchCars } from "@/app/api/repository/carRepository";
import { setCarsId } from "@/app/redux/slices/carSlice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { CarApiData } from "@/app/utils/types";
import { formattedDate } from "@/app/utils/helper";
import DropDown from "./component/dropDown";
import CustomSpacing from "./component/customSpacing";
import { CardLoader } from "./component/loader/carsdLoader";


const CarsList = () => {

    const [cars , setCars ] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter();
    const dispatch = useDispatch()

    const handleGetCars = async () : Promise<void> => {
        const res = await fetchCars();
        setCars(res)
        setIsLoading(false)
    }

    useEffect(()=>{
        handleGetCars()
    },cars)

    return(
            <Container fixed className='bg-white p-[30px]'>
                {/*  */}
                <Box className = 'flex gap-[10px] h-[40px]'>
                    <DropDown
                        label={'Status'}
                        menuItem= {
                            <>
                                <MenuItem value={'Tersedia'}>Tersedia</MenuItem>
                                <MenuItem value={'Kosong'}>Kosong</MenuItem>
                            </>
                        }
                    />
                    <TextField label="Search Car..." size="small" className="w-[100%]" />
                    <Button variant='contained' className="bg-blue-500 " ><FontAwesomeIcon icon={faSearch} /></Button>
                </Box>
                {/* container car list */}
                <Box>
                    <CustomSpacing height = {20}/>
                    <Stack direction={'row'} spacing={0.5}  >
                        <Typography className = 'text-[12px] text-black font-poppins '>Terdapat</Typography>
                        <Typography className = 'text-[12px] text-blue-800 font-bold font-poppins '>{cars.length}</Typography>
                        <Typography className = 'text-[12px] text-black font-poppins '>data ditemukan</Typography>

                    </Stack>

                    <CustomSpacing height = {10}/>

                    <Box 
                        sx = {{display : 'flex' , flexDirection : 'column' , gap: '30px' ,}} 
                    >
                        {
                            isLoading ? 

                            <>
                                <CardLoader/> 
                                <CardLoader/> 
                                <CardLoader/> 
                                <CardLoader/> 
                                <CardLoader/> 

                            </> :

                            cars.map((data : CarApiData)=>{
                                return (

                                    <BasicCard
                                        key = {data.id}
                                        image = {`/${data.image.split('./').join('')}`}
                                        title={data.manufacture}
                                        available={data.available}
                                        availableAt={formattedDate(data.availableAt)}
                                        description={data.description}
                                        onClickUp={() => {
                                            dispatch(setCarsId(data.id))
                                            router.push('/example/update')
                                        }}
                                        onClickDel={()=>{console.log('del')}}
                                    />
                                )
                            })
                        }
                    </Box>
                </Box>
            </Container>
        
    )
}



export default CarsList;


