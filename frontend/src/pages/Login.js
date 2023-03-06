import React,{useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {connect} from 'react-redux'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Input,
    Checkbox,
    Button,
    Typography,
  } from "@material-tailwind/react";
import {login} from '../actions/auth'  



const Login=({login,isAuthenticated})=>{
  const navigate=useNavigate()
    const [formData,setFormData]=useState({
        email:'',
        password:''
    });

    const {email,password}=formData;
    const onChange=e=>setFormData({...formData,[e.target.name]:e.target.value});

    const onSubmit=e=>{
        e.preventDefault();
        login(email,password)

    }

    if(isAuthenticated){
      return navigate('/')
    }

    return (
        <>
        <img
        src="https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
        alt='' className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
        <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4  ">
        <form onSubmit={e=>onSubmit(e )}>
          <CardHeader
            variant="gradient"
            color='blue-gray'
            className="mb-4 grid h-28  place-items-center"
          >
            <Typography variant="h3" color="white">
              Sign In
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input type="email" name='email' label="Email" value={email} onChange={e =>onChange(e)} required size="lg" />
            <Input type="password" name='password' label="Password" value={password} onChange={e =>onChange(e)} minLength='6' required size="lg" />
            
            <div className="-ml-2.5">
              <Checkbox label="Remember Me" />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button type='submit' color='blue-gray' variant="gradient" fullWidth>
              Sign In
            </Button>
            <Link to="/reset_password" className=''>
                <Typography
                  as="span"
                  variant="small"
                  color="blue"
                  className="flex ml-1 mt-3 font-bold justify-center "
                >
                  Forgot password?
                </Typography>
            </Link>
            <Typography variant="small" className="mt-5 flex justify-center">
              Don't have an account?
              <Link to="/signup">
                <Typography
                  as="span"
                  variant="small"
                  color="blue"
                  className="ml-1 font-bold"
                >
                  Sign up
                </Typography>
              </Link>
            </Typography>
            
            
          </CardFooter>
          </form>
        </Card>
      </div>
        
        
        </>
    )
}
const mapStateToProps=state=>({
     isAuthenticated:state.auth.isAuthenticated
});

export default connect(mapStateToProps,{login})(Login);