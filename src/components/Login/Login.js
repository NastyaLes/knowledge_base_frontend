import "./Login.css";
import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Login = () => {

    const [answer, setAnswer] = useState('');
    const navigate = useNavigate()

    const PostApiLogin = async () => {
        var form = document.getElementById('loginform')
        var params = new FormData(form);
        const requestOptions = {
            method: 'POST',
            body: params
        };
        const response = await fetch("http://mysite1/index.php", requestOptions)
        const data = await response.text()
        console.log(data)
        setAnswer(data)
        if (data === 'Неверно') {
            setAnswer("Неверный логин и/или пароль, повторите попытку")
        }
        else {            
            Cookies.set('role', 'id_role = ' + data);
            if (Cookies.get('role') === 'id_role = 1') {
                navigate('/admin')
            }
            else {
            navigate('/home')
            }
        }
    }

    const LoginHandler = (e) => {
        e.preventDefault();
        PostApiLogin()
    }

    return (
    <div className="login-form">
        <form id="loginform">
            <h1 className="h1">Вход</h1>
            <div>
                <label>Логин</label>
                <input required className="login-input" type="text" name="login"/>
            </div>

            <div>
                <label>Пароль</label>
                <input required className="login-input" type="password" name="password"/>
            </div>

            <div>
                <button className="login-button" onClick={LoginHandler}>Войти</button>
            </div>
        </form>

        <div className="error">{answer}</div>

    </div>
    );
}

export default Login;