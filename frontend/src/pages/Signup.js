import React,{useState}from 'react'
import { Link,useNavigate } from "react-router-dom";
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
import { signup } from '../actions/auth';
import { connect } from 'react-redux';

const Signup=({signup,isAuthenticated})=>{
  const navigate=useNavigate()
  const [accountCreated,setAccountCreated]=useState(false)
    const [formData,setFormData]=useState({
        name:'', 
        email:'',
        password:'',
        re_password:''
    });

    const {name,email,password,re_password}=formData;
    const onChange=e=>setFormData({...formData,[e.target.name]:e.target.value});

    const onSubmit=e=>{
        e.preventDefault();
        if(password===re_password){
          signup(name,email,password,re_password)  
          // setAccountCreated(true)   
        }
        

    }

    // if(isAuthenticated){
    //   return navigate('/')
    // }
    // if(accountCreated){
    //   return navigate('/login')
    // }
    return (
        <>
        <img
        src="https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
        alt='cover' className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
        <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
          <form onSubmit={e=>onSubmit(e)}>
          <CardHeader
            variant="gradient"
            color="blue-gray"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Sign Up
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input type="text" label="Name" name='name' value={name} onChange={e =>onChange(e)} required size="lg" />
            <Input type="email" label="Email" name='email' value={email} onChange={e =>onChange(e)} required  size="lg" />
            <Input type="password" label="Password" name="password" value={password} onChange={e =>onChange(e)} required  size="lg" />
            <Input type="password" label="Confirm Password" name="re_password" value={re_password} onChange={e =>onChange(e)} required  size="lg" />
            <div className="-ml-2.5">
              <Checkbox label="I agree the Terms and Conditions" />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button type='submit' color='blue-gray' variant="gradient" fullWidth>
              Sign Up
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Already have an account?
              <Link to="/login">
                <Typography
                  as="span"
                  variant="small"
                  color="blue"
                  className="ml-1 font-bold"
                >
                  Sign in
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

export default connect(mapStateToProps,{signup})(Signup)