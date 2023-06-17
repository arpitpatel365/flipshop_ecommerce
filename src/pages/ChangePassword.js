import React,{useState,useEffect} from 'react';
import { Button,Form,Input} from 'antd';
import { PasswordChange } from '../services/UserService';
import { useNavigate } from 'react-router-dom';

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
const ChangePassword = () => {
    const [form] = Form.useForm();
    const [opass, setOpass] = useState('');
    const [npass, setNpass] = useState('');
    const [cpass, setCpass] = useState('');
    const navigate=useNavigate()
    useEffect(() => {
      let obj=localStorage.getItem('Object')
      let ff=document.getElementById('OkSign')
      const SignUpCheck=document.getElementById('SignAuth')

    if(obj!==null){
        ff.style.display='none'
        SignUpCheck.style.display='none'
    }
      
      return () => {
        
      }
    }, [])
    

    const onFinish = (values) => {

        var a = localStorage.getItem("Object")
        var b = JSON.parse(a);
        var c = b.user_id;

        // we can also directly get old password from local storage like this.
        // var s = localStorage.getItem("user_password");
        // console.log(s);

        if (opass === "") {
            window.alert("Please enter your old password.")
        }
        else if (npass === "") {
            window.alert("Please enter your new password.")
        }
        else if (cpass === "") {
            window.alert("Please enter your confirm password.")
        }


        else {
            if (npass === cpass) {



                const data = {
                    user_id: c,
                    opass: opass,
                    npass: npass,
                    cpass: cpass
                };

                PasswordChange(data)
                    .then((res) => {
                        // handle Success
                        console.log(res);
                        if (res.data.flag === "1") {
                            setNpass(npass);
                            window.alert("Password is changed successfully.");
                            form.resetFields()
                            navigate('/profile')
                        }
                        if (res.data.flag==="0") {
                            window.alert("Old password is incorrect.")
                            console.log('incorrect')
                            setOpass("")
                        }
                    })
                    .catch((res) => {
                        // handle error
                        console.log(res)
                    })

            }
            else {
                window.alert("New password and confirm password must be same.");
                setNpass("");
                setCpass("");
                
                
            }
        }
    };


    return (
        <React.Fragment>
            <br/>
            <h4>Update Password</h4>  <br/>
            <Form
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={onFinish}
                layout='vertical'
                wrapperCol={{offset:0,span:4}}
                scrollToFirstError
            >

                <Form.Item
                    name="Opass"
                    label="Old Password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your old password!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password onChange={(e)=>setOpass(e.target.value)} />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="New Password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your new password!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password onChange={(e)=>setNpass(e.target.value)} />
                </Form.Item>

                <Form.Item
                    name="Cpass"
                    label="Confirm Password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password onChange={(e)=>setCpass(e.target.value)} />
                </Form.Item>

                <Form.Item {...tailFormItemLayout}  wrapperCol={{offset:0,span:4}}>
                    <Button type="primary" htmlType="submit">
                        Update password
                    </Button>
                </Form.Item>
            </Form>
        </React.Fragment>
    );
};
export default ChangePassword;