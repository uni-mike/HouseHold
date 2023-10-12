import React, { useEffect, useState } from 'react';
import axios from './axiosConfig';
import AssetsTable from './AssetsTable';
import { ConfigProvider } from 'antd';

function Assets() {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    axios.get('/assets')
      .then(response => setAssets(response.data))
      .catch(error => console.error('Error fetching data: ', error));
  }, []);

  const updateAssets = (updatedAssets) => {
    setAssets(updatedAssets);
  };

  return (
    <div>
      <h1>Assets</h1>
      <ConfigProvider theme="light">
        <AssetsTable assets={assets} onUpdate={updateAssets} />
      </ConfigProvider>
    </div>
  );
}

export default Assets;
