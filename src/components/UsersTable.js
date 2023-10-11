import React, { useState, useEffect } from 'react';
import axios from './axiosConfig';
import { Table, Button, Input } from 'antd';
import {
  PlusOutlined,
  SaveOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';

export default function UsersTable() {
  const [users, setUsers] = useState([]);
  const [editRow, setEditRow] = useState(null);

  useEffect(() => {
    axios.get('/users/list')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

const handleSaveClick = async () => {
  if (editRow.id === null) {
    // Register a new user
    axios.post('/users/register', editRow)
      .then(response => {
        setUsers([...users, response.data]);
        setEditRow(null);
      })
      .catch(error => {
        console.error('Error registering user:', error);
      });
  } else {
    // Update an existing user
    axios.put(`/users/update/${editRow.id}`, editRow)
      .then(response => {
        setUsers(users.map(user => (user.id === editRow.id ? response.data : user)));
        setEditRow(null);
      })
      .catch(error => {
        console.error('Error updating user:', error);
      });
  }
};


  const handleDeleteClick = async (id) => {
    axios.delete(`/users/delete/${id}`)
      .then(() => {
        setUsers(users.filter(user => user.id !== id));
      })
      .catch(error => {
        console.error('Error deleting user:', error);
      });
  };

  const handleCancelClick = () => {
    setEditRow(null);
  };

  const handleCellValueChange = (e, fieldName) => {
    setEditRow({ ...editRow, [fieldName]: e.target.value });
  };

const handleAddNewUser = () => {
  const newRow = { id: null, username: '', email: '', password: '' };
  setUsers([...users, newRow]);
  setEditRow(newRow);
};


  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      render: (text, row) => {
        return editRow?.id === row.id ? (
          <Input
            defaultValue={text}
            onChange={(e) => handleCellValueChange(e, 'username')}
          />
        ) : (
          text
        );
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text, row) => {
        return editRow?.id === row.id ? (
          <Input
            defaultValue={text}
            onChange={(e) => handleCellValueChange(e, 'email')}
          />
        ) : (
          text
        );
      },
    },
    {
      title: 'Password',
      dataIndex: 'password',
      key: 'password',
      render: (text, row) => {
        return editRow?.id === row.id ? (
          <Input.Password
            defaultValue={text}
            onChange={(e) => handleCellValueChange(e, 'password')}
          />
        ) : (
          '****'
        );
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, row) => (
        <>
          {editRow?.id === row.id ? (
            <>
              <Button
                icon={<SaveOutlined />}
                onClick={handleSaveClick}
              />
              <Button
                icon={<CloseCircleOutlined />}
                onClick={handleCancelClick}
              />
            </>
          ) : (
            <>
              <Button
                icon={<EditOutlined />}
                onClick={() => setEditRow(row)}
                style={{ marginRight: '5px' }}
              />
              <Button
                icon={<DeleteOutlined />}
                onClick={() => handleDeleteClick(row.id)}
              />
            </>
          )}
        </>
      ),
    },
  ];

  return (
    <>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleAddNewUser}
        style={{ marginBottom: '20px' }}
      >
        Add New User
      </Button>
      <Table dataSource={users} columns={columns} rowKey="id" />
    </>
  );
}
