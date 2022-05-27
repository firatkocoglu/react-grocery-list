import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
const List = (props) => {
  return (
    <div className='grocery-item'>
      <p className='title'>{props.itemTitle}</p>
      <div className='btn-container'>
        <FaEdit className='edit-btn' onClick={props.editHandler} />
        <FaTrash className='delete-btn' onClick={props.deleteHandler} />
      </div>
    </div>
  );
};

export default List;
