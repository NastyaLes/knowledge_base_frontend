import './Component.css';
import { useState } from 'react';
import Cookies from 'js-cookie';

const Component = (props) => {

    const myCookie = Cookies.get('role')

    const [isTechInfo, setIsTechInfo] = useState(false);

    const [isNotes, setIsNotes] = useState(false);
    const [notes, setNotes] = useState([]);

    const [isAddNotes, setIsAddNotes] = useState(false);

    const NotesHandler = (component) => {
        const GetApiNotes = async () => {
            var params = new URLSearchParams();
            params.set('component', component);
            const requestOptions = {
                method: 'POST',
                body: params
            };
            const response = await fetch("http://mysite1/get_notes.php", requestOptions)
            const data = await response.json()
            setNotes(data)
        }
        GetApiNotes()
        setIsNotes(true)
    }

    const AddNoteHandler = (note, component) => {
        const PostApiNote = async () => {
            var params = new URLSearchParams();
            params.set('note', note);
            params.set('component', component);
            const requestOptions = {
                method: 'POST',
                body: params
            };
            const response = await fetch("http://mysite1/add_note.php", requestOptions)
            const data = await response.text()
        }
        PostApiNote()
    }

    return (
        <div>
            <img src={props.image}/>
            <h4>{props.namee}</h4>
            <div>
                <div>Вид: {props.view}</div>
                <div>Параметры: {props.parameters}</div>
                <div>Срок поставки: {props.date}</div>
            </div>
            <div className='buttons'>

            <div className="container-buttons">

                <button className="main-buttons" onClick={() => setIsTechInfo(true)}>Техническая информация</button> 
                {isTechInfo ? <div><div>{props.techinfo}</div><button onClick={() => setIsTechInfo(false)}>Закрыть</button></div> : ""}           
                
                <button className="main-buttons" onClick={() => NotesHandler(props.namee)}>Просмотр заметок</button>
                {isNotes ? <div>{notes.map((note) => (
                <div>
                    <p>Пользователь {note.fio}: {note.content}</p>
                </div>
            ))}
                <button onClick={() => setIsNotes(false)}>Закрыть</button>
                </div> : ""}

            </div>

            {myCookie === "id_role = 3" ?
            <button id="button_add_component" onClick={() => setIsAddNotes(true)}>Добавить заметку</button>
             : <div></div>}
             
             {isAddNotes ? <div><textarea id='my-area'/><button onClick={() => AddNoteHandler(document.getElementById("my-area").value, props.id)}>Сохранить</button><button onClick={() => setIsAddNotes(false)}>Закрыть</button></div> : ""}           


            </div>
        </div>
    );
}

export default Component;