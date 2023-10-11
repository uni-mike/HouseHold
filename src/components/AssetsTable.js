import React, { useState, useEffect } from "react";
import axios from "./axiosConfig";
import { Table, Button, Input } from "antd";
import {
  PlusOutlined,
  SaveOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

export default function AssetsTable({ assets, onUpdate }) {
  const [rows, setRows] = useState(assets);
  const [editRow, setEditRow] = useState(null);

  useEffect(() => {
    setRows(assets);
  }, [assets]);

  const handleSaveClick = async (row) => {
    let updatedRows = [...rows];
    const originalRow = updatedRows.find((r) => r.id === row.id);

    if (row.id !== null) {
      updatedRows = updatedRows.map((r) => (r.id === row.id ? row : r));
    } else {
      updatedRows.push(row);
    }
    setRows(updatedRows);
    onUpdate(updatedRows);

    try {
      if (row.id !== null) {
        await axios.put(`/assets/${row.id}`, row);
      } else {
        const response = await axios.post("/assets", row);
        row.id = response.data.id;
        updatedRows = updatedRows.map((r) => (r.id === null ? row : r));
      }
    } catch (error) {
      if (row.id !== null && originalRow) {
        updatedRows = updatedRows.map((r) =>
          r.id === row.id ? originalRow : r
        );
      } else {
        updatedRows = updatedRows.filter((r) => r.id !== null);
      }
      setRows(updatedRows);
      onUpdate(updatedRows);
      console.error("API call failed", error);
    }

    setEditRow(null);
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
      title: "Actions",
      key: "actions",
      render: (text, row) => {
        return editRow?.id === row.id ? (
          <>
            <Button
              icon={<SaveOutlined />}
              onClick={() => handleSaveClick(editRow)}
            />
            <Button
              icon={<CloseCircleOutlined />}
              onClick={handleCancelClick}
            />
          </>
        ) : (
          <>
            <Button
              icon={<DeleteOutlined />}
              onClick={() => handleDeleteClick(row.id)}
            />
            <Button icon={<SaveOutlined />} onClick={() => setEditRow(row)} />
          </>
        );
      },
    },
  ];

  return (
    <div>
      <Button icon={<PlusOutlined />} onClick={handleAddNewItem}>
        Add New Item
      </Button>
      <Table dataSource={rows} columns={columns} rowKey="id" />
    </div>
  );
}
