import React, { useState, useEffect } from 'react';
import axios from './axiosConfig';
import { Table, Button, Input } from 'antd';
import { PlusOutlined, SaveOutlined, CloseCircleOutlined, DeleteOutlined } from '@ant-design/icons';

export default function AssetsTable({ assets, onUpdate }) {
  const [rows, setRows] = useState(assets);
  const [editRow, setEditRow] = useState(null);

  useEffect(() => {
    setRows(assets);
  }, [assets]);

  const handleSaveClick = (row) => {
    if (row.id) {
      axios.put(`/assets/${row.id}`, row).then(() => {
        setEditRow(null);
        onUpdate([...rows]);
      });
    } else {
      axios.post('/assets', row).then((response) => {
        const newRows = rows.filter(r => r.id !== null);
        newRows.push(response.data);
        setRows(newRows);
        onUpdate(newRows);
        setEditRow(null);
      });
    }
  };

  const handleDeleteClick = (id) => {
    axios.delete(`/assets/${id}`).then(() => {
      const updatedAssets = rows.filter((asset) => asset.id !== id);
      setRows(updatedAssets);
      onUpdate(updatedAssets);
    });
  };

  const handleCancelClick = () => {
    setRows(rows.filter(r => r.id !== null));
    setEditRow(null);
  };

  const handleCellValueChange = (e, fieldName) => {
    const value = e.target.value;
    setEditRow({ ...editRow, [fieldName]: value });
  };

  const handleAddNewItem = () => {
    const newItem = { id: null, name: '', value: '', description: '' };
    setRows([...assets, newItem]);
    setEditRow(newItem);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, row) => {
        return editRow && (editRow.id === row.id || editRow.id === null) ? (
          <Input
            value={editRow.name}
            onChange={(e) => handleCellValueChange(e, 'name')}
          />
        ) : (
          text
        );
      },
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      render: (text, row) => {
        return editRow && (editRow.id === row.id || editRow.id === null) ? (
          <Input
            value={editRow.value}
            onChange={(e) => handleCellValueChange(e, 'value')}
          />
        ) : (
          text
        );
      },
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text, row) => {
        return editRow && (editRow.id === row.id || editRow.id === null) ? (
          <Input
            value={editRow.description}
            onChange={(e) => handleCellValueChange(e, 'description')}
          />
        ) : (
          text
        );
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, row) => {
        return editRow && (editRow.id === row.id || editRow.id === null) ? (
          <>
            <Button icon={<SaveOutlined />} onClick={() => handleSaveClick(editRow)} />
            <Button icon={<CloseCircleOutlined />} onClick={handleCancelClick} />
          </>
        ) : (
          <>
            <Button icon={<SaveOutlined />} onClick={() => handleSaveClick(row)} />
            <Button icon={<DeleteOutlined />} onClick={() => handleDeleteClick(row.id)} />
          </>
        );
      },
    },
  ];

  return (
    <div>
      <Button icon={<PlusOutlined />} onClick={handleAddNewItem}>Add New Item</Button>
      <Table dataSource={rows} columns={columns} rowKey="id" />
    </div>
  );
}