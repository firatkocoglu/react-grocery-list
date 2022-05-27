import React, { useState, useEffect } from 'react';
import List from './List';
import Alert from './Alert';

function App() {
  const [items, setItems] = useState([]);
  const [newValue, setNewValue] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [updateItemID, setUpdateItemID] = useState();
  const [isAlert, setIsAlert] = useState(false);
  const [alert, setAlert] = useState('');
  const [alertColor, setAlertColor] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      isAlert && setIsAlert(false);
    }, 3000);
    return () => {
      clearInterval(timer);
    };
  }, [isAlert]);

  const onValueChange = (e) => {
    setNewValue(e.target.value);
  };

  const editHandler = (id) => {
    setIsEdit(true);
    const update = items.find((item) => item.id === id);
    setUpdateItemID(update.id);
    setNewValue(update.itemName);
  };

  const deleteHandler = (id) => {
    let newFiltered = items.filter((filteredItem) => id !== filteredItem.id);
    setItems(newFiltered);
    setIsAlert(true);
    setAlert('Item Removed');
    setAlertColor('alert-danger');
  };

  const submitHandler = (e, id) => {
    const newItem = { id: new Date().getTime().toString(), itemName: newValue };

    e.preventDefault();
    if (newValue && !isEdit) {
      //To Add New Items
      setItems([...items, newItem]);
      setNewValue('');
      setIsAlert(true);
      setAlert('Item Added To The List');
      setAlertColor('alert-success');
    } else if (newValue && isEdit) {
      //To Update Existing Item
      setItems(
        items.map((item) => {
          if (item.id === updateItemID) {
            return { ...item, itemName: newValue };
          } else {
            return item;
          }
        })
      );
      setIsAlert(true);
      setAlert('Value Changed');
      setAlertColor('alert-success');
      setNewValue('');
      setUpdateItemID();
      setIsEdit(false);
    }
  };

  return (
    <section className='section-center'>
      <form className='grocery-form' onSubmit={submitHandler}>
        {isAlert && <Alert alert={alertColor} title={alert} />}
        <h3>Grocery Bud</h3>
        <div className='form-control'>
          <input
            id='newValue'
            name='newValue'
            type='text'
            className='grocery'
            placeholder='e.g. eggs'
            value={newValue}
            onChange={onValueChange}
          />
          <button className='submit-btn' type='submit'>
            {!isEdit ? 'Submit' : 'Edit'}
          </button>
        </div>
        <div className='grocery-container'>
          {items.map((item) => {
            const { id, itemName } = item;
            return (
              <div key={id}>
                <List
                  itemTitle={itemName}
                  editHandler={() => editHandler(id)}
                  deleteHandler={() => deleteHandler(id)}
                />
              </div>
            );
          })}
          {items.length > 0 && (
            <button
              className='clear-btn'
              onClick={() => {
                setItems([]);
                setIsAlert(true);
                setAlert('Empty List');
                setAlertColor('alert-danger');
              }}
            >
              Clear Items
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

export default App;
