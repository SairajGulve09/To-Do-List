//for emoji window + .

import React, {useState , useEffect} from "react";
function App() {

  //get local storage
//refresh kelya vr jaat nai
  const getLocalData = () =>{
    const lists = localStorage.getItem("mytodoList");
  
    if(lists)
    {
      return JSON.parse(lists);
    }
    else{
      return [];
    }
  };

const [inputData , setInputData] = useState("");
const [items , setItems] = useState(getLocalData());
const [isEditItem , setIsEditItem] = useState("");
const [toggleButton , setToggleButton] = useState(false);

//function to add items
const addItem = () =>{
  if(!inputData){
    alert("please fill the data");
  }
  else if(inputData && toggleButton)
  {
    setItems(
      items.map((curElem) => {
        if(curElem.id === isEditItem){
          return{...curElem, name: inputData}
        }
        return curElem;
      })
    );

    setInputData("");
    setIsEditItem(null);
    setToggleButton(false);
  }
  else{
    const myNewInputData = {
      id: new Date().getTime().toString(),
      name: inputData,
    }
    setItems([...items, myNewInputData]);
    setInputData("");
  }
};

//edit items
const editItem = (index) =>
{
  const item_todo_edited = items.find((curElem) =>{
    return curElem.id ===index;
  });
  

};

//how to delete item
const deleteItem = (index) => {
  const updatedItem = items.filter((curElem) =>{
      return curElem.id !== index;
  });
  setItems(updatedItem);
};

//remove all elements
const removeAll = () =>{
  setItems([]);
}

//adding local storage
useEffect(() => {
  localStorage.setItem("mytodoList",JSON.stringify(items))

 
}, [items]);





  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./todo.png" alt="xyz"/>
            <figcaption>Add your text here ✌️</figcaption>
          </figure>
          <div className="addItems">
            <input type="text" placeholder="✍️ Add your text" className="form-control" value={inputData} onChange={(event) => setInputData(event.target.value)}/>
            {toggleButton ? (<i className="fa fa-edit add-btn" onClick={addItem}></i>) : (<i className="fa fa-plus add-btn" onClick={addItem}></i>)}
            </div>

            <div className="showItems">
              {items.map((curElem , index) => {
                return(

                  <div className="eachItem" key={curElem.id}>
                <h3>{curElem.name}</h3>
                <div className="todo-btn">
                <i className="far fa-edit add-btn" onClick={() => editItem(curElem.id)}></i>          
                <i className="far fa-trash-alt add-btn" onClick={() => deleteItem(curElem.id)}></i>          

                </div>
              </div>

                );
              })}
              


            </div>

            <div className="showItems">
              <button className="btn effect04" data-sm-link-text = "Remove All" onClick={removeAll}>
                <span>CHECK LIST</span>
              </button>
            </div>
        </div>
      </div>
    </>
  );
}

export default App;
