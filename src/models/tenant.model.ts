import { TenantStatus } from 'enum';
import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITenant extends Document {
    // Thông tin cơ bản
    code: string;
    name: string;
    domain: string;
    contactEmail: string;
    contactPhone: string;
    isActive: boolean;
    
    // Tính năng cơ bản
    allowComments: boolean;
    allowRating: boolean;
    
    // Metadata
    status: TenantStatus;
    createdAt: Date;
    updatedAt: Date;
}

// Schema đơn giản
const TenantSchema = new Schema<ITenant>(
    {
        code: { 
            type: String, 
            required: true, 
            unique: true, 
            trim: true 
        },
        name: { 
            type: String, 
            required: true, 
            trim: true 
        },
        domain: { 
            type: String, 
            required: true, 
            unique: true, 
            trim: true 
        },
        contactEmail: { 
            type: String, 
            required: true, 
            trim: true 
        },
        contactPhone: { 
            type: String, 
            required: true, 
            trim: true 
        },
        isActive: { 
            type: Boolean, 
            required: true, 
            default: true 
        },
        
        // Tính năng
        allowComments: { 
            type: Boolean, 
            default: true 
        },
        allowRating: { 
            type: Boolean, 
            default: true 
        },
        
        // Metadata
        status: { 
            type: String, 
            enum: Object.values(TenantStatus), 
            default: TenantStatus.ACTIVE 
        }
    },
    { 
        timestamps: true 
    }
);

// Indexes đơn giản
TenantSchema.index({ code: 1 }, { unique: true });
TenantSchema.index({ domain: 1 }, { unique: true });
TenantSchema.index({ name: 1 });
TenantSchema.index({ status: 1 });

export const TenantModel: Model<ITenant> = mongoose.model('tenants', TenantSchema);
