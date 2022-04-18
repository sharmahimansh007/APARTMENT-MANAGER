

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export function Residentdetails() {

  const [ResidentalDetail, setResidentalDetail] = React.useState({})

    const {id} = useParams();

    React.useEffect(() => {
        axios.get(`http://localhost:5000/resident/${id}`).then(res => {
            console.log(res.data);
            setResidentalDetail(res.data)
        })
    },[])

  return (
  <>
    {ResidentalDetail.name ? (<Card className='residentDetail' >
    <CardContent className='cardDetails'>
        <h2 style={{color:"Black"}}> Residental Detail </h2>
        <Typography  className='info'>
        <h3>Total Resident</h3>
        <h2> {ResidentalDetail.id.total_residents} </h2>
      </Typography>
      <Typography className='info'>
      <h3>Resident Flat Number</h3>
        <h2> {ResidentalDetail.id.flat_number} </h2>.
      </Typography>
      <Typography  className='info'>
        <h3>Resident Name</h3>
        <h2> {ResidentalDetail.name} </h2>
      </Typography>
      <Typography className='info'>
      <h3>Resident Block</h3>
        <h2> {ResidentalDetail.id.block} </h2>.
      </Typography>
      
      <Typography className='info' >
      <h3>Resident Type</h3>
        <h2> {ResidentalDetail.type} </h2>
      </Typography>
      <Typography className='info'>
      <h3>Resident Gender</h3>
        <h2> {ResidentalDetail.gender} </h2>.
      </Typography>
      <Typography className='info'>
      <h3>Resident Age</h3>
        <h2> {ResidentalDetail.age} </h2>
      </Typography>
     
     
      
    </CardContent>
  </Card> ) : "Loading..."}
  </>
  );
}
