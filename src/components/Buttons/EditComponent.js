import { useState } from 'react';

const EditComponent = (props) => {

    const [answer, setAnswer] = useState("");

    const PostApiComponent = async () => {
        var form = document.getElementById('editcomponentform')
        var params = new FormData(form);
        const requestOptions = {
            method: 'POST',
            body: params
        };
        const response = await fetch("http://mysite1/edit_component.php", requestOptions)
        const data = await response.text()
        setAnswer(data)
    }

    const ClickEditComponent = (e) => {
        e.preventDefault()
        PostApiComponent()
    }

    return (
        <div>
        <form id="editcomponentform">
            <div className='item'>
                <label>Название</label>
                <input className="input" type="text" name="namee" value={props.namee}/>
            </div>

            <div className='item'>
                <label>Вид</label>
                <input className="input" type="text" name="view" value={props.view}/>
            </div>

            <div className='item'>
                <label>Параметры</label>
                <input className="input" type="text" name="parameter" value={props.parameter}/>
            </div>

            <div className='item'>
                <label>Сроки доставки</label>
                <input className="input" type="text" name="term"/>
            </div>

            <div>
                <button onClick={ClickEditComponent}>Сохранить изменения</button>
            </div>

        </form>
        {answer}
        </div>
    );
}

export default EditComponent;