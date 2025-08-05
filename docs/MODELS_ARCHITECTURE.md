# 🏗️ Models Architecture - Clean & Modular Design

## 📁 **File Structure**
```
src/models/
├── user.model.ts          # User management với RBAC
├── role.model.ts          # Role definitions & inheritance  
├── permission.model.ts    # Permission caching & audit
├── tenant_model.ts        # Tenant info (đã có)
└── types/enum.ts          # Shared enums

src/configs/
└── permissions.ts         # Built-in role permissions (configuration)
```

## 🎯 **Design Philosophy**

### **1. Separation of Concerns**
- **User Model**: User info + role assignments
- **Role Model**: Role definitions + permissions  
- **Permission Model**: Caching + audit + mappings

### **2. Clean & Focused**
- Mỗi model có responsibility rõ ràng
- Minimal dependencies giữa models
- Easy to test và maintain

### **3. Performance Optimized**
- Smart indexing cho multi-tenant queries
- Permission caching với TTL
- Efficient role inheritance

## 🔧 **User Model (`user.model.ts`)**

### **Core Features:**
- ✅ Basic user information
- ✅ Multi-tenant role assignments
- ✅ System-level roles
- ✅ Security features (locking, password reset)
- ✅ Clean methods cho role management

### **Key Methods:**
```typescript
// Role management
user.addTenantAccess(tenantId, TenantRole.AUTHOR)
user.removeTenantAccess(tenantId)
user.getTenantRole(tenantId)
user.canAccessTenant(tenantId)

// Security
user.canLogin()
user.isAccountLocked()
```

### **Schema Highlights:**
```typescript
interface IUser {
    // Core info
    email, username, password, displayName
    
    // Role system
    systemRole?: SystemRole
    tenantRoles: Map<string, TenantRole>
    customRoleIds: string[]
    
    // Tenant associations
    primaryTenantId?: string
    associatedTenantIds: string[]
    
    // Security & status
    status, isEmailVerified, loginAttempts, lockUntil
}
```

## 🎭 **Role Model (`role.model.ts`)**

### **Core Features:**
- ✅ Flexible role definitions
- ✅ Permission rules với conditions
- ✅ Role inheritance
- ✅ Built-in vs custom roles
- ✅ Tenant-scoped roles

### **Key Methods:**
```typescript
// Permission management
role.hasPermission(permission, resourceType)
role.addPermission(permissionRule)
role.removePermission(permission, resourceType)
role.getAllPermissions() // Including inherited
```

### **Schema Highlights:**
```typescript
interface IRole {
    name: string                    // Unique identifier
    type: 'system' | 'tenant' | 'custom'
    tenantId?: string              // Scope
    permissions: IPermissionRule[] // Permission list
    inheritsFrom: string[]         // Parent roles
    isBuiltIn: boolean            // Protection flag
}

interface IPermissionRule {
    permission: Permission
    resourceType: ResourceType
    resourceId?: string           // Specific resource
    conditions?: {                // Dynamic conditions
        ownerId?: string
        status?: string[]
        custom?: Record<string, any>
    }
}
```

## 🛡️ **Permission Model (`permission.model.ts`)**

### **Core Features:**
- ✅ Permission caching cho performance
- ✅ Audit logging cho compliance
- ✅ TTL và cache invalidation
- ✅ Pure data models only

### **Models Included:**
1. **PermissionCache** - Performance caching
2. **PermissionAuditLog** - Compliance logging

### **Permission Cache:**
```typescript
interface IUserPermissionCache {
    userId: string
    tenantId?: string
    permissions: Permission[]           // Flat list
    resourcePermissions: Array<{        // Resource-specific
        resourceType: ResourceType
        resourceId?: string
        permissions: Permission[]
    }>
    expiresAt: Date                    // TTL
    version: number                    // Invalidation
}
```

### **Audit Logging:**
```typescript
interface IPermissionAuditLog {
    userId, tenantId, permission, resourceType
    granted: boolean
    reason?: string
    source?: string
    ipAddress, userAgent, requestPath  // Context
    timestamp, processingTime         // Metadata
}
```

## ⚙️ **Permission Configuration (`configs/permissions.ts`)**

