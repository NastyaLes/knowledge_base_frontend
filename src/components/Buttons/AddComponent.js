const AddComponent = () => {

    const clickHandler = () => {
        let form = document.getElementById('form_new_component');
        let params = new FormData(form);
        fetch("http://mysite1/newcomponent.php", {
            method: 'POST',
            header: {"Content-Type": "multipart/form-data",
        },
        body: params
        })
        .then (response => response.text())
        .then (response => {console.log(response);
        })
    }

    return (
    <div>
        <form id="form_new_component">
            <div className='item'>
                <label>Название</label>
                <input className="input" type="text" name="namee"/>
            </div>

            <div className='item'>
                <label>Вид</label>
                <input className="input" type="text" name="view"/>
            </div>

            <div className='item'>
                <label>Параметры</label>
                <input className="input" type="text" name="parameter"/>
            </div>

            <div className='item'>
                <label>Сроки доставки</label>
                <input className="input" type="text" name="term"/>
            </div>

            <div>
                <button onClick={clickHandler}>Добавить компонент</button>
            </div>

        </form>
    </div>);
}

export default AddComponent;