import { FormControl , InputLabel , Select} from '@mui/material'
import React from 'react';

const DropDown = ({label , value ,onChange , menuItem}:any) : React.ReactNode => {
    return(
        <>
            <FormControl size='small' className='w-[20%]'>
                <InputLabel id="dropdown-label">{label}</InputLabel>
                <Select
                    labelId="dropdown-label"
                    id="dropdown"
                    value={value}
                    label={label}
                    onChange={onChange}
                >
                    {
                        menuItem
                    }
                </Select>
                </FormControl>
        </>
    )
}

export default DropDown;