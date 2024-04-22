'use client';
import React from 'react';
import { Button, Checkbox, Form, FormProps, Input } from 'antd';
import { UserOutlined, UnlockOutlined } from '@ant-design/icons';
import styles from './login.module.scss'
import Image from 'next/image';
import cameraLogo from '../../assets/img/camera-logo.png';
import { loginFunc } from '@/api/login';
import { showNotiError, showNotiSuccess } from '@/components/Noti/notification';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation'

export default function Login() {
    type FieldType = {
        username?: string;
        password?: string;
        remember?: string;
    };
    const router = useRouter()

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        const data:any = await loginFunc(values);
        if(data) {
            Cookies.set('token', data.token)
            showNotiSuccess('Đăng nhập thành công!')
            router.push("/")
        }
        else {
            showNotiError('Thông tin đăng nhập không chính xác!')
        }
    };

    const validatePassword = (rule: any, value: string, callback: any) => {
        const regexPassword = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;

        if(value) {
            if (value.length < 7) {
                callback("Your password must be at least 8 characters")
            }
            if (!regexPassword.test(value)) {
                callback("Your password must be at least one number and one character");
            }
            callback();
        }
      };
    

    return (
      <div className={styles.login}>
        <div className={styles.login__bg}/>
        <div className={styles.form__box}>
            <div className={styles.login__logo}>
                <Image src={cameraLogo} alt='' className={styles.logo__img}/>
            </div>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                initialValues={{ remember: true }}
                autoComplete="off"
                className={styles.login__form}
                onFinish={onFinish}
            >
                <Form.Item<FieldType>
                    name="username"
                    rules={[{ required: true, message: 'Please input your Username!' },]}
                >
                    <Input prefix={<UserOutlined />} placeholder='username' className={styles.input__text}/>
                </Form.Item>

                <Form.Item<FieldType>
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }, {validator: validatePassword}]}
                >
                    <Input.Password placeholder='password' prefix={<UnlockOutlined />} className={styles.input__password}/>
                </Form.Item>

                <Form.Item<FieldType>
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{ span: 16 }}
                >
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Button type="text" htmlType="submit" className={styles.btn__login}>
                    LOGIN
                </Button>
            </Form>
        </div>
      </div>
    )
  }