### **Built-in Role Mappings:**
- ✅ System role permissions mapping
- ✅ Tenant role permissions mapping  
- ✅ Helper functions để get permissions
- ✅ Separated from data models## 🔄 **Built-in Role Mappings (`configs/permissions.ts`)**

### **System Roles:**
```typescript
SUPER_ADMIN     → All system permissions
SYSTEM_ADMIN    → Manage tenants, users, analytics  
PLATFORM_MANAGER→ View analytics, manage tenants
SUPPORT         → View analytics only
```

### **Tenant Roles:**
```typescript
TENANT_OWNER    → Full tenant control
TENANT_ADMIN    → User management + moderation
EDITOR_IN_CHIEF → Content management + publishing
EDITOR          → Content editing + moderation
AUTHOR          → Create/edit own stories
MODERATOR       → Content/comment moderation
TRANSLATOR      → Translation management
READER          → Basic interactions
```

### **Helper Functions:**
```typescript
getSystemRolePermissions(role: SystemRole): Permission[]
getTenantRolePermissions(role: TenantRole): Permission[]
getPermissionsByResourceType(resourceType: string): Permission[]
```

## 🚀 **Usage Examples**

### **1. User Creation với Role:**
```typescript
import { UserModel, TenantRole } from '../models/user.model';

const user = new UserModel({
    email: 'author@example.com',
    username: 'author123',
    password: 'securepass',
    displayName: 'John Author'
});

await user.save();
await user.addTenantAccess('tenant_123', TenantRole.AUTHOR);
```

### **2. Custom Role Creation:**
```typescript
import { RoleModel, Permission, ResourceType } from '../models/role.model';

const customRole = new RoleModel({
    name: 'premium_author',
    displayName: 'Premium Author',
    type: 'custom',
    tenantId: 'tenant_123',
    permissions: [
        {
            permission: Permission.CREATE_STORY,
            resourceType: ResourceType.STORY
        },
        {
            permission: Permission.VIEW_STORY_ANALYTICS,
            resourceType: ResourceType.STORY,
            conditions: { ownerId: 'self' }
        }
    ],
    createdBy: 'admin_user_id'
});

await customRole.save();
```

### **3. Permission Caching:**
```typescript
import { PermissionCacheModel } from '../models/permission.model';

// Create cache entry
const cache = new PermissionCacheModel({
    userId: 'user_123',
    tenantId: 'tenant_456',
    permissions: [Permission.CREATE_STORY, Permission.EDIT_STORY]
});

await cache.save();

// Check permission
const hasPermission = cache.hasPermission(Permission.CREATE_STORY);
```

## 📊 **Database Indexes**

### **Optimized for Multi-tenant Queries:**
```typescript
// User indexes
{ email: 1, status: 1 }
{ primaryTenantId: 1, status: 1 }
{ associatedTenantIds: 1, status: 1 }

// Role indexes  
{ type: 1, tenantId: 1, isActive: 1 }
{ name: 1, tenantId: 1 } (unique)

// Permission cache indexes
{ userId: 1, tenantId: 1 } (unique)
{ userId: 1, expiresAt: 1 }

// Audit log indexes
{ userId: 1, timestamp: -1 }
{ permission: 1, granted: 1, timestamp: -1 }
```

## 🎯 **Benefits**

### **1. Modular & Clean:**
- Easy to understand và maintain
- Clear separation of concerns
- Independent testing

### **2. Performance:**
- Smart caching strategy
- Optimized database queries
- Efficient inheritance resolution

### **3. Scalable:**
- Multi-tenant ready
- Role inheritance
- Custom roles support

### **4. Secure:**
- Audit logging
- Permission validation
- Account security features

### **5. Flexible:**
- Dynamic role assignment
- Custom permission rules
- Resource-level permissions

## 🔮 **Next Steps**

Models đã sẵn sàng cho:
1. **Permission Service** - Business logic layer
2. **Authentication Middleware** - Route protection
3. **Story/Chapter Models** - Content management
4. **API Controllers** - REST endpoints

**Architecture này cung cấp foundation mạnh mẽ và linh hoạt cho hệ thống phân quyền enterprise-level!** 🎉
