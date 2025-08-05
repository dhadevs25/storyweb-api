import mongoose, { Schema, Document, Model } from 'mongoose';
import { Permission, ResourceType } from '../types/enum';

// Re-export for convenience
export { Permission, ResourceType };

// Permission with context interface
export interface IPermissionRule {
    permission: Permission;
    resourceType: ResourceType;
    resourceId?: string;                    // Specific resource ID (optional)
    conditions?: {                          // Dynamic conditions
        ownerId?: string;                   // Resource owner check
        status?: string[];                  // Resource status check
        custom?: Record<string, any>;       // Custom conditions
    };
}

// Role interface - pure data model
export interface IRole extends Document {
    // Basic info
    name: string;                           // Unique role identifier
    displayName: string;                    // Human-readable name
    description?: string;                   // Role description
    
    // Role type and scope
    type: 'system' | 'tenant' | 'custom';   // Role type
    tenantId?: string;                      // Tenant scope (null for system roles)
    
    // Permissions
    permissions: IPermissionRule[];         // List of permissions
    inheritsFrom: string[];                 // Parent role IDs for inheritance
    
    // Status and metadata
    isActive: boolean;
    isBuiltIn: boolean;                     // Cannot be deleted if true
    createdBy: string;                      // User who created this role
    createdAt: Date;
    updatedAt: Date;
}

// Role Schema - pure data structure with optimized indexes
const RoleSchema = new Schema<IRole>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            index: true
        },
        displayName: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100
        },
        description: {
            type: String,
            trim: true,
            maxlength: 500
        },
        
        // Type and scope
        type: {
            type: String,
            enum: ['system', 'tenant', 'custom'],
            required: true,
            index: true
        },
        tenantId: {
            type: String,
            index: true,
            validate: {
                validator: function(this: IRole, value: string) {
                    // System roles should not have tenantId
                    if (this.type === 'system' && value) return false;
                    // Tenant/custom roles should have tenantId
                    if ((this.type === 'tenant' || this.type === 'custom') && !value) return false;
                    return true;
                },
                message: 'TenantId validation failed based on role type'
            }
        },
        
        // Permissions array
        permissions: [{
            permission: {
                type: String,
                enum: Object.values(Permission),
                required: true
            },
            resourceType: {
                type: String,
                enum: Object.values(ResourceType),
                required: true
            },
            resourceId: {
                type: String
            },
            conditions: {
                ownerId: String,
                status: [String],
                custom: Schema.Types.Mixed
            }
        }],
        
        // Inheritance
        inheritsFrom: {
            type: [String],
            default: [],
            index: true
        },
        
        // Status
        isActive: {
            type: Boolean,
            default: true,
            index: true
        },
        isBuiltIn: {
            type: Boolean,
            default: false
        },
        createdBy: {
            type: String,
            required: true,
            index: true
        }
    },
    {
        timestamps: true
    }
);

// Optimized compound indexes for multi-tenant role queries
RoleSchema.index({ type: 1, tenantId: 1, isActive: 1 });
RoleSchema.index({ tenantId: 1, isActive: 1 });
RoleSchema.index({ name: 1, tenantId: 1 }, { unique: true });
RoleSchema.index({ inheritsFrom: 1 });
RoleSchema.index({ createdBy: 1, type: 1 });

// Pre-save validation for system roles
RoleSchema.pre('save', function(next) {
    // Ensure system roles don't have tenant-specific configurations
    if (this.type === 'system' && this.tenantId) {
        this.tenantId = undefined;
    }
    
    next();
});

export const RoleModel: Model<IRole> = mongoose.model('roles', RoleSchema);
