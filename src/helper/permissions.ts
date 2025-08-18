import { RolePermission } from '../models/role/base.js';

/**
 * Channel permission helper class for managing allow/deny permission bits
 * Provides utilities to add, remove, check, and calculate permission values
 */
export class ChannelPermissionHelper {
  private _allow: number;
  private _deny: number;

  /**
   * Create a new ChannelPermissionHelper
   * @param allow Initial allow permissions (default: 0)
   * @param deny Initial deny permissions (default: 0)
   */
  constructor(allow: number = 0, deny: number = 0) {
    this._allow = allow;
    this._deny = deny;
  }

  /**
   * Create a helper from existing allow/deny values
   * @param allow Allow permissions
   * @param deny Deny permissions
   * @returns New ChannelPermissionHelper instance
   */
  static from(allow: number, deny: number): ChannelPermissionHelper {
    return new ChannelPermissionHelper(allow, deny);
  }

  /**
   * Create a helper with only allow permissions
   * @param permissions Permissions to allow
   * @returns New ChannelPermissionHelper instance
   */
  static fromAllows(
    ...permissions: (RolePermission | number)[]
  ): ChannelPermissionHelper {
    const allow = permissions.reduce((acc, perm) => acc | perm, 0);
    return new ChannelPermissionHelper(allow, 0);
  }

  /**
   * Create a helper with only deny permissions
   * @param permissions Permissions to deny
   * @returns New ChannelPermissionHelper instance
   */
  static fromDenies(
    ...permissions: (RolePermission | number)[]
  ): ChannelPermissionHelper {
    const deny = permissions.reduce((acc, perm) => acc | perm, 0);
    return new ChannelPermissionHelper(0, deny);
  }

  /**
   * Add permission(s) to the allow list
   * @param permissions Permissions to allow
   * @returns This helper for chaining
   */
  addAllows(...permissions: (RolePermission | number)[]): this {
    for (const permission of permissions) {
      this._allow |= permission;
      // Remove from deny if it was there
      this._deny &= ~permission;
    }
    return this;
  }

  /**
   * Add permission(s) to the deny list
   * @param permissions Permissions to deny
   * @returns This helper for chaining
   */
  addDenies(...permissions: (RolePermission | number)[]): this {
    for (const permission of permissions) {
      this._deny |= permission;
      // Remove from allow if it was there
      this._allow &= ~permission;
    }
    return this;
  }

  /**
   * Remove permission(s) from both allow and deny lists
   * @param permissions Permissions to remove
   * @returns This helper for chaining
   */
  remove(...permissions: (RolePermission | number)[]): this {
    for (const permission of permissions) {
      this._allow &= ~permission;
      this._deny &= ~permission;
    }
    return this;
  }

  /**
   * Remove permission(s) from allow list only
   * @param permissions Permissions to remove from allow
   * @returns This helper for chaining
   */
  removeAllows(...permissions: (RolePermission | number)[]): this {
    for (const permission of permissions) {
      this._allow &= ~permission;
    }
    return this;
  }

  /**
   * Remove permission(s) from deny list only
   * @param permissions Permissions to remove from deny
   * @returns This helper for chaining
   */
  removeDenies(...permissions: (RolePermission | number)[]): this {
    for (const permission of permissions) {
      this._deny &= ~permission;
    }
    return this;
  }

  /**
   * Check if a permission is explicitly allowed
   * @param permission Permission to check
   * @returns True if permission is in allow list
   */
  isAllowed(permission: RolePermission | number): boolean {
    return (this._allow & permission) === permission;
  }

  /**
   * Check if a permission is explicitly denied
   * @param permission Permission to check
   * @returns True if permission is in deny list
   */
  isDenied(permission: RolePermission | number): boolean {
    return (this._deny & permission) === permission;
  }

  /**
   * Check if a permission is neither allowed nor denied
   * @param permission Permission to check
   * @returns True if permission is neutral (inherits from parent)
   */
  isInherited(permission: RolePermission | number): boolean {
    return !this.isAllowed(permission) && !this.isDenied(permission);
  }

  /**
   * Get the current allow permissions value
   * @returns Allow permissions as number
   */
  get allowValue(): number {
    return this._allow;
  }

  /**
   * Get the current deny permissions value
   * @returns Deny permissions as number
   */
  get denyValue(): number {
    return this._deny;
  }

  /**
   * Set allow permissions directly
   * @param value New allow value
   */
  set allowValue(value: number) {
    this._allow = value;
  }

