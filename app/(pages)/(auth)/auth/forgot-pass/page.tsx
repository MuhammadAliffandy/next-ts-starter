'use client'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import CustomSpacing from '@/app/components/customSpacing';
import { useForm , SubmitHandler} from 'react-hook-form';
import { useRouter } from 'next/navigation';

const ForgotPasswordPage = () => {

    const { push } = useRouter()

    type forgotPassData = {
        email : string;
    }

    const { register, handleSubmit, formState: { errors } } = useForm<forgotPassData>();
    
    const onSubmit : SubmitHandler<forgotPassData> = (data ) => {
        console.log(data);
        return data;
    };

    return(
        <Container className='bg-red-500'>
            <Box className = 'bg-white flex flex-col items-center shadow-xl rounded-sm p-[10px]'>
                <Typography className='text-[20px] text-black'>
                    Login
                </Typography>
                <CustomSpacing height = {10} />
                    <form onSubmit={handleSubmit(onSubmit)}  className='flex flex-col gap-[20px] w-[100%]'>
                        <TextField
                            className=' w-[100%]'
                            id="email"
                            label="Email"
                            placeholder='Email'
                            {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/, message: 'Invalid email address' } })}
                            error={Boolean(errors.email)}
                            helperText={errors.email && errors.email.message}
                            />
                        <CustomSpacing height = {20} /> 
                        <Button type='submit' variant="contained" className='w-[100%]'>
                            kirim 
                        </Button>
                        <Typography  onClick = {()=>{push('/auth/signin')}}  className='text-black cursor-pointer'>belum punya akun</Typography>
                    </form>
            </Box>
        </Container>
    )
}

export default ForgotPasswordPage;