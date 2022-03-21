import { useEffect, useState } from 'react';
import { CHANNEL_NAME } from '../../../global/constant';

export default function About() {
  const [data, setData] = useState('');
  const [storeData, setStoreData] = useState('');

  const fetchStore = async () => {
    const newStoreData = await window.electron.ipcRenderer.invoke(CHANNEL_NAME.ELECTRON_STORE, {
      name: 'user',
      method: 'get'
    });
    if (newStoreData) setStoreData(JSON.stringify(newStoreData));
  };

  useEffect(() => {
    fetchStore();
    const unsubscribeFunction = window.electron.SUBSCRIBE(CHANNEL_NAME.RECEIVE_MESSAGE, (response) => {
      if (response.type === 'data') setData(response.data);
    });

    return unsubscribeFunction;
  }, []);

  return (
    <div>
      <p>About</p>
      <p>
        data from message:
        {' '}
        {data}
      </p>
      <p>
        get user store&apos;s data:
        {' '}
        {storeData}
      </p>
    </div>
  );
}
