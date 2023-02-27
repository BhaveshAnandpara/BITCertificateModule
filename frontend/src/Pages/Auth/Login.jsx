import React from 'react'
import { Button, Stack, TextField } from '@mui/material'

import loginField from '../../theme/InputFields'

import { useState } from 'react'
import POST_METHOD from '../../ApiFunctions'

export default function Login() {

    const [userId, setUserId] = useState(null)
    const [password, setPassword] = useState(null)

    const loginHandler = () => {

        if (userId === null) alert('Enter UserId')

        let path = ""
        const data = { userId, password }

        if (!userId.includes('bitwardha.ac.in')) path = 'student/studentLogin'

        POST_METHOD(path , data).then((result) => {
            alert(result.msg)
        }).catch((e) => { console.log(e); })


    }

    return (

        <Stack sx={{ height: '100vh' }} direction={'column'} border='1px solid black ' alignItems={'center'} justifyContent={'center'} >

            <h1 sx={{ fontSize: '18px' }} > Login </h1>

            <Stack direction={'column'} sx={{ width: '100%', margin: '30px 0px' }} alignItems="center"  >
                <TextField onChange={(e) => { setUserId(e.target.value) }} style={loginField} id="outlined-basic" label="UserId" variant="outlined" placeholder='Enter UserId' />
                <TextField onChange={(e) => { setPassword(e.target.value) }} style={loginField} type='password' id="outlined-basic" label="Password" variant="outlined" placeholder='Enter Password' />
            </Stack>

            <Button onClick={() => { loginHandler() }} variant="contained" sx={{ padding: '15px 0px' }} style={loginField} disableElevation> Login </Button>

        </Stack>

    )
}
