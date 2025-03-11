'use client'

import { useRouter } from "next/navigation";
import AppContainerTemplate from "@//components/organisms/AppContainerTemplate";
import AppLoginForm from "@//components/organisms/AppLoginForm";
import AppFirebase from '../../../../../lib/firebaseConfig'
import { useDispatch } from 'react-redux';
import { setToken } from '../../../../../redux/slices/authSlice';
import { resetUpdateState, setError, setLoading, setSuccess } from "@/redux/slices/authUserSlice";

const AppLoginPage = () => {

    const { push } = useRouter();
    const dispatch = useDispatch();


    const handleLogin = async (data: { email: string; password: string }) => {
        dispatch(resetUpdateState());
        dispatch(setLoading())
        
        try {
            const userCredential = await AppFirebase.signInWithEmailAndPassword( AppFirebase.auth, data.email, data.password);
            const userToken  = await userCredential.user.getIdToken();
            
            dispatch(setToken(userToken))
            dispatch(setSuccess())
            push('/dashboard')
            dispatch(resetUpdateState());
        } catch (error) {
            dispatch(setError((error as Error).message))
        }
    };

    const handleRoute = () => push('/auth/registration')

    return (
        <AppContainerTemplate title="Welcome Back" subtitle="Please enter your credentials">
            <AppLoginForm onSubmit={handleLogin} buttonText="Login"  onClick={handleRoute} />
        </AppContainerTemplate>
    );
};

export default AppLoginPage;
