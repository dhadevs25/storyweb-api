# Tài liệu Model Tenant - Hệ thống Đọc Truyện (Miễn phí - Không giới hạn)

## Tổng quan
Model `ITenant` siêu đơn giản được thiết kế cho hệ thống quản lý tenant hoàn toàn miễn phí, không giới hạn.

## Cấu trúc Interface

### Thông tin cơ bản
```typescript
code: string;           // Mã định danh duy nhất của tenant
name: string;           // Tên nhà xuất bản/tác giả
domain: string;         // Tên miền của tenant
contactEmail: string;   // Email liên hệ chính
contactPhone: string;   // Số điện thoại liên hệ
isActive: boolean;      // Trạng thái hoạt động
```

### Tính năng cơ bản (miễn phí)
```typescript
allowComments: boolean; // Cho phép bình luận (mặc định: true)
allowRating: boolean;   // Cho phép đánh giá (mặc định: true)
```

### Metadata
```typescript
status: 'active' | 'inactive';
createdAt: Date;        // Ngày tạo
updatedAt: Date;        // Ngày cập nhật
```

## Enums

### TenantStatus  
- `ACTIVE`: Đang hoạt động
- `INACTIVE`: Tạm ngưng

## Schema Configuration

### Indexes
- `code`: Unique index
- `domain`: Unique index
- `name`: Index
- `status`: Index

## Defaults

| Field | Default Value |
|-------|---------------|
| `isActive` | `true` |
| `allowComments` | `true` |
| `allowRating` | `true` |
| `status` | `'active'` |

## Sử dụng

### Tạo tenant mới
```typescript
import { TenantModel, TenantStatus } from '../models/tenant_model';

const newTenant = new TenantModel({
    code: 'TENANT001',
    name: 'Nhà Xuất Bản ABC',
    domain: 'abc.com',
    contactEmail: 'admin@abc.com',
    contactPhone: '0123456789'
});

await newTenant.save();
```

### Kiểm tra trạng thái
```typescript
// Kiểm tra tenant active
if (tenant.status === TenantStatus.ACTIVE && tenant.isActive) {
    console.log('Tenant đang hoạt động');
}

// Bật/tắt tính năng
tenant.allowComments = false;
tenant.allowRating = true;
await tenant.save();
```

### Quản lý tenant
```typescript
// Tạm ngưng tenant
tenant.status = TenantStatus.INACTIVE;
tenant.isActive = false;
await tenant.save();

// Kích hoạt lại
tenant.status = TenantStatus.ACTIVE;
tenant.isActive = true;
await tenant.save();
```

## Business Logic siêu đơn giản

### Đặc điểm
- **Hoàn toàn miễn phí**: Không có subscription, không tính phí
- **Không giới hạn**: Không giới hạn users, stories, storage
- **Đơn giản**: Chỉ tập trung vào quản lý tenant cơ bản
- **Linh hoạt**: Bật/tắt tính năng theo nhu cầu

### Workflow
1. Tạo tenant với thông tin cơ bản
2. Tenant hoạt động ngay lập tức
3. Có thể tạo unlimited stories và users
4. Chỉ cần quản lý active/inactive

## Lợi ích của phiên bản không giới hạn

### 1. **Siêu đơn giản**
- Không có logic phức tạp về subscription
- Không cần quản lý expiry dates
- Không cần check limits

### 2. **User-friendly**
- Người dùng không lo lắng về giới hạn
- Không cần upgrade plans
- Focus vào content thay vì billing

### 3. **Development-friendly**
- Code cực kỳ đơn giản
- Ít bugs
- Dễ maintain
- Fast development

### 4. **Performance cao**
- Không cần check limits
- Ít queries
- Fast responses

Phiên bản này hoàn hảo cho các dự án muốn tập trung vào nội dung thay vì monetization!

## Schema Configuration

### Indexes
- `code`: Unique index
- `domain`: Unique index  
- `name`: Index
- `subscriptionStatus`: Index
- `subscriptionExpiry`: Index
- `status`: Index
- `createdAt`: Descending index

### Virtuals
- `fullAddress`: Trả về địa chỉ đầy đủ dạng string

### Methods

#### `isSubscriptionExpired(): boolean`
Kiểm tra subscription có hết hạn hay không.

#### `canUseFeature(feature: string): boolean`
Kiểm tra tenant có thể sử dụng tính năng hay không dựa trên:
- Trạng thái active
- Status được approve
- Subscription chưa hết hạn
- Feature được bật

