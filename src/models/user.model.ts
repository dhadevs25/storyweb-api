import mongoose, { Schema, Document, Model } from 'mongoose';
import { 
    SystemRole, 
    TenantRole, 
    UserStatus, 
    Gender 
} from '../types/enum';

// Re-export for convenience
export { SystemRole, TenantRole, UserStatus, Gender };

// Main User interface - pure data model
export interface IUser extends Document {
    // Basic information
    email: string;
    username: string;
    password: string;
    displayName: string;
    avatar?: string;
    
    // Personal info (optional)
    firstName?: string;
    lastName?: string;
    dateOfBirth?: Date;
    gender?: Gender;
    
    // Role system - simplified but powerful
    systemRole?: SystemRole;                    // System-level role (optional)
    tenantRoles: Map<string, TenantRole>;      // Role per tenant
    customRoleIds: string[];                   // References to custom roles
    
    // Tenant associations
    primaryTenantId?: string;                  // Main tenant
    associatedTenantIds: string[];             // All accessible tenants
    
    // Status and security
    status: UserStatus;
    isEmailVerified: boolean;
    emailVerificationToken?: string;
    
    // Security fields
    lastLoginAt?: Date;
    loginAttempts: number;
    lockUntil?: Date;
    resetPasswordToken?: string;
    resetPasswordExpiry?: Date;
    
    // Metadata
    createdAt: Date;
    updatedAt: Date;
}

// User Schema - pure data structure, optimized indexes
const UserSchema = new Schema<IUser>(
    {
        // Basic info
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 3,
            maxlength: 30,
            index: true
        },
        password: {
            type: String,
            required: true,
            minlength: 6
        },
        displayName: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100
        },
        avatar: {
            type: String
        },
        
        // Personal info
        firstName: {
            type: String,
            trim: true,
            maxlength: 50
        },
        lastName: {
            type: String,
            trim: true,
            maxlength: 50
        },
        dateOfBirth: {
            type: Date
        },
        gender: {
            type: String,
            enum: Object.values(Gender)
        },
        
        // Role system
        systemRole: {
            type: String,
            enum: Object.values(SystemRole),
            index: true
        },
        tenantRoles: {
            type: Map,
            of: {
                type: String,
                enum: Object.values(TenantRole)
            },
            default: new Map()
        },
        customRoleIds: {
            type: [String],
            default: [],
            index: true
        },
        
        // Tenant associations
        primaryTenantId: {
            type: String,
            index: true
        },
        associatedTenantIds: {
            type: [String],
            default: [],
            index: true
        },
        
        // Status and verification
        status: {
            type: String,
            enum: Object.values(UserStatus),
            default: UserStatus.PENDING,
            index: true
        },
        isEmailVerified: {
            type: Boolean,
            default: false
        },
        emailVerificationToken: {
            type: String,
            index: true
        },
        
        // Security
        lastLoginAt: {
            type: Date
        },
        loginAttempts: {
            type: Number,
            default: 0
        },
        lockUntil: {
            type: Date
        },
        resetPasswordToken: {
            type: String,
            index: true
        },
        resetPasswordExpiry: {
            type: Date
        }
    },
    {
        timestamps: true
    }
);

// Optimized compound indexes for multi-tenant queries
UserSchema.index({ email: 1, status: 1 });
UserSchema.index({ username: 1, status: 1 });
UserSchema.index({ primaryTenantId: 1, status: 1 });
UserSchema.index({ associatedTenantIds: 1, status: 1 });
UserSchema.index({ systemRole: 1, status: 1 });
UserSchema.index({ tenantRoles: 1 });
UserSchema.index({ customRoleIds: 1 });

// Virtual for full name (computed property only)
UserSchema.virtual('fullName').get(function() {
    if (this.firstName && this.lastName) {
        return `${this.firstName} ${this.lastName}`;
    }
    return this.displayName;
});

export const UserModel: Model<IUser> = mongoose.model('users', UserSchema);
