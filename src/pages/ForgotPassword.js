import React, { useEffect, useState } from 'react';
import { Space, Spin } from 'antd';
import {Button,Form,Input} from 'antd';
import { GetForgotPassword } from '../services/UserService';

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


const ForgotPassword= () => {
  const [form] = Form.useForm();
  const [email, setEmail] = useState('');
  const [errorN,setErrorN]=useState('')
  const [showLoader,setShowLoader]=useState(false)


  useEffect(()=>{
    let Out=document.getElementById('logOut')
    let obj=localStorage.getItem('Object')

    if(obj==null){
      Out.style.display='none'
    }

    else{
      Out.style.display='block'
    }
  })

  const SpinLoad=()=>(
    <Space
    direction="vertical"
    style={{
      width: '100%',
    }}
  >
  
    <Spin tip="Loading..." >
    </Spin>
   
  </Space>
   
   )

  const onFinish = () => {
    setShowLoader(true)

    const data = {
        user_email: email
    };

        GetForgotPassword(data)
        .then((res) => {
            // handle success
            console.log(res.data.message);
            setErrorN(res.data.message)
            form.resetFields()
            setShowLoader(false)
           
          })
          .catch((res) => {
              console.log(res);
              setShowLoader(false)
          })
                
        };
                
  return (
    <React.Fragment>
      <br/>
      
      <div className='do_not_override'>
      <br />
      <h2>Enter your registered email id to get your password.</h2> 
          <br />
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          size='large'
         
         scrollToFirstError
          
          labelAlign='left'
          // labelCol={{pull:5}}
          layout='vertical'
          wrapperCol={{offset:0,span:5}}
          
        >
          
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
          {showLoader ? SpinLoad() : null}
          <p style={{color:"red",fontSize:'20px'}}>{errorN?.length>0 ? errorN : "" }</p>

          <Form.Item {...tailFormItemLayout} wrapperCol={{offset:0}} >
            <Button type="primary" htmlType="submit" >
              Get Your Password
            </Button>
          </Form.Item>
        </Form>
      </div>
  
      </React.Fragment>
  );
};
export default ForgotPassword;
