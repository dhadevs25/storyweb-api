import mongoose, { Schema, Document, Model } from 'mongoose';
import { Permission, ResourceType } from '../types/enum';

// Re-export for convenience
export { Permission, ResourceType };

// Main Permission entity - represents individual permissions in the system
export interface IPermission extends Document {
    // Basic permission info
    name: Permission;                       // Permission enum value
    code: string;                          // Unique code (same as name for built-in)
    displayName: string;                   // Human-readable name
    description?: string;                  // Permission description
    
    // Permission scope and target
    resourceType: ResourceType;            // What resource this permission applies to
    category: string;                      // Group permissions (e.g., 'content', 'user_management')
    
    // Permission behavior
    isSystemLevel: boolean;                // System-wide vs tenant-specific
    isBuiltIn: boolean;                   // Built-in vs custom permission
    isActive: boolean;                     // Can be disabled
    
    // Hierarchy and dependencies
    parentPermissionId?: string;           // Parent permission (inheritance)
    requiredPermissions: string[];         // Prerequisites for this permission
    conflictingPermissions: string[];      // Mutually exclusive permissions
    
    // Metadata
    createdBy?: string;                    // Who created this permission (for custom ones)
    createdAt: Date;
    updatedAt: Date;
}

// Permission Schema - main permission definition
const PermissionSchema = new Schema<IPermission>(
    {
        // Basic info
        name: {
            type: String,
            enum: Object.values(Permission),
            required: true,
            unique: true,
            index: true
        },
        code: {
            type: String,
            required: true,
            unique: true,
            uppercase: true,
            trim: true,
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
        
        // Scope and target
        resourceType: {
            type: String,
            enum: Object.values(ResourceType),
            required: true,
            index: true
        },
        category: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            index: true
        },
        
        // Behavior flags
        isSystemLevel: {
            type: Boolean,
            default: false,
            index: true
        },
        isBuiltIn: {
            type: Boolean,
            default: true,
            index: true
        },
        isActive: {
            type: Boolean,
            default: true,
            index: true
        },
        
        // Hierarchy
        parentPermissionId: {
            type: String,
            index: true
        },
        requiredPermissions: {
            type: [String],
            default: [],
            index: true
        },
        conflictingPermissions: {
            type: [String],
            default: []
        },
        
        // Metadata
        createdBy: {
            type: String,
            index: true
        }
    },
    {
        timestamps: true
    }
);

// Optimized indexes for permission queries
PermissionSchema.index({ resourceType: 1, isActive: 1 });
PermissionSchema.index({ category: 1, isActive: 1 });
PermissionSchema.index({ isSystemLevel: 1, isActive: 1 });
PermissionSchema.index({ isBuiltIn: 1, isActive: 1 });
PermissionSchema.index({ name: 1, resourceType: 1 }, { unique: true });

// Validation
PermissionSchema.pre('save', function(next) {
    // Ensure code matches name for built-in permissions
    if (this.isBuiltIn && this.code !== this.name) {
        this.code = this.name;
    }
    
    next();
});

export const PermissionModel: Model<IPermission> = mongoose.model('permissions', PermissionSchema);
