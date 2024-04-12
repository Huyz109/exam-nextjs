'use client';
import React from 'react';
import { Button, Checkbox, Form, FormProps, Input } from 'antd';
import { UserOutlined, UnlockOutlined } from '@ant-design/icons';
import styles from './login.module.scss'
import Image from 'next/image';
import cameraLogo from '../../assets/img/camera-logo.png';
import bgImg from '../../assets/img/login-bg.jpg';

export default function Login() {
    type FieldType = {
        username?: string;
        password?: string;
        remember?: string;
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
            >
                <Form.Item<FieldType>
                    name="username"
                    rules={[{ required: true, message: 'Please input your Username!' },]}
                >
                    <Input prefix={<UserOutlined />} placeholder='username' className={styles.input__text}/>
                </Form.Item>

                <Form.Item<FieldType>
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
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