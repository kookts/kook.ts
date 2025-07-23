import { BaseClient } from '../../client/index.js';
import {
  BaseModel,
  BaseModelFactory,
  KBaseInterface,
  KPartialModel,
} from '../base.js';
import { KRole } from '../../api/guild-role/types.js';

export class Role extends BaseModel implements KRole {
  roleId: number;
  name: string;
  color: number;
  position: number;
  hoist: number;
  mentionable: number;
  permissions: number;
}

export class RoleFactory extends BaseModelFactory(Role) {
  public static create(data: KRole, client: BaseClient): Required<Role> {
    let role = super.create({ id: data.roleId.toString() }, client) as Role;
    Object.assign(role, data);
    role.roleId = data.roleId;
    role.name = data.name;
    role.color = data.color;
    role.position = data.position;
    role.hoist = data.hoist;
    role.mentionable = data.mentionable;
    role.permissions = data.permissions;
    return role as Required<Role>;
  }

  public static createById(
    roleId: number,
    client: BaseClient,
    data?: Partial<KRole>
  ): Role {
    let role = super.create({ id: roleId.toString() }, client) as Role;
    if (data) Object.assign(role, data);
    role.roleId = roleId;
    return role;
  }
}

export { KRole };
