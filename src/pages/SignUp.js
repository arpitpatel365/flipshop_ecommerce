import React, { useState, useEffect } from 'react';
import '../css/SignUp.css'
import { Button, Checkbox, Form, Input, Select, } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { DoSignUP } from '../services/UserService';
import Swal from 'sweetalert2';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const SignUp = () => {
  const [form] = Form.useForm();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate()
  useEffect(() => {
    let obj = localStorage.getItem('Object')
    let ff = document.getElementById('OkSign')
    let Out = document.getElementById('logOut')

    if (obj !== null) {
      ff.style.display = 'none'
      Out.style.display = 'block'

    }

    else {
      ff.style.display = 'block'
      Out.style.display = 'none'
    }

    return () => {
    }
  }, [])


  const onFinish = async () => {

    const formData = new FormData();
    formData.append('user_name', name);
    formData.append('user_email', email);
    formData.append('user_password', password);
    formData.append('user_gender', gender);
    formData.append('user_mobile', mobile);
    formData.append('user_address', address);

    DoSignUP(formData)
      .then(function (res) {
        console.log(res);
        if (res.data.flag === "1") {
          Swal.fire(
            '',
            'Your account created successfully.',
            'success'
          )
            .then(function () {
              navigate('/signin');
              form.resetFields()
            });
        }

        if (res.data.message === "Email already exist") {
          window.alert("Email address already exist.")
        }
      })
      .catch(function (res) {
        console.log(res);
      })
    // try {
    //   let res = await DoSignUP(formData)
    //   if (res.data.flag === "1") {
    //   Swal.fire(
    //       '',
    //       'Your account created successfully.',
    //       'success'
    //     );
    //    await new Promise((resolve, reject) => {
    //         navigate('/signin')
    //     }) 
    //     form.resetFields()
    //   }
    // } catch (error) {
    //   console.log(error)
    // }
  };

  const prefixSelector = (

    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="+91">+91</Option>

      </Select>
    </Form.Item>

  );

  return (
    <React.Fragment>

      <br />
      <div className='form-container'>
        <h3>Sign Up</h3>
        <br />


        <Form

          className='form_main'
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          size='large'
          initialValues={{

            prefix: '91',
          }}
          scrollToFirstError



          layout='horizontal'

        // wrapperCol={{offset:0,span:27}}


        >


          <Form.Item
            className='name'
            name="name"
            label="Name"

            rules={[
              {
                required: true,
                message: 'Please input your name!',
                whitespace: true,
              }


            ]}
          >
            <Input onChange={(e) => setName(e.target.value)} />
          </Form.Item>

          <Form.Item

            name="email"
            label="E-mail"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}

          >

            <Input onChange={(e) => setEmail(e.target.value)} />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            hasFeedback
          >
            <Input.Password onChange={(e) => setPassword(e.target.value)} />
          </Form.Item>

          <Form.Item
            name="mobile"
            label="Mobile Number"
            rules={[
              {
                required: true,
                message: 'Please input your phone number!',
              },
            ]}
          >
            <Input
              addonBefore={prefixSelector}
              style={{
                width: '100%',
              }} onChange={(e) => setMobile(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="gender"
            label="Gender"
            rules={[
              {
                required: true,
                message: 'Please select gender!',
              },
            ]}
          >
            <Select t placeholder="select your gender" onChange={(value) => { setGender(value) }} >
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: 'Please input address.' }]}
          >
            <Input.TextArea showCount maxLength={100} onChange={(e) => setAddress(e.target.value)} />
          </Form.Item>

          <Form.Item

            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value ? Promise.resolve() : Promise.reject(new Error('In order to proceed ahead, you need to accept agreement.')),
              },
            ]}
            {...tailFormItemLayout}

            layout='vertical'
          // wrapperCol={{offset:0,span:27}}
          >
            <Checkbox>
              I have read the <Link to="">agreement</Link>
            </Checkbox>
          </Form.Item>
          <Form.Item {...tailFormItemLayout} layout='horizontal'>
            <Button type="primary" htmlType="submit" className='submit_btn' >
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>

    </React.Fragment>
  );
};
export default SignUp;
