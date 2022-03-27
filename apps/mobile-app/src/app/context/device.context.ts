import { IotDeviceEventInterface } from '@domotica/shared/interfaces';
import { createContext, useEffect, useMemo, useState } from 'react';
import EventSource from 'react-native-sse';

const apiUrl = 'http://192.168.1.71:3000/api/iot-devices/sse';

interface EventInterface {
  type: string;
  data: string;
}

interface IotDeviceCtxStateInterface {
  devices: IotDeviceEventInterface[];
  getDevice: (id: string) => IotDeviceEventInterface | undefined;
  setDevice: (device: IotDeviceEventInterface) => void;
}

const DeviceContext = createContext<IotDeviceCtxStateInterface | null>(null);

const UseDeviceListener = () => {
  const deviceMap = useMemo(
    () => new Map<string, IotDeviceEventInterface>(),
    []
  );
  const [devices, setDevices] = useState<IotDeviceEventInterface[]>([]);
  const getDevice = (id: string) => deviceMap.get(id);
  const setDevice = (device: IotDeviceEventInterface) =>
    deviceMap.set(device.deviceId, device);

  useEffect(() => {
    const source = new EventSource(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    source.addEventListener('message', (e) => {
      const data: IotDeviceEventInterface = JSON.parse(
        String((e as EventInterface).data)
      );

      // deviceMap.set(data.deviceId, data);

      if (!deviceMap.get(data.deviceId)) return;

      deviceMap.set(data.deviceId, data);
      setDevices(Array.from(deviceMap.values()));
    });

    return () => {
      source.close();
    };
  }, [deviceMap]);

  return { devices, getDevice, setDevice };
};

export { DeviceContext, UseDeviceListener };
