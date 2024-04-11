import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import usersData from './user.json';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(false);
    const navigate = useNavigate();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const User = usersData.find(
            (user) => user.username === username && user.password === password
        );

        if (User) {
            const role = User.role;
            localStorage.setItem('role', role);
            navigate('/management'); // 导航到仪表板页面或其他目标页面
        } else {
            setLoginError(true);
        }
    };

    return (
        <div
            style={{
                backgroundImage: 'url("https://pic2.zhimg.com/v2-c774d7ee646e464ff871daa86c129c63_r.jpg?source=1940ef5c")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <form
                onSubmit={handleSubmit}
                style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    padding: '20px',
                    borderRadius: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >


                <div style={{ marginBottom: '10px' }}>
                    <label style={{ marginRight: '10px' }}>用户名: </label>
                    <input
                        type="text"
                        value={username}
                        onChange={handleUsernameChange}
                        style={{ width: '300px', height: '40px', marginTop: '5px' }}
                    />
                </div>
                <div style={{ marginBottom: '10px', }}>
                    <label style={{ marginRight: '10px' }}>密  码: </label>
                    <input
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        style={{ width: '300px', height: '40px', marginTop: '5px', marginLeft: '10px' }}
                    />
                </div>

                <button
                    type="submit"
                    style={{
                        backgroundColor: 'green',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '5px 10px',
                        fontSize: '14px',
                        color: 'white',
                        marginTop: '10px',
                    }}
                >
                    登录
                </button>
            </form>

            {loginError && (
                <p style={{ color: 'red', marginTop: '10px' }}>登录失败，请检查用户名和密码。</p>
            )}
        </div>
    );
};


//         <div
//             style={{
//                 backgroundImage: 'url("https://pic2.zhimg.com/v2-c774d7ee646e464ff871daa86c129c63_r.jpg?source=1940ef5c")',
//                 backgroundSize: 'cover',
//                 backgroundPosition: 'center',
//                 minHeight: '100vh',
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//             }}
//         >
//             <Form
//                 name="basic"
//                 labelCol={{
//                     span: 8,
//                 }}
//                 wrapperCol={{
//                     span: 16,
//                 }}
//                 initialValues={{
//                     remember: true,
//                 }}
//                 onFinish={onFinish}
//                 onFinishFailed={onFinishFailed}
//                 autoComplete="off"
//                 style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
//             >

//                 <Form.Item
//                     label="用户名"
//                     name="username"
//                     rules={[
//                         {
//                             required: true,
//                             message: '请输入用户名！',
//                         },
//                     ]}
//                 >
//                     <Input style={{ width: '300px', height: '40px' }} />
//                 </Form.Item>

//                 <Form.Item
//                     label="密码"
//                     name="password"
//                     rules={[
//                         {
//                             required: true,
//                             message: '请输入密码！',
//                         },
//                     ]}
//                 >
//                     <Input.Password style={{ width: '300px', height: '40px' }} />
//                 </Form.Item>


//                 <Form.Item
//                     wrapperCol={{
//                         offset: 8,
//                         span: 16,
//                     }}
//                 >
//                     <Button type="primary" htmlType="submit" style={{ backgroundColor: 'green', border: 'none', borderRadius: '4px', padding: '5px 10px', fontSize: '14px', color: 'white', width: '80px', margin: '0 auto' }}>
//                         登录
//                     </Button>

//                 </Form.Item>

//                 {loginError && (
//                     <Form.Item
//                         wrapperCol={{
//                             offset: 8,
//                             span: 16,
//                         }}
//                     >
//                         <p style={{ color: 'red' }}>登录失败，请检查用户名和密码。</p>
//                     </Form.Item>
//                 )}
//             </Form>
//         </div>
//     );
// };

export default LoginPage;