'use client'
import { useRouter } from "next/navigation";
import AppContainerTemplate from "@//components/organisms/AppContainerTemplate";
import AppRegisForm from "@//components/organisms/AppRegisFrorm";
import AppFirebase from '../../../../../lib/firebaseConfig'
import { createUser } from "@/api/repository/usersRepository";
import { User } from "@my-monorepo/types";
import { useDispatch } from 'react-redux';
import { resetUpdateState, setError, setLoading, setSuccess } from "@/redux/slices/authUserSlice";
import { setToken } from "@/redux/slices/authSlice";

const AppRegisPage = () => {

    const { push } = useRouter()
    const dispatch = useDispatch();

    const handleRegistration = async (payload: User) => {
        dispatch(setLoading())
        try {
            const userCredentials = await AppFirebase.createUserWithEmailAndPassword( AppFirebase.auth, payload.email, payload.password!);
            const userToken = await userCredentials.user.getIdToken()
            dispatch(setToken(userToken))
            
            if(userToken){
                const res = await createUser({ ...payload, password: payload.password ?? "" }, userToken);
                if(res.status == 201 ){
                    push('/dashboard')
                    dispatch(setSuccess())
                    dispatch(resetUpdateState());
                }else{
                    dispatch(setError((res.data.data.message)))
                }
            }
        } catch (error) {
            dispatch(setError((error as Error).message))
        }
    };

    const handleRoute = () => push('/auth/login')

    return (
        <AppContainerTemplate title="Hello, Welcome" subtitle="Please enter your profile list">
            <AppRegisForm onSubmit={handleRegistration}  onClick={handleRoute} />
        </AppContainerTemplate>
    );
};

export default AppRegisPage;
