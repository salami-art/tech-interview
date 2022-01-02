import './App.css';
import { useEffect, useState } from 'react';
import ListUser from './components/ListUser'; 
import  { getUsers } from './api/userApi'
import { parseUser, userProps } from './utils/user';
import UserCard from './components/UserCard';

function App() {
  const [userList, setUserList] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const onUserSelected = (id) => {
    if (userList.length === 0) return;
    setCurrentUser(parseUser(userList.find( e => e.id === id)))
  }

  const setNewUser = () => {
    setCurrentUser(Object.keys(userProps).reduce((acc, c )=> ({ ...acc, [c]: '' }), {}))
  }

  useEffect( () => {
    getUsers().then( users =>{
      setUserList(users.sort((a, b) => a.value - b.value ))
    });
  }, [])

  return (
    <div className="users_wrapper">
      <div className="editor_area">
        {!currentUser
          ?
          <h1>Click a user to edit or add a new user</h1>
          :
          <UserCard editingMode={!currentUser.id} user={currentUser} />
        }
      </div>
      <ul className="users_list">
        <li>
          <button
            className="new_user_button"
            type="button"
            title="Add New User"
            onClick={() => setNewUser()}
          >
            + Add New User
          </button>
        </li>
        {!!userList.length && userList.map((user) =>
          <ListUser
            active={!!currentUser && currentUser.id === user.id}
            key={user.id}
            {...{...user, ...{onUserSelected}}}
          />
        )}
      </ul>
    </div>
  );
}

export default App;
