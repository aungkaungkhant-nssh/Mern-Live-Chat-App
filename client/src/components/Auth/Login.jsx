import React,{useState} from 'react'
import  {Box, Divider,Button, Stack, TextField, Typography} from '@mui/material'
import PasswordField from '../../util/PasswordField';
function Login() {
  const [showPassword,setShowPassword] =useState(false);
  const [password,setPassword] = useState("");
  const [email,setEmail] = useState("");
  const userLogin = (e)=>{
    e.preventDefault();
    console.log(email , password)
  }
  return (
    <Stack  sx={{marginTop:".4rem"}}>
        <Box sx={{width:"100%"}} display="flex" justifyContent="center" alignItems="center"
        width="100%">
            <form onSubmit={userLogin}>
                <Typography component="div" sx={{marginBottom:"15px"}}>
                         <TextField required type="email" value={email} onChange={(e)=>setEmail(e.target.value)} color="secondary" size='small' label="Email" sx={{width:"300px"}}/>
                </Typography>
                <Typography component="div" sx={{marginBottom:"15px"}}>
                <PasswordField showPassword={showPassword} setShowPassword={setShowPassword} password={password} setPassword={setPassword} />
                </Typography >
                <Button type="submit" variant="contained" color="secondary" sx={{width:"300px"}}>Login</Button>
            </form>
        </Box>
    </Stack>
  )
}

export default Login