import { SetMetadata } from "@nestjs/common";
import { USER_ROLE } from "@domotica/shared/enums";
import { ROLES_KEY } from "../guards/roles.guard";

export const Roles = (...roles: USER_ROLE[]) => SetMetadata(ROLES_KEY, roles);
