import { useState } from "react";
import "./App.css";
import contactsDB from "./contacts.json";

function App() {
  const [contacts, setContacts] = useState(contactsDB.slice(0, 5));

  const randomContact = (arr) => {
    let randomIndex = Math.floor(Math.random() * arr.length);
    let randomAct = arr[randomIndex];
    if(contacts.some(contact => contact.name === randomAct.name)){
      randomContact(contactsDB.slice(5));
    } else{
      setContacts([...contacts, randomAct]);
    }
  };

  const sortName = () => {
    contacts.sort((a,b) => {
      if(a.name < b.name) {return -1;}
      if(a.name > b.name) {return 1;}
      return 0;
    });
    setContacts([...contacts]);
  };

  const sortPopularity = () => {
    contacts.sort((a,b) => {
      if(a.popularity < b.popularity) {return 1;}
      if(a.popularity > b.popularity) {return -1;}
      return 0;
    });
    setContacts([...contacts]);
  };

  const deleteContact = (contactId) => {
    const filteredContacts = contacts.filter(contact => {
      return contact.id !== contactId;
    });
    setContacts(filteredContacts);
  };

  return (
    <div className="App">
      <h1>IronContacts</h1>
      <div className="btns">
        <button className="add" onClick={() => randomContact(contactsDB.slice(5))}>
          Add Random Contact
        </button>
        <button className="sortPop" onClick={sortPopularity}>
          Sort by popularity
        </button>
        <button className="sortName" onClick={sortName}>
          Sort by name
        </button>
      </div>
      <table className="tableCon">
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won Oscar</th>
            <th>Won Emmy</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => {
            return (
              <tr key={contact.id}>
                <td>
                  <img
                    style={{ width: "80px" }}
                    src={contact.pictureUrl}
                    alt={contact.pictureUrl}
                  />
                </td>
                <td>{contact.name}</td>
                <td>{contact.popularity}</td>
                {contact.wonOscar ? <td>🏆</td> : <td></td>}
                {contact.wonEmmy ? <td>🏆</td> : <td></td>}
                <td><button onClick={() => deleteContact(contact.id)}>Delete</button></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default App;

