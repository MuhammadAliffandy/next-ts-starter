'use client'

import { Box , Typography} from "@mui/material";
import { useForm } from "react-hook-form";
import { useState } from "react";
import AppButton from "../molecules/AppButton";
import AppTextField from "../molecules/AppTextField";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useDispatch } from "react-redux";
import { resetUpdateState } from "@/redux/slices/updateUserSlice";

interface AppUserCardProps {
    idData?: string ;
    name: string;
    address: string;
    email:string;
    onSubmit: (data: any) => void;
}

const AppUserCard: React.FC<AppUserCardProps> = (props) => {

    const dispatch = useDispatch()
    const [disabled, setDisabled] = useState(true);    
    const [isUpdated, setIsUpdated] = useState(false);    
    const { loading, success, error } = useSelector((state: RootState) => state.updateUser[props.idData as string] || { loading: false, success: false, error: null });

    const [formData, setFormData] = useState({
        name: props.name || "",
        address: props.address || "",
        email: props.email || ""
    });
    
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const handleSaveButton = handleSubmit((data)=>{
        setDisabled(!disabled)
        setIsUpdated(false)
        props.onSubmit({id: props.idData,...data})
    })

    const handleCancelButton = ()=>{
        setIsUpdated(false)
        setDisabled(true)
        dispatch(resetUpdateState(props.idData as string));
    }
    
    const handleUpdateButton = ()=>{
        setIsUpdated(true) 
        setDisabled(false)
    }

    return (
        <Box component="form" onSubmit={handleSaveButton} 
            display="flex" 
            flexDirection="column" 
            gap={2} 
            padding={'20px'} 
            borderRadius={'10px'}
            border={'2px solid rgba(0, 0, 0, 0.20)'}
            color={'blue'}
            >
            <AppTextField
                id="name"
                value={formData.name}
                type="text"
                placeholder="Enter your name"
                register={register("name", { required: "Name is required" })}
                error={!!errors.name}
                helperText={errors.name?.message}
                disabled={disabled}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <AppTextField
                id="address"
                value={formData.address}
                type="Address"
                placeholder="Enter your address"
                register={register("address", { required: "Address is required" })}
                error={!!errors.address}
                helperText={errors.address?.message}
                disabled={disabled}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />

            {loading && <Typography color="blue">Updating...</Typography>}
            {success && <Typography color="green">Update successful!</Typography>}
            {error && <Typography color="red">{error}</Typography>}

            {
            
            isUpdated ?

                <>
                    <AppButton className="!bg-blue-500 !text-white " label={'Save'} type="submit" />
                    <AppButton className="!bg-red-500 !text-white" label={'Cancel'} type="button" onClick={handleCancelButton} />
                </>

                    :
                    <AppButton className="!bg-blue-500 !text-white "   label={'Update'} type="button" onClick={handleUpdateButton} />

                }
            </Box>
        );
};

export default AppUserCard;