#### `canCreateUserSite(currentUserSiteCount: number): boolean`
Kiểm tra tenant có thể tạo thêm trang user hay không.

#### `canCreateCmsSite(currentCmsSiteCount: number): boolean`
Kiểm tra tenant có thể tạo thêm trang CMS hay không.

#### `canCreateStory(currentStoryCount: number): boolean`
Kiểm tra tenant có thể tạo thêm truyện hay không.

#### `canCreateChapter(currentChapterCount: number): boolean`
Kiểm tra tenant có thể tạo thêm chương hay không.

## Defaults

| Field | Default Value |
|-------|---------------|
| `isActive` | `true` |
| `subscriptionPlan` | `'basic'` |
| `subscriptionStatus` | `'trial'` |
| `maxUsers` | `10` |
| `maxStorage` | `1024` (1GB) |
| `maxStories` | `100` |
| `maxChapters` | `1000` |
| `maxUserSites` | `5` |
| `maxCmsSites` | `2` |
| `allowCustomDomain` | `false` |
| `allowSubdomain` | `true` |
| `industry` | `'publishing'` |
| `timeZone` | `'Asia/Ho_Chi_Minh'` |
| `language` | `'vi'` |
| `currency` | `'VND'` |
| `status` | `'pending'` |
| `tenantType` | `'publisher'` |
| `contentRating` | `'all'` |

## Feature Defaults

| Feature | Default Value |
|---------|---------------|
| `allowComments` | `true` |
| `allowRating` | `true` |
| `allowBookmark` | `true` |
| `allowOfflineReading` | `false` |
| `customBranding` | `false` |
| `analytics` | `false` |
| `apiAccess` | `false` |
| `multiLanguage` | `false` |
| `socialSharing` | `false` |
| `seo` | `false` |
| `audioSupport` | `false` |
| `videoTrailer` | `false` |
| `premiumContent` | `false` |
| `ageRestriction` | `true` |

## Sử dụng

### Tạo tenant mới với Factory Pattern
```typescript
import { TenantFactory } from '../models/tenant_factory';

// Tạo publisher cơ bản
const basicPublisher = TenantFactory.createBasicPublisher({
    code: 'KIMDONGNXB',
    name: 'Nhà Xuất Bản Kim Đồng',
    domain: 'kimdong.com.vn',
    contactEmail: 'admin@kimdong.com.vn',
    contactPhone: '0123456789'
});

// Tạo publisher premium
const premiumPublisher = TenantFactory.createPremiumPublisher({
    code: 'PREMIUM_PUB',
    name: 'Premium Publisher',
    domain: 'premium.com',
    contactEmail: 'admin@premium.com',
    contactPhone: '0987654321'
});

// Tạo tác giả
const author = TenantFactory.createAuthor({
    code: 'AUTHOR_001',
    name: 'Nguyễn Văn A',
    domain: 'nguyenvana.com',
    contactEmail: 'author@example.com',
    contactPhone: '0123456789'
});

await basicPublisher.save();
```

### Sử dụng Service Layer
```typescript
import { TenantService } from '../models/tenant_service';

const tenantService = new TenantService();

// Validate tenant trước khi lưu
const validation = tenantService.validateTenantCreation(basicPublisher);
if (!validation.isValid) {
    console.log('Validation errors:', validation.errors);
}

// Kiểm tra có thể upgrade subscription
const canUpgrade = tenantService.canUpgradeSubscription(
    basicPublisher, 
    SubscriptionPlan.PREMIUM
);

// Lấy features theo plan
const premiumFeatures = tenantService.getFeaturesByPlan(SubscriptionPlan.PREMIUM);
```

### Sử dụng Strategy Pattern
```typescript
import { 
    BasicSubscriptionStrategy, 
    PremiumSubscriptionStrategy,
    EnterpriseSubscriptionStrategy 
} from '../models/tenant_service';

const strategy = new PremiumSubscriptionStrategy();
const limits = strategy.getLimits();
const features = strategy.getFeatures();

console.log('Premium limits:', limits);
console.log('Premium features:', features);
```

### Kiểm tra tính năng với Type Safety
```typescript
import { IFeatures } from '../models/tenant_model';

// Type-safe feature checking
const canRate = tenant.canUseFeature('allowRating');
const canBookmark = tenant.canUseFeature('allowBookmark');
const hasPremium = tenant.canUseFeature('premiumContent');

// Enum usage for better maintainability
if (tenant.status === TenantStatus.APPROVED) {
    console.log('Tenant is approved');
}

if (tenant.subscriptionPlan === SubscriptionPlan.ENTERPRISE) {
    console.log('Enterprise features available');
}
```