  /**
   * Set deny permissions directly
   * @param value New deny value
   */
  set denyValue(value: number) {
    this._deny = value;
  }

  /**
   * Get a list of all permissions that are explicitly allowed
   * @returns Array of RolePermission enum values that are allowed
   */
  listAllowed(): RolePermission[] {
    const permissions: RolePermission[] = [];
    for (const permission of Object.values(RolePermission)) {
      if (typeof permission === 'number' && this.isAllowed(permission)) {
        permissions.push(permission);
      }
    }
    return permissions;
  }

  /**
   * Get a list of all permissions that are explicitly denied
   * @returns Array of RolePermission enum values that are denied
   */
  listDenied(): RolePermission[] {
    const permissions: RolePermission[] = [];
    for (const permission of Object.values(RolePermission)) {
      if (typeof permission === 'number' && this.isDenied(permission)) {
        permissions.push(permission);
      }
    }
    return permissions;
  }

  /**
   * Clear all permissions (both allow and deny)
   * @returns This helper for chaining
   */
  clear(): this {
    this._allow = 0;
    this._deny = 0;
    return this;
  }

  /**
   * Clear only allow permissions
   * @returns This helper for chaining
   */
  clearAllow(): this {
    this._allow = 0;
    return this;
  }

  /**
   * Clear only deny permissions
   * @returns This helper for chaining
   */
  clearDeny(): this {
    this._deny = 0;
    return this;
  }

  /**
   * Clone this helper
   * @returns New ChannelPermissionHelper with same permissions
   */
  clone(): ChannelPermissionHelper {
    return new ChannelPermissionHelper(this._allow, this._deny);
  }

  /**
   * Get a summary of all permissions
   * @returns Object with allowed, denied, and inherited permission lists
   */
  summary(): {
    allowed: RolePermission[];
    denied: RolePermission[];
    inherited: RolePermission[];
  } {
    const allowed: RolePermission[] = [];
    const denied: RolePermission[] = [];
    const inherited: RolePermission[] = [];

    for (const permission of Object.values(RolePermission)) {
      if (typeof permission === 'number') {
        if (this.isAllowed(permission)) {
          allowed.push(permission);
        } else if (this.isDenied(permission)) {
          denied.push(permission);
        } else {
          inherited.push(permission);
        }
      }
    }

    return { allowed, denied, inherited };
  }

  /**
   * Convert to string representation
   * @returns String representation of permissions
   */
  toString(): string {
    const summary = this.summary();
    return `ChannelPermissionHelper { allow: ${this._allow}, deny: ${this._deny}, allowed: ${summary.allowed.length}, denied: ${summary.denied.length} }`;
  }

  /**
   * Get permissions as an object with allow and deny values
   * @returns Object with allow and deny numbers
   */
  toObject(): { allow: number; deny: number } {
    return {
      allow: this._allow,
      deny: this._deny,
    };
  }
}

/**
 * Combine multiple permission values using bitwise OR
 * @param permissions Permissions to combine
 * @returns Combined permission value
 */
export function combinePermissions(
  ...permissions: (RolePermission | number)[]
): number {
  return permissions.reduce((acc, perm) => acc | perm, 0);
}

/**
 * Check if a permission value contains a specific permission
 * @param value Permission value to check
 * @param permission Permission to look for
 * @returns True if the value contains the permission
 */
export function hasPermission(
  value: number,
  permission: RolePermission | number
): boolean {
  return (value & permission) === permission;
}

/**
 * Add a permission to a permission value
 * @param value Current permission value
 * @param permission Permission to add
 * @returns New permission value with permission added
 */
export function addPermission(
  value: number,
  permission: RolePermission | number
): number {
  return value | permission;
}

/**
 * Remove a permission from a permission value
 * @param value Current permission value
 * @param permission Permission to remove
 * @returns New permission value with permission removed
 */
export function removePermission(
  value: number,
  permission: RolePermission | number
): number {
  return value & ~permission;
}

/**
 * Get a list of all permissions contained in a permission value
 * @param value Permission value to analyze
 * @returns Array of RolePermission enum values
 */
export function listPermissions(value: number): RolePermission[] {
  const permissions: RolePermission[] = [];
  for (const permission of Object.values(RolePermission)) {
    if (typeof permission === 'number' && hasPermission(value, permission)) {
      permissions.push(permission);
    }
  }
  return permissions;
}
