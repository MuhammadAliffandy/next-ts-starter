'use client'

import { Box, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import AppButton from "../molecules/AppButton";
import AppTextField from "../molecules/AppTextField";
import AppTextButton from "../molecules/AppTextButton";

interface AppLoginFormProps {
    onSubmit: (data: any) => void;
    buttonText?: string;
    textButtonLabel?: string;
    onClick: () => void;
}

const AppLoginForm: React.FC<AppLoginFormProps> = (props) => {
    const dispatch = useDispatch();
    const { loading, success, error } = useSelector((state: RootState) => state.authUser);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        defaultValues: {
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
            marginTop={'20px'}
            gap={2}
            sx={{
                width: "100%",
                maxWidth: 400, 
                mx: "auto", 
                p: 2, 
                bgcolor: "white", 
                borderRadius: 2 
            }}
        >
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

            {loading && <Typography color="blue">Logging in...</Typography>}
            {success && <Typography color="green">Login successful!</Typography>}
            {error && <Typography color="red">{error}</Typography>}

            <AppButton label={props.buttonText || "Login"} type="submit" />
            <AppTextButton label={props.textButtonLabel || "Don't have an account? Register"} onClick={props.onClick} />
        </Box>
    );
};

export default AppLoginForm;
