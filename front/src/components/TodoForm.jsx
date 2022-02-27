import React, { useRef, useState, useContext } from 'react'
import App from '../App';


const Form = (props) => {
    const formRef = useRef(null);
    const { dispatch, state: { todo } } = useContext(props.Store);
    const item = todo.item;
    const [state, setState] = useState(item);
  
    const onAdd = (event) => {
     
      event.preventDefault();
      
      
      
      const request = {
        name: state.name,
        id: null,
        completed: false
      };

      //validación para no agregar un todo vacío 
      if(request.name !== undefined && request.name !=="" && request.name.length > 3)
      {

        fetch(props.HOST_API+ "/todolist", {
          method: "POST",
          body: JSON.stringify(request),
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(response => response.json())
          .then((todo) => {
            dispatch({ type: "add-item", item: todo });
            setState({ name: "" });
            formRef.current.reset();
          });
      }
      else{formRef.current.reset();
      alert("No se puede agregar una tarea vacía y menos de 3 carácteres ");}
      
  
      
    
    }
  
    const onEdit = (event) => {
      
      event.preventDefault();
      
  
      const request = {
        name: state.name,
        id: item.id,
        isCompleted: item.isCompleted
      };
  
      if(request.name !== undefined && request.name !=="" && request.name.length < 3)  
      {
        fetch(props.HOST_API + "/actualizarLista", {
          method: "PUT",
          body: JSON.stringify(request),
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(response => response.json())
          .then((todo) => {
            dispatch({ type: "update-item", item: todo });
            setState({ name: "" });
            formRef.current.reset();
          });
      }else {formRef.current.reset();
        alert("No se puede editar una tarea vacía y menos de 3 carácteres ");}
        
      

  
     
    }
  
    return <form ref={formRef}>
      <input
        type="text"
        name="name"
        placeholder="¿Qué piensas hacer hoy?"
        defaultValue={item.name}
        onChange={(event) => {
          setState({ ...state, name: event.target.value })
        }}  ></input>
      {item.id && <button className="btn btn-success" onClick={onEdit}>Actualizar</button>}
      {!item.id && <button className="btn btn-success" onClick={onAdd}>Crear</button>}
    </form>
  }

  
export default Form