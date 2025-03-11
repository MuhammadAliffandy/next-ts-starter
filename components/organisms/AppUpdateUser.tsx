'use client'

import { Box, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import AppButton from "../molecules/AppButton";
import AppTextField from "../molecules/AppTextField";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface AppUpdateUserProps {
    idData: string;
    name: string;
    address: string;
    email: string;
    flexDirection?: any;
    alignItems?: any;
    justifyContent?: any;
    onSubmit: (data: any) => void;
}

const AppUpdateUser: React.FC<AppUpdateUserProps> = (props) => {
    const [disabled, setDisabled] = useState(true);
    const [isUpdated, setIsUpdated] = useState(false);
    
    const { loading, success, error } = useSelector((state: RootState) => 
        state.updateUser[props.idData] || { loading: false, success: false, error: null }
    );

    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        defaultValues: {
            name: props.name,
            address: props.address,
            email: props.email
        }
    });

    useEffect(() => {
        setValue("name", props.name);
        setValue("address", props.address);
        setValue("email", props.email);
    }, [props.name, props.address, props.email, setValue]);

    const handleSaveButton = handleSubmit((data) => {
        setDisabled(true);
        setIsUpdated(false);
        props.onSubmit({ id: props.idData, ...data });
    });

    const handleCancelButton = () => {
        setIsUpdated(false);
        setDisabled(true);
    };

    const handleUpdateButton = () => {
        setIsUpdated(true);
        setDisabled(false);
    };

    return (
        <Box 
            component="form" 
            onSubmit={handleSaveButton} 
            display="flex" 
            flexDirection={{
                xs:"column",
                sm:'column',
                md:"row",
            }}
            flexWrap="nowrap" 
            gap={2} 
            justifyContent={props.justifyContent || "center"} 
            alignItems={props.alignItems || "center"}
            width="100%"
            maxWidth={'50vw'}
        >
            <AppTextField
                id="name"
                type="text"
                placeholder="Enter your name"
                register={register("name", { required: "Name is required" })}
                error={!!errors.name}
                helperText={errors.name?.message}
                disabled={disabled}
                sx={{ flexGrow: 1, minWidth: "150px" }} // Supaya fleksibel
            />

            <AppTextField
                id="address"
                type="text"
                placeholder="Enter your address"
                register={register("address", { required: "Address is required" })}
                error={!!errors.address}
                helperText={errors.address?.message}
                disabled={disabled}
                sx={{ flexGrow: 1, minWidth: "150px" }} // Supaya fleksibel
            />

            {isUpdated ? (
                <>
                    <AppButton 
                        className="!bg-purple-500 !text-white"
                        label="Save"
                        type="submit"
                        disabled={loading}
                        sx={{ flexGrow: 1, minWidth: "100px" }}
                    />
                    <AppButton 
                        className="!bg-red-500 !text-white" 
                        label="Cancel"
                        type="button" 
                        onClick={handleCancelButton} 
                        sx={{ flexGrow: 1, minWidth: "100px" }}
                    />
                </>
            ) : (
                <AppButton 
                    className={`!bg-purple-500 !text-white ${loading ? "!opacity-50" : ""}`}
                    label={loading ? "Updating..." : success ? "Update Success" : error ? "Error" : "Update"}
                    type="button" 
                    onClick={handleUpdateButton} 
                    disabled={loading} 
                    sx={{ flexGrow: 1, minWidth: "100px" }}
                />
            )}

            {error && (
                <Typography color="error" fontSize="14px">
                    {error}
                </Typography>
            )}
        </Box>
    );
};

export default AppUpdateUser;
