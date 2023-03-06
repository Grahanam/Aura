import React,{useState} from 'react'
import {Link,useNavigate,useParams} from 'react-router-dom'
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
import {verify} from '../actions/auth'  



const Activate=({verify})=>{
  const navigate=useNavigate()
    const [verified,setVerified]=useState(false)
    const {uid,token}=useParams()
    const verify_account=e=>{
        
        verify(uid,token)
        setVerified(true)
    }

    if(verified){
     
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
        <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
          <CardHeader
            variant="gradient"
            color="blue-gray"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Activate Account
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            
          </CardBody>
          <CardFooter className="pt-0">
            <Button onClick={verify_account} color="blue-gray" variant="gradient" fullWidth>
              Activate
            </Button>            
          </CardFooter>
        </Card>
      </div>
        
        
        </>
    )
}


export default connect(null,{verify})(Activate);