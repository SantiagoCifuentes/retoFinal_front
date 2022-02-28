import React, { useContext, useEffect } from 'react';
import { Store, HOST_API } from '../../App';



const Lista = () => {
  const { dispatch, state: { category, todo } } = useContext(Store);
  const currentList = category.list;

  useEffect(() => {
    fetch(HOST_API + "/todolist")
      .then(response => response.json())
      .then((list) => {
        dispatch({ type: "update-category-list", list })
      })
  }, [dispatch]);


  const onDelete = (id) => {
    fetch(HOST_API + "/todolist/" + id, {
      method: "DELETE"
    }).then((list) => {
      dispatch({ type: "delete-category-item", id })
    })
  };

  return <div>{
    currentList.map((category) => {
      return <div key={category.id} className='container mt-3'>
        <fieldset >
          <legend >
            <button className="btn btn-outline-danger btn-sm rounded" onClick={() => onDelete(category.id)}>Eliminar</button>
          </legend>
          <Form listId={category.id} todo={todo} />
          <List listId={category.id} todo={todo} />
        </fieldset>
      </div>
    })
  }
  </div>
}
export default Lista;