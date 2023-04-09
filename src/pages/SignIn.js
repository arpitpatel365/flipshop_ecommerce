import React, { useEffect, useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import '../css/SignIn.css'
import { DoLogin } from '../services/UserService';


const SignIn = () => {
  const [user_email, setEmail] = useState('');
  const [user_password, setPassword] = useState('');
  const [form] = Form.useForm();
  let navigate = useNavigate();

  useEffect(() => {
    let obj = localStorage.getItem('Object')
    let ff = document.getElementById('OkSign')
    let Out = document.getElementById('logOut')

    if (obj == null) {
      ff.style.display = 'block'
      Out.style.display = 'none'

    }

    else {
      ff.style.display = 'none'
      Out.style.display = 'block'
    }

    return () => { }
  }, [])


  const onFinish = () => {

    let formData = new FormData();
    formData.append('user_email', user_email);
    formData.append('user_password', user_password);

    DoLogin(formData)
      .then(function (res) {
        console.log(res);
        if (res.data.flag === "1") {
          localStorage.setItem('user_email', user_email);
          localStorage.setItem('Object', JSON.stringify(res.data))
          form.resetFields();
          navigate('/viewcart');

        }

        else {
          alert('You have entered incorrect email address or password. Please enter correct email address and password.');
        }
      })

      .catch((error) => {
        console.log(error);
      })
    
  };


  return (
    <React.Fragment>
      <br />

      <h2 >Sign In</h2>  <br />

      <Form
     
        form={form}
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        size='large'
        wrapperCol={{ span: 4, offset: 0 }}

      >
      
        <Form.Item
          name="user_email"
          rules={[
            {
              required: true,
              message: 'Please enter your email address!',
            },
          ]}

        > 
  
          <Input prefix={<UserOutlined className="site-form-item-icon" />} type='email' name='email'  placeholder="Email address" onChange={(e) => { setEmail(e.target.value) }} />
        </Form.Item>
        <Form.Item
          name="user_password"
          rules={[
            {
              required: true,
              message: 'Please enter your Password!',
            },
          ]}


        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password" onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item>

          <Link to='/forgot-password' className="login-form-forgot">
            Forgot password ?
          </Link>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          &nbsp;
          Or &nbsp;<Link to='/signup'>Register now !</Link>
        </Form.Item>
      </Form>

    </React.Fragment>
  );
};
export default SignIn;






