import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AddUser from './AddUser';
import EditUser from './EditUser';
import Cookies from 'js-cookie';

const Users = () => {

    const myCookie = Cookies.get('role')

    const navigate = useNavigate()

    const [answer, setAnswer] = useState("");

    const [isFormAdd, setIsFormAdd] = useState(false);
    const [isFormEdit, setIsFormEdit] = useState(false);

    const [users, setUsers] = useState([]);

    const [updateUser, setUpdateUser] = useState([]);


    const DeleteUserHandler = (login) => {
        const DeleteApiUser = async () => {
            var params = new URLSearchParams();
            params.set('login', login);
            const requestOptions = {
                method: 'POST',
                body: params
            };
            const response = await fetch("http://mysite1/delete_user.php", requestOptions)
            const data = await response.text()
            setAnswer(data)
        }
        DeleteApiUser()
    }

    const AddUserHandler = () => {
        setIsFormAdd(true)
        
    }

    const EditUserHandler = (name, login, role) => {
        setIsFormEdit(true)
        setUpdateUser([name, login, role])
    }

    useEffect(() => {
        if (myCookie) {
        const GetApiUsers = async () => {
            const response = await fetch("http://mysite1/get_users.php")
            const data = await response.json()
            console.log(data)
            setUsers(data)
        
        }

    GetApiUsers()}
    }, [])

    const exitHandler = () => {
        Cookies.remove('role')
        navigate('/')
    }

    if (myCookie) {

    return (
    <div>
        <h1>Все пользователи</h1>
        {isFormAdd ? <div><AddUser /><button className='button_exit' onClick={() => setIsFormAdd(false)}>Назад</button></div> : ""}
        {isFormEdit ? <div><EditUser fio={updateUser[0]} login={updateUser[1]} role={updateUser[2]}/><button className='button_exit' onClick={() => setIsFormEdit(false)}>Назад</button></div> : ""}
        <button className="button_add" onClick={AddUserHandler}>+ Добавить пользователя</button>
        <table className="table">
            <thead>
                    <th>ФИО</th>
                    <th>Логин</th>
                    <th>Полномочие</th>
            </thead>
            <tbody className="tbody">
                {users.map((user) => (
                    <tr key={user.login}>

                        <td>{user.fio}</td>
                        <td>{user.login}</td>
                        <td>{user.name_role}</td>
                        <td><button onClick={() => EditUserHandler(user.fio, user.login, user.name_role)}>Изменить</button></td>
                        <td><button onClick={() => DeleteUserHandler(user.login)}>Удалить</button></td>
                        </tr>
                    ))}
            </tbody>
        </table>
        {answer}
        <button className='button_exit' onClick={exitHandler}>Выйти</button>
    </div>
    );
}
else {
    return (
        <div>Войдите в систему, чтобы продолжить</div>
    );
}
}

export default Users;