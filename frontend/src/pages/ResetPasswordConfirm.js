import React,{useState} from 'react'
import {useNavigate,useParams} from 'react-router-dom'
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
import {reset_password_confirm} from '../actions/auth'  



const ResetPasswordConfirm=({match,reset_password_confirm})=>{
  const [requestSent,setrequestSent]=useState(false);  
  const navigate=useNavigate()
    const [formData,setFormData]=useState({
        new_password:'',
        re_new_password:''
    });

    const {uid,token}=useParams()
   
    const {new_password,re_new_password}=formData;
    const onChange=e=>setFormData({...formData,[e.target.name]:e.target.value});

    const onSubmit=e=>{
        e.preventDefault();
        reset_password_confirm(uid,token,new_password,re_new_password)
        setrequestSent(true)

    }
    // console.log(match)
    // console.log(match.params.uid)
    // console.log(match.params.token)

    if(requestSent){
      // return navigate('/')
    }

    return (
        <>
        <img
        src="https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
        alt='' className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
        <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
        <form onSubmit={e=>onSubmit(e )}>
          <CardHeader
            variant="gradient"
            color="blue-gray"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
               Password Reset
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
          <Input type="password" name='new_password' label="New Password" value={new_password} onChange={e =>onChange(e)} minLength='6' required size="lg" />
          <Input type="password" name='re_new_password' label="Confirm New Password" value={re_new_password} onChange={e =>onChange(e)} minLength='6' required size="lg" />
          </CardBody>
          <CardFooter className="pt-0">
            <Button type='submit' color='blue-gray' variant="gradient" fullWidth>
              Reset Password
            </Button>
            
          </CardFooter>
          </form>
        </Card>
      </div>
        
        
        </>
    )
}
export default connect(null,{reset_password_confirm})(ResetPasswordConfirm);