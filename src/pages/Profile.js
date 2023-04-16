import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Space, Spin } from 'antd';
import Button from 'react-bootstrap/Button';
import { GetUserProfile } from '../services/UserService';
import Avatar from '@mui/material/Avatar';

export const Profile = () => {
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  let navigate = useNavigate();

  const SpinLoad = () => (
    <Space
      direction="vertical"
      style={{
        width: '100%',
      }}
    >
      <center> <Spin tip="Loading...">

      </Spin>
      </center>
    </Space>
  );

  useEffect(() => {

    let a = localStorage.getItem("Object");
    if (a == null) {
      window.alert('Please login first.');
      navigate('/signin')
    }

    else {
      let b = JSON.parse(a);
      let c = b.user_id;

      const SignUpCheck = document.getElementById('SignAuth')
      const ff = document.getElementById('OkSign')

      ff.style.display = 'none'
      SignUpCheck.style.display = 'none'


      let formData = new FormData();
      formData.append("user_id", c)

      GetUserProfile(formData)
        .then((res) => {
          // success
          console.log(res);
          if (res.data.flag === "1") {
            setData(res.data)
            setIsLoaded(true)
          }

          else if (res.data.message === 'User Id Not Found') {
            alert(`User ID not found in system. Please create new account.`)
            setIsLoaded(true)
          }

          else {
            console.log(res.data)
            setIsLoaded(true)
          }

        })
        .catch(function (error) {
          // error
          console.log(error)
          setIsLoaded(true)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handlePassword = () => {
    navigate('/change-password')
  }


  return (
    <React.Fragment>
      {!isLoaded ? SpinLoad() :
      <div className='container my-5 border border-1 border border-success-subtle rounded'>
          <>
            <h2> Profile Section</h2> 

            <div className=''>
          
              <Avatar  src={data.user_photo==="https://akashsir.in/myapi/ecom1/upload/noimage.png" ? "/broken-image.jpg" :data.user_photo } sx={{ width: 96, height: 96 }} /> 
              Name : {data.user_name}  <br />
              Email ID : {data.user_email} <br />
              Mobile Number : {data.user_mobile} <br />
              Gender : {data.user_gender} <br />
              Address : {data.user_address} <br /><br />
            </div>
            <Link to='/update-profile'>  <Button variant="primary">Edit Profile</Button>{' '} </Link> <br /><br />
            <Button variant="warning" onClick={handlePassword}>Change Password</Button>{' '}
          </>
      </div>
        }
    </React.Fragment>
  )
}



