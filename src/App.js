import Component from "./components/Catalog/Component";
import AddComponent from "./components/Buttons/AddComponent";
import EditComponent from "./components/Buttons/EditComponent";
import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";


const App = () => {

  const myCookie = Cookies.get('role')

  const navigate = useNavigate()

  const getApiComponents = async () => {
    const response = await fetch(
      "http://mysite1/get_components.php"
    ).then((response) => response.json());
  
    setComponents(response);
  };

  const getApiFilter = async () => {
    const response = await fetch(
      "http://mysite1/views.php"
    ).then((response) => response.json());
  
    setViews(response);
  };

  useEffect(() => {
    if (myCookie) {
      getApiComponents();
      getApiFilter();
      }
  }, []);

  const count = 0

  const [components, setComponents] = useState([]);
  const [views, setViews] = useState([]);

  const [isAddComponent, setisAddComponent] = useState(false);


  const [isEditComponent, setIsEditComponent] = useState(false);
  const [UpdateComponent, setUpdateComponent] = useState([]);

  const EditComponentHandler = (name, view, parameter, date) => {
    setIsEditComponent(true)
    setUpdateComponent([name, view, parameter, date])
}

  const exitHandler = () => {
    Cookies.remove('role')
    navigate('/')
  }

  const changeSelectHandler = (event) => {
    var params = new URLSearchParams(); 
    params.set('select', event.target.value);
    fetch("http://mysite1/filter_view.php", {
      method: 'POST',
      body: params
  })
  .then (response => response.json())
  .then (response => {console.log(response);
    setComponents(response);
  })
}

  if (myCookie) {
      return (
      <div>
        <h1>Все компоненты</h1>

        {isAddComponent ? <div><div><AddComponent /></div><button onClick={() => setisAddComponent(false)}>Закрыть</button></div> : ""}
        {isEditComponent ? <div><EditComponent namee={UpdateComponent[0]} view={UpdateComponent[1]} parameter={UpdateComponent[2]} date={UpdateComponent[3]}/><button onClick={() => setIsEditComponent(false)}>Закрыть</button></div> : ""}             
        {myCookie === "id_role = 3" ? <button onClick={() => setisAddComponent(true)}>+ Добавить компонент</button> : <div></div>}
        <label>
          Фильтровать по: <select className="selectedFruit" onChange={changeSelectHandler}>
            {views.map((view) => (
        <option key={count + 1} value={view.name_view}>{view.name_view}</option>
        ))}
        </select>
      </label>
          <div className="container">
            {components.map((user) => (
              <div className='component'>
              <Component id={user.id_component} namee={user.name_component} image={user.image} view={user.name_view} parameters={user.parameters} date={user.delivery_date} techinfo={user.technical_information}/>
              
              {myCookie === "id_role = 4" ? <button id="button_edit_component" onClick={() => EditComponentHandler(user.name_component, user.name_view, user.parameters, user.delivery_date)}>Редактировать компонент</button> : <div></div>}
              </div>
          ))}
          </div>
          <button className='button_exit' onClick={exitHandler}>Выйти</button>
          </div>
          );}
          else {
            return (
            <div className="error">Войдите в систему, чтобы продолжить</div>
            );
          }
}

export default App;
