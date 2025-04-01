import React from 'react';
import '../css/Login.css';
interface LoginProps {
    onLogin: (username: string, password: string) => void;
}
declare const Login: React.FC<LoginProps>;
export default Login;
