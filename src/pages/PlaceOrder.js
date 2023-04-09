import React, { useState, useEffect } from 'react';
import { Button, Checkbox, Form, Input, Select, } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { ConfirmOrder } from '../services/ProductService';
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
const PlaceOrder = () => {

    let navigate = useNavigate('')
    const [form] = Form.useForm();
    const [user, setUser] = useState({
        shipping_name: "",
        shipping_mobile: "",
        shipping_address: "",
        payment_method: ""
    })

    useEffect(() => {

        let obj = localStorage.getItem('Object')
        let ff = document.getElementById('OkSign')
        let SignUpCheck = document.getElementById('SignAuth')

        if (obj !== null) {
            ff.style.display = 'none'
            SignUpCheck.style.display = 'none'
        }

        return () => { }
    }, [])


    const onFinish = () => {
        let a1 = localStorage.getItem("Object");
        let a2 = (JSON.parse(a1));
        let a3 = (a2.user_id)
        let a = user.shipping_name;
        let b = user.shipping_mobile;
        let c = user.shipping_address;
        let d = user.payment_method;

        if (user.shipping_name === "") {
            window.alert('Kindly enter consignee name.')
        }

        else if (user.shipping_mobile === "") {
            window.alert('Kindly enter 10 digit mobile number of consignee. ')
        }

        else if (user.shipping_address === "") {
            window.alert('Kindly enter full address of consignee. ')
        }

        else if (user.payment_method === undefined || user.payment_method === "") {
            window.alert('Kindly select payment method.')
        }

        else {

            const data = {
                user_id: a3,
                shipping_name: a,
                shipping_mobile: b,
                shipping_address: c,
                payment_method: d

            };

            ConfirmOrder(data)
                .then((res) => {
                    // handle success
                    console.log(res)
                    Swal.fire(
                        '',
                        'Your order is successfully placed.',
                        'success'
                    )
                        .then(() => {
                            form.resetFields()
                            navigate('/vieworder')
                        })

                })

                .catch((res) => {
                    // handle error
                    console.log(res);
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
                <Option value="86">+91</Option>

            </Select>
        </Form.Item>
    );


    return (

        <React.Fragment>
            <br />
            <Form
                {...formItemLayout}
                form={form}
                // labelCol={{ span: 3, offset: 2}}
                name="register"
                onFinish={(e) => onFinish(e)}
                initialValues={{
                    prefix: '+91',
                }}
                scrollToFirstError
                labelAlign='left'
                layout='vertical'
                wrapperCol={{ span: 5 }}


            >


                <Form.Item
                    name="name"
                    label="Consignee name"

                    rules={[
                        {
                            required: true,
                            message: 'Please input your consignee name!',
                            whitespace: true,
                        },
                    ]}
                >
                    <Input onChange={(e) => setUser({ ...user, shipping_name: e.target.value })} />
                </Form.Item>



                <Form.Item
                    name="phone"
                    label="Phone Number"
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
                        }}
                        onChange={(e) => setUser({ ...user, shipping_mobile: e.target.value })}
                    />
                </Form.Item>



                <Form.Item
                    name="address"
                    label="Address"
                    rules={[
                        {
                            required: true,
                            message: 'Please input Address.',
                        },
                    ]}
                >
                    <Input.TextArea showCount maxLength={100} onChange={(e) => setUser({ ...user, shipping_address: e.target.value })} />
                </Form.Item>

                <Form.Item
                    name="payment_method"
                    label="Payment method"
                    rules={[
                        {
                            required: true,
                            message: 'Please select payment method!',
                        },
                    ]}

                >
                    <Select placeholder="Please select payment method" onChange={(value) => setUser({ ...user, payment_method: value })} >
                        <Option value="gpay">Gpay</Option>
                        <Option value="paytm">Paytm</Option>
                        <Option value="wallet">Wallet</Option>
                    </Select>
                </Form.Item>

                <Form.Item

                    name="agreement"
                    valuePropName="checked"
                    rules={[
                        {
                            validator: (_, value) =>
                                value ? Promise.resolve() : Promise.reject(new Error('Please accept agreement.')),
                        },
                    ]}
                    {...tailFormItemLayout}
                    wrapperCol={{ offset: 0 }}
                >
                    <Checkbox>
                        I have read the <Link to="">agreement</Link>
                    </Checkbox>
                </Form.Item>
                <Form.Item {...tailFormItemLayout} wrapperCol={{ offset: 0 }}>
                    <Button type="primary" htmlType="submit">
                        Placer Order
                    </Button>
                </Form.Item>
            </Form>
        </React.Fragment>
    );
};
export default PlaceOrder;