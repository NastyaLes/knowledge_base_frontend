import { useState, useEffect } from 'react';

const AddUser = () => {

    const [roles, setRoles] = useState([]);

    const [select, setSelect] = useState(0);
    const changeSelectHandler = (e) => {
        setSelect(e.target.value);
    }

      useEffect(() => {
        const getRoles = async () => {
            const response = await fetch(
              "http://mysite1/get_roles.php"
            ).then((response) => response.json());
            setRoles(response);
          };
          getRoles();
      }, []);

    const PostApiUser = async () => {
        let params = new URLSearchParams();
        params.set('fio', document.getElementById('fio').value);
        params.set('select', document.getElementById('role').value);
        params.set('login', document.getElementById('login').value);
        params.set('password', document.getElementById('password').value);
        const requestOptions = {
            method: 'POST',
            body: params
        };
        const response = await fetch("http://mysite1/add_user.php", requestOptions)
    }

    const ClickAddUser = (e) => {
        e.preventDefault();
        PostApiUser()
    }

    return (
        <div className="adduser-form">
        <form id="addform">
            <h1>Добавить пользователя</h1>
            <div className='item'>
                <label>ФИО</label>
                <input required className="input" type="text" id="fio"/>
            </div>

            <div className='item'>
                <label>Полномочие</label>
                <select className="input" id="role" onChange={changeSelectHandler}>
                    {roles.map((role) => (
                    <option key={'role' + role.id_role} value={role.id_role}>{role.name_role}</option>
                    ))}
                </select>
            </div>

            <div className='item'>
                <label>Логин</label>
                <input required className="input" type="text" id="login"/>
            </div>

            <div className='item'>
                <label>Пароль</label>
                <input required className="input" type="password" id="password"/>
            </div>

            <div>
                <button onClick={ClickAddUser}>Добавить</button>
            </div>

        </form>
        </div>
    );
}

export default AddUser;