import React, { useEffect, useState } from 'react';
import axios from './axiosConfig';
import UsersTable from './UsersTable';

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('/users/list')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const updateUsers = (updatedUsers) => {
    setUsers(updatedUsers);
  };

  return (
    <div>
      <h1>Users</h1>
      <UsersTable users={users} onUpdate={updateUsers} />
    </div>
  );
}

export default Users;
