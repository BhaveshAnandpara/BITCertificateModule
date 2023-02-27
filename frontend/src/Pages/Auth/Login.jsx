import React from 'react'
import { Button, Stack, TextField } from '@mui/material'
import loginField from '../../theme/InputFields'


export default function Login() {
    return (

        <Stack sx={{ height : '100vh' }}  direction={'column'} border='1px solid black ' alignItems={'center'} justifyContent={'center'} >

            <h1 sx={{ fontSize: '18px' }} > Login </h1>

            <Stack direction={'column'} sx={{ width: '100%' , margin : '30px 0px' }} alignItems="center"  >
                <TextField style={loginField} id="outlined-basic" label="UserId" variant="outlined" placeholder='Enter UserId' />
                <TextField style={loginField} type='password' id="outlined-basic" label="Password" variant="outlined" placeholder='Enter Password' />
            </Stack>

            <Button variant="contained" sx={{ padding: '15px 0px' }} style={loginField} disableElevation> Login </Button>

        </Stack>

    )
}
