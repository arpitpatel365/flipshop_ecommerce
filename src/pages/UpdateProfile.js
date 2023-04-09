import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Select, } from 'antd';
import { UpdateProfileData } from '../services/UserService';
import { useNavigate } from 'react-router-dom';

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

const UpdateProfile = () => {
  const [form] = Form.useForm();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const navigate=useNavigate()
  useEffect(() => {
    let obj = localStorage.getItem('Object')
    let ff = document.getElementById('OkSign')
    const SignUpCheck = document.getElementById('SignAuth')

    if (obj !== null) {
      ff.style.display = 'none'
      SignUpCheck.style.display = 'none'
    }

    return () => { }
  }, [])


  const onFinish = () => {

    if (name === "") {
      window.alert('Please enter your updated name.')
    }

    else if (email === "") {
      window.alert('Please enter your updated email address.')
    }

    else if (gender === "") {
      window.alert('Please select your gender.')
    }

    else if (address === "") {
      window.alert('Please enter your updated address.')
    }

    else if (mobile === "") {
      window.alert('Please enter your updated mobile number.')
    }

    else {

      let obj = localStorage.getItem('Object')
      let a = JSON.parse(obj)
      let userID = a.user_id;
     
      const data = {
        user_id: userID,
        user_name: name,
        user_email: email,
        user_gender: gender,
        user_address: address,
        user_mobile: mobile,
      };

      UpdateProfileData(data)
        .then((value) => {
          if (value.data.flag === "1") {
            console.log(value)
            setName(value.data.user_name)
            setEmail(value.data.user_email);
            setGender(value.data.user_gender);
            setAddress(value.data.user_address)
            setMobile(value.data.user_mobile)
            window.alert('Your profile is updated successfully.')
            form.resetFields()
            navigate('/profile')
          }

        })
        .catch((error) => {
          console.log(error)
        })
      }
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
      <div className='do_not_override'>
        <br />
        <h4>Profile Updation</h4>

        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          size='large'
          initialValues={{

            prefix: '91',
          }}
          scrollToFirstError

          labelAlign='left'
          // labelCol={{pull:5}}
          layout='vertical'
          wrapperCol={{ offset: 0, span: 5 }}

        >


          <Form.Item
            // labelCol={{offset:7}}
            name="name"
            label="Name"

            rules={[
              {
                required: true, 
                message: 'Please input your name!',
                whitespace: true,
              },
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

          <Form.Item {...tailFormItemLayout} wrapperCol={{ offset: 0 }} >
            <Button type="primary" htmlType="submit" >
              Update Profile
            </Button>
          </Form.Item>
        </Form>
      </div>
    </React.Fragment>
  );
};
export default UpdateProfile;
