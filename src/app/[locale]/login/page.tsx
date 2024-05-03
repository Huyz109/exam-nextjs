'use client';
import React from 'react';
import { Button, Checkbox, Form, FormProps, Input } from 'antd';
import { UserOutlined, UnlockOutlined } from '@ant-design/icons';
import styles from './login.module.scss'
import Image from 'next/image';
import cameraLogo from '@/assets/img/camera-logo.png';
import { loginFunc } from '@/api/login';
import { showNotiError, showNotiSuccess } from '@/components/Noti/notification';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl';

export default function Login() {
    type FieldType = {
        username?: string;
        password?: string;
        remember?: string;
    };
    const router = useRouter();
    const t = useTranslations();


    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        const data:any = await loginFunc(values);
        if(data) {
            Cookies.set('token', data.token)
            if(values.remember) {
                Cookies.set('username', values.username!)
                Cookies.set('password', values.password!)
            }
            showNotiSuccess(t('login.loginSuccess'))
            router.push("/")
        }
        else {
            showNotiError(t('login.loginInfoNotTrue'))
        }
    };

    const validatePassword = (rule: any, value: string, callback: any) => {
        const regexPassword = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;

        if(value) {
            if (value.length < 7) {
                callback(t('login.passMustBeLeast7'))
            }
            if (!regexPassword.test(value)) {
                callback(t('login.passMustBeNumberAndCharacter'));
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
                    rules={[{ required: true, message: t('login.userRequired') },]}
                >
                    <Input prefix={<UserOutlined />} placeholder={t('login.username')} className={styles.input__text} defaultValue={Cookies.get('username') || ''}/>
                </Form.Item>

                <Form.Item<FieldType>
                    name="password"
                    rules={[{ required: true, message: t('login.passRequired') }, {validator: validatePassword}]}
                >
                    <Input.Password placeholder={t('login.password')} prefix={<UnlockOutlined />} className={styles.input__password} defaultValue={Cookies.get('password') || ''}/>
                </Form.Item>

                <Form.Item<FieldType>
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{ span: 16 }}
                >
                    <Checkbox>{t('login.remember')}</Checkbox>
                </Form.Item>

                <Button type="text" htmlType="submit" className={styles.btn__login + ' uppercase'}>
                    {t('login.login')}
                </Button>
            </Form>
        </div>
      </div>
    )
  }