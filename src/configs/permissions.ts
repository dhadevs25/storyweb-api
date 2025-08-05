import { Permission, SystemRole, TenantRole } from '../types/enum';

// Permission mapping interfaces
export interface ISystemPermissionMapping {
    role: SystemRole;
    permissions: Permission[];
}

export interface ITenantPermissionMapping {
    role: TenantRole;
    permissions: Permission[];
}

// Built-in system role permissions - configuration data
export const SYSTEM_ROLE_PERMISSIONS: ISystemPermissionMapping[] = [
    {
        role: SystemRole.SUPER_ADMIN,
        permissions: [
            Permission.MANAGE_SYSTEM,
            Permission.MANAGE_TENANTS,
            Permission.VIEW_SYSTEM_ANALYTICS,
            Permission.MANAGE_SYSTEM_USERS
        ]
    },
    {
        role: SystemRole.SYSTEM_ADMIN,
        permissions: [
            Permission.MANAGE_TENANTS,
            Permission.VIEW_SYSTEM_ANALYTICS,
            Permission.MANAGE_SYSTEM_USERS
        ]
    },
    {
        role: SystemRole.PLATFORM_MANAGER,
        permissions: [
            Permission.VIEW_SYSTEM_ANALYTICS,
            Permission.MANAGE_TENANTS
        ]
    },
    {
        role: SystemRole.SUPPORT,
        permissions: [
            Permission.VIEW_SYSTEM_ANALYTICS
        ]
    }
];

// Built-in tenant role permissions - configuration data
export const TENANT_ROLE_PERMISSIONS: ITenantPermissionMapping[] = [
    {
        role: TenantRole.TENANT_OWNER,
        permissions: [
            Permission.MANAGE_TENANT_SETTINGS,
            Permission.MANAGE_TENANT_USERS,
            Permission.VIEW_TENANT_ANALYTICS,
            Permission.MANAGE_TENANT_BILLING,
            Permission.CREATE_STORY,
            Permission.EDIT_STORY,
            Permission.DELETE_STORY,
            Permission.PUBLISH_STORY,
            Permission.MODERATE_CONTENT,
            Permission.MANAGE_CATEGORIES,
            Permission.CREATE_CHAPTER,
            Permission.EDIT_CHAPTER,
            Permission.DELETE_CHAPTER,
            Permission.PUBLISH_CHAPTER,
            Permission.MODERATE_COMMENTS,
            Permission.BAN_USERS,
            Permission.DELETE_COMMENTS,
            Permission.VIEW_STORY_ANALYTICS,
            Permission.VIEW_USER_ANALYTICS,
            Permission.EXPORT_DATA
        ]
    },
    {
        role: TenantRole.TENANT_ADMIN,
        permissions: [
            Permission.MANAGE_TENANT_USERS,
            Permission.VIEW_TENANT_ANALYTICS,
            Permission.MODERATE_CONTENT,
            Permission.MODERATE_COMMENTS,
            Permission.BAN_USERS,
            Permission.DELETE_COMMENTS,
            Permission.VIEW_STORY_ANALYTICS,
            Permission.VIEW_USER_ANALYTICS
        ]
    },
    {
        role: TenantRole.EDITOR_IN_CHIEF,
        permissions: [
            Permission.CREATE_STORY,
            Permission.EDIT_STORY,
            Permission.DELETE_STORY,
            Permission.PUBLISH_STORY,
            Permission.MODERATE_CONTENT,
            Permission.MANAGE_CATEGORIES,
            Permission.CREATE_CHAPTER,
            Permission.EDIT_CHAPTER,
            Permission.DELETE_CHAPTER,
            Permission.PUBLISH_CHAPTER,
            Permission.MODERATE_COMMENTS,
            Permission.VIEW_STORY_ANALYTICS
        ]
    },
    {
        role: TenantRole.EDITOR,
        permissions: [
            Permission.EDIT_STORY,
            Permission.MODERATE_CONTENT,
            Permission.CREATE_CHAPTER,
            Permission.EDIT_CHAPTER,
            Permission.DELETE_CHAPTER,
            Permission.MODERATE_COMMENTS
        ]
    },
    {
        role: TenantRole.AUTHOR,
        permissions: [
            Permission.CREATE_STORY,
            Permission.EDIT_STORY,
            Permission.CREATE_CHAPTER,
            Permission.EDIT_CHAPTER,
            Permission.PUBLISH_CHAPTER,
            Permission.VIEW_STORY_ANALYTICS
        ]
    },
    {
        role: TenantRole.MODERATOR,
        permissions: [
            Permission.MODERATE_CONTENT,
            Permission.MODERATE_COMMENTS,
            Permission.DELETE_COMMENTS
        ]
    },
    {
        role: TenantRole.TRANSLATOR,
        permissions: [
            Permission.CREATE_TRANSLATION,
            Permission.EDIT_TRANSLATION,
            Permission.MANAGE_LANGUAGES
        ]
    },
    {
        role: TenantRole.READER,
        permissions: [
            Permission.COMMENT,
            Permission.RATE_STORY,
            Permission.BOOKMARK,
            Permission.FOLLOW_AUTHOR
        ]
    }
];

// Helper functions to get permissions by role
export const getSystemRolePermissions = (role: SystemRole): Permission[] => {
    const mapping = SYSTEM_ROLE_PERMISSIONS.find(m => m.role === role);
    return mapping ? mapping.permissions : [];
};

export const getTenantRolePermissions = (role: TenantRole): Permission[] => {
    const mapping = TENANT_ROLE_PERMISSIONS.find(m => m.role === role);
    return mapping ? mapping.permissions : [];
};

// Get all available permissions for a specific resource type
export const getPermissionsByResourceType = (resourceType: string): Permission[] => {
    // This will be implemented based on enum definitions
    return Object.values(Permission).filter(permission => {
        // Add logic to filter permissions by resource type if needed
        return true;
    });
};
