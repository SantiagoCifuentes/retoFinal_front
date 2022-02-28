import React, { useContext, useRef, useState } from 'react';
import { HOST_API, Store } from '../../App';
import List from '../TodoList';
import Form from '../TodoForm';


const ListForm = () => {
  const formRef = useRef(null);
  const { dispatch, state: { category } } = useContext(Store);
  const item = category.item;
  const [categoryState, setState] = useState(item);

  const onAdd = (event) => {
    event.preventDefault();

    const request = {
      name: categoryState.name,
      id: null
    };

    if (request.name !== undefined && request.name !== "" && request.name.length > 3) {
      fetch(HOST_API + "/todolist", {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then((category) => {
          dispatch({ type: "add-category-item", item: category });
          setState({ name: "" });
          formRef.current.reset();
        });
    }else{
      formRef.current.reset();
      alert("No se puede editar una tarea vacía y menos de 3 carácteres ");
    }
  }

  return <div className='container'>
    <form ref={formRef}>
      <input
        type="text"
        name="name"
        placeholder="¿Qué tipo de tareas para hoy?"
        defaultValue={item.name}
        onChange={(event) => {
          setState({ ...categoryState, name: event.target.value })
        }}  ></input>
      <button className="btn btn-outline-primary rounded" onClick={onAdd}>Crear</button>
    </form>
  </div>
}

export default ListForm; 