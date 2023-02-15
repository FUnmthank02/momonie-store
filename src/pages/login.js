import { Button, Checkbox, Form, Input } from 'antd'
import styles from '@/styles/Login.module.scss'
import { useState } from 'react'
import { login } from '@/service/authService/apiService'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'

function Login() {
    const [cookie, setCookie] = useCookies('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [notiFail, setNotiFail] = useState({
        status: false,
        color: 'red'
    })

    const router = useRouter()

    const onFinish = (values) => {
        setUsername(values.username)
        setPassword(values.password)
        handleLogin({
            username: values.username,
            password: values.password
        })

    }

    const handleLogin = async (account) => {
        await login(account)
            .then(res => {
                router.push('/dashboard')
                setCookie('token', res.token)
            })

            .catch(err => setNotiFail({
                ...notiFail,
                status: true
            }))
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    }

    return (
        <>
            <div className={styles.contain_login}>

                <Form className={`container ${styles.form}`}
                    name="loginForm"
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <div className={styles.contain_title}>
                        <p className={styles.title}>ĐĂNG NHẬP</p>
                    </div>
                    {
                        notiFail.status &&
                        <div className='p-3' style={{background: '#F8EAD8', width: 'fit-content', margin: '0 auto 20px', borderRadius: '10px'}}>
                            <p style={{ color: notiFail.color, textAlign: 'center', margin: 0 }}>Sai tài khoản hoặc mật khẩu!</p>
                        </div>
                    }

                    <Form.Item
                        label="Tài khoản"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Nhập tài khoản của bạn...',
                            },
                        ]}
                    >
                        <Input onChange={(e) => setUsername(e.target.value)} />
                    </Form.Item>

                    <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Nhập mật khẩu của bạn...',
                            },
                        ]}
                    >
                        <Input.Password onChange={e => setPassword(e.target.value)} />
                    </Form.Item>

                    <Form.Item className='d-flex justify-content-center'>
                        <Button type="primary" htmlType="submit">
                            ĐĂNG NHẬP
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    )
}

export default Login

Login.getLayout = function PageLayout(page) {
    return (
        <>
            {page}
        </>
    )
}