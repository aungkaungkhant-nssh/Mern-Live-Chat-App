import React,{useState} from 'react'
import  {Box, Divider,Button, Stack, TextField, Typography,InputAdornment,IconButton} from '@mui/material'
import PasswordField from '../../util/PasswordField';
function Register() {
  const [showPassword,setShowPassword] =useState(false);
  const [password,setPassword] = useState("");
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");

  const userRegister = (e)=>{
    e.preventDefault();
    console.log(name , email , password)
  }
  return (
    <Stack sx={{marginTop:".4rem"}}>
      <Box sx={{width:"100%"}} display="flex" justifyContent="center" alignItems="center"
      width="100%">
          <form onSubmit={userRegister}>
              <Typography component="div" sx={{marginBottom:"15px"}}>
                      <TextField required value={name} onChange={(e)=>setName(e.target.value)} color="secondary" size='small' label="Name" fullWidth/>
              </Typography>
              <Typography component="div" sx={{marginBottom:"15px"}}>
                      <TextField required type="email" value={email} onChange={(e)=>setEmail(e.target.value)} color="secondary" size='small' label="Email" fullWidth/>
              </Typography>
             <Typography component="div" sx={{marginBottom:"15px"}}>
                    <PasswordField showPassword={showPassword} setShowPassword={setShowPassword} password={password} setPassword={setPassword} />
             </Typography>
              <Divider />
              <Button type="submit" variant="contained" color="secondary" sx={{width:"300px"}}>Register</Button>
          </form>
      </Box>
    </Stack>
  )
}

export default Register