### Lấy thông tin
```typescript
// Địa chỉ đầy đủ
const address = tenant.fullAddress;

// Kiểm tra subscription
const isExpired = tenant.isSubscriptionExpired();
```

### Cập nhật features
```typescript
tenant.features.allowOfflineReading = true;
tenant.features.premiumContent = true;
tenant.features.audioSupport = true;
await tenant.save();
```

### Kiểm tra giới hạn
```typescript
// Kiểm tra giới hạn số truyện
if (tenant.canCreateStory(currentStoryCount)) {
    // Cho phép tạo truyện mới
}

// Kiểm tra giới hạn trang user
if (tenant.canCreateUserSite(currentUserSiteCount)) {
    // Cho phép tạo trang user mới
}

// Kiểm tra giới hạn trang CMS
if (tenant.canCreateCmsSite(currentCmsSiteCount)) {
    // Cho phép tạo trang CMS mới
}

// Kiểm tra rating content
if (tenant.contentRating === 'mature') {
    // Hiển thị cảnh báo độ tuổi
}
```

## Business Logic

### Subscription Plans
- **Basic**: Gói cơ bản với tính năng giới hạn (đọc truyện miễn phí)
- **Premium**: Gói nâng cao với nhiều tính năng hơn (offline reading, premium content)
- **Enterprise**: Gói doanh nghiệp với đầy đủ tính năng (API access, analytics, audio support)

### Tenant Types
- **Publisher**: Nhà xuất bản - quản lý nhiều tác giả và truyện
- **Author**: Tác giả cá nhân - tự quản lý truyện của mình
- **Platform**: Nền tảng phân phối - tổng hợp từ nhiều nguồn

### Content Rating
- **All**: Phù hợp mọi lứa tuổi
- **Teen**: Dành cho thanh thiếu niên (13+)
- **Mature**: Dành cho người trưởng thành (18+)

### Status Flow
1. **Pending**: Tenant vừa được tạo, chờ phê duyệt
2. **Approved**: Đã được phê duyệt, có thể phân phối truyện
3. **Suspended**: Tạm ngưng hoạt động (vi phạm chính sách)
4. **Terminated**: Chấm dứt sử dụng

## Extensibility & Design Patterns

### Factory Pattern
```typescript
// TenantFactory.ts
class TenantFactory {
    static createBasicPublisher(data): ITenant { ... }
    static createPremiumPublisher(data): ITenant { ... }
    static createEnterprisePublisher(data): ITenant { ... }
    static createAuthor(data): ITenant { ... }
}
```

### Strategy Pattern
```typescript
// Different strategies for subscription plans
interface ISubscriptionStrategy {
    getLimits(): LimitConfig;
    getFeatures(): Partial<IFeatures>;
}

class BasicSubscriptionStrategy implements ISubscriptionStrategy { ... }
class PremiumSubscriptionStrategy implements ISubscriptionStrategy { ... }
class EnterpriseSubscriptionStrategy implements ISubscriptionStrategy { ... }
```

### Service Layer
```typescript
// Business logic separation
interface ITenantBusinessRules {
    validateTenantCreation(tenant: ITenant): ValidationResult;
    canUpgradeSubscription(tenant: ITenant, newPlan: SubscriptionPlan): boolean;
    calculateStorageUsage(tenant: ITenant): Promise<number>;
    getFeaturesByPlan(plan: SubscriptionPlan): Partial<IFeatures>;
}
```

### Type Safety với Enums
```typescript
export enum SubscriptionPlan {
    BASIC = 'basic',
    PREMIUM = 'premium',
    ENTERPRISE = 'enterprise'
}

export enum TenantStatus {
    PENDING = 'pending',
    APPROVED = 'approved',
    SUSPENDED = 'suspended',
    TERMINATED = 'terminated'
}
```

## Lợi ích của Architecture này

### 1. **Maintainability**
- Code được tổ chức theo concerns riêng biệt
- Dễ dàng tìm và sửa bugs
- Giảm coupling giữa các components

### 2. **Extensibility** 
- Thêm subscription plan mới không ảnh hưởng code cũ
- Mở rộng features dễ dàng
- Plugin architecture ready

### 3. **Testability**
- Mỗi class có responsibility rõ ràng
- Dễ mock dependencies
- Unit test isolated

### 4. **Type Safety**
- TypeScript interfaces và enums
- Compile-time error checking
- Better IDE support

### 5. **Performance**
- Lazy loading strategies
- Optimized database queries với indexes
- Caching ready architecture