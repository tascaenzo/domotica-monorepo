import { MQTT_MESSAGE_TYPE } from "../enums/mqtt-message-type.enum";

export interface MqttMessageInterface<T = unknown> {
  messageId?: string;
  macAddres: string;
  event: MQTT_MESSAGE_TYPE;
  pyload: T;
}
