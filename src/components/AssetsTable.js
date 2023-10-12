import React, { useState, useEffect } from 'react';
import axios from './axiosConfig';
import { Table, Button, Input, Modal } from 'antd';
import {
  PlusOutlined,
  SaveOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  QrcodeOutlined,
} from '@ant-design/icons';

export default function AssetsTable({ assets, onUpdate }) {
  const [rows, setRows] = useState(assets);
  const [editRow, setEditRow] = useState(null);
  const [qrModalVisible, setQRModalVisible] = useState(false);
  const [currentQRCode, setCurrentQRCode] = useState(null);

  useEffect(() => {
    setRows(assets);
  }, [assets]);

const handleSaveClick = async (row) => {
  let updatedRows = [...rows];
  const originalRow = updatedRows.find(r => r.id === row.id);

  // Optimistically update the UI
  if (row.id !== null) {
    updatedRows = updatedRows.map(r => (r.id === row.id ? row : r));
  }

  setRows(updatedRows);
  onUpdate(updatedRows);

  try {
    if (row.id !== null) {
      await axios.put(`/assets/${row.id}`, row);
    } else {
      const response = await axios.post('/assets', row);
      row.id = response.data.id;
      updatedRows = updatedRows.map(r => (r.id === null ? row : r));
      setRows(updatedRows); // Update the rows with new ID
      onUpdate(updatedRows); // Notify the parent component
    }
  } catch (error) {
    // Roll back the changes in case of an error
    if (row.id !== null && originalRow) {
      updatedRows = updatedRows.map(r => (r.id === row.id ? originalRow : r));
    } else {
      updatedRows = updatedRows.filter(r => r.id !== null);
    }
    setRows(updatedRows);
    onUpdate(updatedRows);
    console.error('API call failed', error);
  }

  setEditRow(null);
};

const handleQRClick = async (id) => {
  try {
    const response = await axios.get(`/getQR/${id}`, { responseType: 'arraybuffer' });
    const base64 = btoa(
      new Uint8Array(response.data).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        '',
      ),
    );
    setCurrentQRCode(`data:;base64,${base64}`);
  } catch (error) {
    console.error('Could not fetch QR code', error);
  }
  setQRModalVisible(true);
};



  const handleDeleteClick = async (id) => {
    await axios.delete(`/assets/${id}`);
    const updatedRows = rows.filter((r) => r.id !== id);
    setRows(updatedRows);
    onUpdate(updatedRows);
  };

  const handleCancelClick = () => {
    setEditRow(null);
  };

  const handleCellValueChange = (value, fieldName) => {
    setEditRow({ ...editRow, [fieldName]: value });
  };

  const handleAddNewItem = () => {
    const newRow = { id: null, name: "", value: "", description: "" };
    setRows([...rows, newRow]);
    setEditRow(newRow);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, row) => (
        <div onDoubleClick={() => setEditRow(row)}>
          {editRow?.id === row.id ? (
            <Input
              value={editRow.name}
              onChange={(e) => handleCellValueChange(e.target.value, "name")}
            />
          ) : (
            text
          )}
        </div>
      ),
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
      render: (text, row) => (
        <div onDoubleClick={() => setEditRow(row)}>
          {editRow?.id === row.id ? (
            <Input
              value={editRow.value}
              onChange={(e) => handleCellValueChange(e.target.value, "value")}
            />
          ) : (
            text
          )}
        </div>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text, row) => (
        <div onDoubleClick={() => setEditRow(row)}>
          {editRow?.id === row.id ? (
            <Input
              value={editRow.description}
              onChange={(e) =>
                handleCellValueChange(e.target.value, "description")
              }
            />
          ) : (
            text
          )}
        </div>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width : "15%",
      render: (text, row) => (
        <>
          {editRow?.id === row.id ? (
            <>
              <Button icon={<SaveOutlined />} onClick={() => handleSaveClick(editRow)} />
              <Button icon={<CloseCircleOutlined />} onClick={handleCancelClick} />
            </>
          ) : (
            <>
              <Button
                icon={<SaveOutlined />}
                onClick={() => setEditRow(row)}
                style={{ marginRight: '5px' }}
              />
              <Button icon={<DeleteOutlined />} onClick={() => handleDeleteClick(row.id)} style={{ marginRight: '5px' }}/>
              <Button icon={<QrcodeOutlined />} onClick={() => handleQRClick(row.id)} />
            </>
          )}
        </>
      ),
    },
  ];

  return (
    <div>
      <Button
        icon={<PlusOutlined />}
        onClick={handleAddNewItem}
        type='primary'
        style={{ marginBottom: '10px' }}
      >
        Add New Item
      </Button>
      <Table dataSource={rows} columns={columns} rowKey='id' />

        <Modal
          title="QR Code"
          visible={qrModalVisible}
          onCancel={() => setQRModalVisible(false)}
          footer={null}
          width={340}
          styles={{ body: { padding: 0 } }}
        >
          <div className="qr-modal">
            {currentQRCode ? <img className="qr-image" src={currentQRCode} alt="QR Code" /> : "Loading"}
          </div>
        </Modal>

    </div>
  );
}