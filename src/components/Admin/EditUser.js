import { useState } from 'react';

const EditUser = (props) => {

    const [answer, setAnswer] = useState("");

    const PostApiUser = async () => {
        var form = document.getElementById('edituserform')
        var params = new FormData(form);
        const requestOptions = {
            method: 'POST',
            body: params
        };
        const response = await fetch("http://mysite1/edit_user.php", requestOptions)
        const data = await response.text()
        setAnswer(data)
    }

    const EditUserHandler = () => {
        PostApiUser()
    }

    return (
        <div className="adduser-form">
        <form id="edituserform">
            <h1>Изменить пользователя</h1>
            <div className='item'>
                <label>ФИО</label>
                <input className="input" type="text" value={props.fio} name="fio" required/>
            </div>

            <div className='item'>
                <label>Полномочие</label>
                <input className="input" type="text" value={props.role} name="role" required/>
            </div>

            <div className='item'>
                <label>Логин</label>
                <input className="input" type="text" value={props.login} name="login" required/>
            </div>

            <div className='item'>
                <label>Пароль</label>
                <input className="input" type="password" value={props.password} name="password" required/>
            </div>

            <div>
                <button onClick={EditUserHandler}>Изменить</button>
            </div>

        </form>
        {answer}
        </div>
    );
}

export default EditUser;