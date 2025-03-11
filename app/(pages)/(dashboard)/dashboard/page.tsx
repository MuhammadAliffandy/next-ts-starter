'use client'

import AppContainerTemplate from "@//components/organisms/AppContainerTemplate";
import AppUpdateUser from "@//components/organisms/AppUpdateUser";
import { getAllUsers, getUser, updateUsers } from "@/api/repository/usersRepository";
import { useState , useEffect} from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { User } from "@my-monorepo/types";
import { useDispatch } from "react-redux";
import { resetUpdateState, setError, setLoading, setSuccess } from "@/redux/slices/updateUserSlice";
import AppFirebase from '../../../../lib/firebaseConfig'
import AppUserCard from "@/components/organisms/AppUserCard";
import AppCustomSpacing from "@/components/atoms/AppCustomSpacing";
import AppButton from "@/components/molecules/AppButton";
import { useRouter } from "next/navigation";
import { Typography } from "@mui/material";

const AppDashboardPage = () => {

    const dispatch = useDispatch()

    const { push }= useRouter()
    const userToken = useSelector((state: RootState) => state.auth.value )
    const [user, setUser] = useState<User[]>([])
    const [users, setUsers] = useState<User[]>([])

    const fetchUser = async () => {
        try {
            const res =  await getUser(userToken)

            if(res.status == 200){
                setUser(res.data.data)
            }else{
                console.log('error')
            }

        } catch (error) {
            console.log(error)
        }
    }

    const fetchUsers = async () => {
        try {
            const res =  await getAllUsers()

            if(res.status == 200){
                setUsers(res.data.data)
            }else{
                console.log('error')
            }
        } catch (error) {
            console.log(error)
        }
    }


    const updateUser = async (id: string,  payload: any) => {
        try {

            dispatch(setLoading(id))
            
            const res = await updateUsers(id, payload, userToken)
            if(res.status == 201){
                dispatch(setSuccess(id))
            }else{
                dispatch(setError(res.data.message))
            }
            dispatch(setSuccess(id))
            setTimeout(() => {
                dispatch(resetUpdateState(id));
            }, 3000);
        } catch (error) {
            dispatch(setError({id,error: (error as Error).message}))
        }
        
    }

    const handleSaveButton = (data: any) => {
        updateUser(user[0].id as string, data)
    };

    const handleSaveUsersButton = (data: any) => {
        updateUser( data.id, data)
    };

    const handleLogoutButton = () => {
        try {
            const Auth = AppFirebase.getAuth();
            AppFirebase.signOut(Auth)
        } catch (error) {
            return error;
        }finally{
            push('/auth/login')
        }
        
    }

    useEffect(() => {
        fetchUser()
    }, []);

    useEffect(() => {
        fetchUsers()
    }, []);

    return (
        <AppContainerTemplate title="" 
            flexDirection={'row'} 
            justifyContent={{       
                xs: 'center',  
                sm: 'center',  
                md: 'end'   
            }} 
            aligntItems={{       
                xs: 'center',  
                sm: 'center',  
                md: 'start'   
            }}
            alignItemsContainer={{       
                xs: 'center',  
                sm: 'center',  
                md: 'end'   
            }} 
            marginContainer={{       
                xs: '0px',  
                sm: '0px',  
                md: '20px 0px 10px 0px'   
            }} >
            {
                user.map(data => {
                    return(
                        <AppUpdateUser
                            idData={data.id || ''}
                            key={data.id}
                            name={ data.name || ''}
                            email={ data.email || ''}
                            address={data.address || ''}
                            onSubmit={handleSaveButton}
                        />
                    )
                })
            }
            <AppCustomSpacing  height={'100px'} />
            <AppContainerTemplate 
                title="Account List" 
                flexDirection={'row'} 
                aligntItems={'start'} 
                justifyContent={{       
                    xs: 'center',  
                    sm: 'center',  
                    md: 'end'   
                }}
                alignItemsContainer={{       
                    xs: 'center',  
                    sm: 'center',  
                    md: 'end'   
                }} 
                marginContainer="0px 15px 0px 0px">
                {
                users.length > 0 ?
                    users.map((data )=> {
                        return(
                            <AppUserCard
                                idData={data.id}
                                key={data.id}
                                name={ data.name || ''}
                                email={ data.email || ''}
                                address={data.address || ''}
                                onSubmit={handleSaveUsersButton}
                                />
                            )
                        }) 
                        : <Typography>Data is Empty</Typography>
                }
            </AppContainerTemplate>
            <AppButton className="!bg-red-500 !text-white "   label={'Logout'} type="button" onClick={handleLogoutButton} />
            <AppCustomSpacing  height={'100px'} />
        </AppContainerTemplate>
    )
}

export default AppDashboardPage;
