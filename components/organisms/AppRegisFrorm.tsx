'use client'

import { Box, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import AppButton from "../molecules/AppButton";
import AppTextField from "../molecules/AppTextField";
import AppTextButton from "../molecules/AppTextButton";

interface AppRegisFormProps {
    onSubmit: (data: any) => void;
    buttonText?: string;
    textButtonLabel?: string;
    onClick: () => void;
}

const AppRegisForm: React.FC<AppRegisFormProps> = (props) => {
    const dispatch = useDispatch();
    const { loading, success, error } = useSelector((state: RootState) => state.authUser);

    const {
        register,
        handleSubmit,
        formState: { errors },

    } = useForm({
        defaultValues: {
            name: "",
            address: "",
            email: "",
            password: ""
        }
    });


    return (
        <Box
            component="form"
            onSubmit={handleSubmit(props.onSubmit)}
            display="flex"
            flexDirection="column"
            gap={2}
            marginTop={'20px'}
            sx={{
                width: "100%",
                maxWidth: 400,
                mx: "auto",
                p: 3,
                bgcolor: "white",
                borderRadius: 2
            }}
        >
            <AppTextField
                id="name"
                label="Name"
                type="text"
                placeholder="Enter your name"
                register={register("name", { required: "Name is required" })}
                error={!!errors.name}
                helperText={errors.name?.message}
            />
            <AppTextField
                id="address"
                label="Address"
                type="text"
                placeholder="Enter your address"
                register={register("address", { required: "Address is required" })}
                error={!!errors.address}
                helperText={errors.address?.message}
            />
            <AppTextField
                id="email"
                label="Email"
                type="email"
                placeholder="Enter your email"
                register={register("email", { required: "Email is required" })}
                error={!!errors.email}
                helperText={errors.email?.message}
            />
            <AppTextField
                id="password"
                label="Password"
                type="password"
                placeholder="Enter your password"
                register={register("password", { required: "Password is required" })}
                error={!!errors.password}
                helperText={errors.password?.message}
            />

            {loading && <Typography color="blue">Registering...</Typography>}
            {success && <Typography color="green">Registration successful!</Typography>}
            {error && <Typography color="red">{error}</Typography>}

            <AppButton label={props.buttonText || "Register"} type="submit" />
            <AppTextButton label={props.textButtonLabel || "Already have an account? Login"} onClick={props.onClick} />
        </Box>
    );
};

export default AppRegisForm;
