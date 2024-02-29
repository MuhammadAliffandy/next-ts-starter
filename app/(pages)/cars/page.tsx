"use client"

import { Container , Box} from "@mui/material";
import BasicCard from "./component/card";
import { fetchCars } from "@/app/api/repository/carRepository";
import { setCarsId } from "@/app/redux/slices/carSlice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { CarApiData } from "@/app/utils/types";
import { formattedDate } from "@/app/utils/helper";

const CarsList = () => {

    const [cars , setCars ] = useState([]);
    const router = useRouter();
    const dispatch = useDispatch()

    const handleGetCars = async () : Promise<void> => {
        const res = await fetchCars();
        setCars(res)
    }

    useEffect(()=>{
        handleGetCars()
    },cars)

    return(
        <>
            <Container fixed style={{backgroundColor : 'white' , }}>
                <Box 
                    sx = {{display : 'flex' , flexDirection : 'column' , gap: '20px' , padding : '10px 0px 10px 0px',}} 
                >
                    {
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
                                        router.push('/cars/update')
                                    }}
                                    onClickDel={()=>{console.log('del')}}
                                />
                            )
                        })
                    }
                </Box>
            </Container>
        </>
    )
}



export default CarsList;


