import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Space, Spin } from 'antd';
import user from '../images/user.png'
import Button from 'react-bootstrap/Button';
import { GetUserProfile } from '../services/UserService';

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
            alert(`Seems user ID not found in system. Please create new account.`)
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
        <br />

        
          <>
            <h2> <img src={user} alt='error' style={{ height: '40px' }} /> Profile Section</h2> <br />

            <div className=''>

              <img src={data.user_photo} alt='error' style={{ width: '200px' }} />  <br />
              Name : {data.user_name}  <br />
              Email ID : {data.user_email} <br />
              Mobile Number : {data.user_mobile} <br />
              Gender : {data.user_gender} <br />
              Address : {data.user_address} <br /><br />
            </div>
            <Link to='/update-profile'>  <Button variant="primary">Update Profile</Button>{' '} </Link> <br /><br />
            <Button variant="warning" onClick={handlePassword}>Change Password</Button>{' '}
          </>
      </div>
        }
    </React.Fragment>
  )
}



