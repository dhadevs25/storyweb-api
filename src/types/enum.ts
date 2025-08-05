export enum SubscriptionPlan {
    BASIC = 'basic',
    PREMIUM = 'premium'
}

export enum TenantStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive'
}

// ========================================
// RBAC SYSTEM ENUMS
// ========================================

// System-level roles (Quản trị hệ thống)
export enum SystemRole {
    SUPER_ADMIN = 'super_admin',        // Quản trị tối cao
    SYSTEM_ADMIN = 'system_admin',      // Quản trị hệ thống
    PLATFORM_MANAGER = 'platform_manager', // Quản lý nền tảng
    SUPPORT = 'support'                 // Hỗ trợ kỹ thuật
}

// Tenant-level roles (Trong từng tenant)
export enum TenantRole {
    TENANT_OWNER = 'tenant_owner',      // Chủ sở hữu tenant
    TENANT_ADMIN = 'tenant_admin',      // Quản trị tenant
    EDITOR_IN_CHIEF = 'editor_in_chief', // Tổng biên tập
    EDITOR = 'editor',                  // Biên tập viên
    AUTHOR = 'author',                  // Tác giả
    MODERATOR = 'moderator',            // Kiểm duyệt viên
    TRANSLATOR = 'translator',          // Dịch giả
    READER = 'reader'                   // Người đọc
}

// User status
export enum UserStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    BANNED = 'banned',
    PENDING = 'pending'
}

// Gender
export enum Gender {
    MALE = 'male',
    FEMALE = 'female',
    OTHER = 'other'
}

// Application-level permissions
export enum Permission {
    // System permissions
    MANAGE_SYSTEM = 'manage_system',
    MANAGE_TENANTS = 'manage_tenants',
    VIEW_SYSTEM_ANALYTICS = 'view_system_analytics',
    MANAGE_SYSTEM_USERS = 'manage_system_users',
    
    // Tenant management
    MANAGE_TENANT_SETTINGS = 'manage_tenant_settings',
    MANAGE_TENANT_USERS = 'manage_tenant_users',
    VIEW_TENANT_ANALYTICS = 'view_tenant_analytics',
    MANAGE_TENANT_BILLING = 'manage_tenant_billing',
    
    // Content management
    CREATE_STORY = 'create_story',
    EDIT_STORY = 'edit_story',
    DELETE_STORY = 'delete_story',
    PUBLISH_STORY = 'publish_story',
    MODERATE_CONTENT = 'moderate_content',
    MANAGE_CATEGORIES = 'manage_categories',
    
    // Chapter management
    CREATE_CHAPTER = 'create_chapter',
    EDIT_CHAPTER = 'edit_chapter',
    DELETE_CHAPTER = 'delete_chapter',
    PUBLISH_CHAPTER = 'publish_chapter',
    
    // Translation
    CREATE_TRANSLATION = 'create_translation',
    EDIT_TRANSLATION = 'edit_translation',
    MANAGE_LANGUAGES = 'manage_languages',
    
    // User interactions
    COMMENT = 'comment',
    RATE_STORY = 'rate_story',
    BOOKMARK = 'bookmark',
    FOLLOW_AUTHOR = 'follow_author',
    
    // Moderation
    MODERATE_COMMENTS = 'moderate_comments',
    BAN_USERS = 'ban_users',
    DELETE_COMMENTS = 'delete_comments',
    
    // Analytics and reports
    VIEW_STORY_ANALYTICS = 'view_story_analytics',
    VIEW_USER_ANALYTICS = 'view_user_analytics',
    EXPORT_DATA = 'export_data'
}

// Resource types for fine-grained permissions
export enum ResourceType {
    SYSTEM = 'system',
    TENANT = 'tenant',
    STORY = 'story',
    CHAPTER = 'chapter',
    USER = 'user',
    COMMENT = 'comment',
    CATEGORY = 'category'
}
