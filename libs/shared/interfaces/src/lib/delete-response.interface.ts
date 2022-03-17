import { RESOURCE, RESPONSE_STATUS } from "@domotica/shared/enums";

export interface DeleteResponseInterface {
  status: RESPONSE_STATUS;
  resorce?: RESOURCE;
  id?: string;
}
