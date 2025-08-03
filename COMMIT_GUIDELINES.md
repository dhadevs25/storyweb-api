# 📝 Commit Format Guidelines

Dự án này **BẮT BUỘC** phải follow format **Conventional Commits**. Commit sai format sẽ bị **REJECT**.

## ⚠️ **REQUIRED FORMAT**

```
<type>(<scope>): <subject>
```

**Ví dụ:**
```bash
feat(auth): add JWT authentication system
fix(database): resolve connection timeout issue
docs(readme): update installation instructions
```

## 📋 **Allowed Types** (REQUIRED)

| Type | Mô tả | Ví dụ |
|------|-------|-------|
| `feat` | Tính năng mới | `feat(auth): add login functionality` |
| `fix` | Sửa bug | `fix(api): handle null response error` |
| `docs` | Thay đổi documentation | `docs(readme): add API examples` |
| `style` | Format code, không thay đổi logic | `style(lint): fix eslint warnings` |
| `refactor` | Refactor code | `refactor(utils): extract helper functions` |
| `perf` | Cải thiện performance | `perf(query): optimize database queries` |
| `test` | Thêm/sửa tests | `test(auth): add login validation tests` |
| `build` | Thay đổi build system | `build(webpack): update config` |
| `ci` | Thay đổi CI/CD | `ci(github): add automated tests` |
| `chore` | Maintenance tasks | `chore(deps): update dependencies` |
| `revert` | Revert commit trước đó | `revert: revert feat(auth): add JWT` |

## 📏 **Rules (STRICT)**

### ✅ **MUST DO:**
- Type phải lowercase: `feat`, `fix` (không phải `FEAT`, `Fix`)
- Scope phải lowercase: `(auth)`, `(database)` 
- Subject tối thiểu **10 ký tự**, tối đa **60 ký tự**
- Subject không được có dấu chấm ở cuối
- Subject phải là lowercase hoặc kebab-case
- Total header không quá **80 ký tự**

### ❌ **DON'T:**
- `Added new feature` ❌ (thiếu type)
- `FEAT: new auth` ❌ (uppercase type)
- `feat: bug` ❌ (subject quá ngắn)
- `feat(AUTH): add login.` ❌ (scope uppercase + dấu chấm)

## 🎯 **Good Examples**

```bash
✅ feat(auth): add JWT token authentication
✅ fix(database): resolve MongoDB timeout issue  
✅ docs(api): update endpoint documentation
✅ style(eslint): fix linting warnings
✅ refactor(routes): extract middleware functions
✅ test(auth): add unit tests for login
✅ chore(deps): update mongoose to v8.0.0
```

## ❌ **Bad Examples**

```bash
❌ Added new feature              # Missing type
❌ FEAT(auth): add login          # Uppercase type  
❌ feat: bug                      # Subject too short
❌ feat(AUTH): add system.        # Uppercase scope + period
❌ feat(auth): Add New Feature    # Wrong case
❌ update readme                  # Missing type + format
```

## � **What Happens If Wrong Format?**

```bash
$ git commit -m "wrong format"
⧗   input: wrong format
✖   subject may not be empty [subject-empty]
✖   type may not be empty [type-empty]
✖   found 2 problems, 0 warnings

# COMMIT REJECTED! ❌
```

## � **Tips**

- **Type**: Mô tả loại thay đổi
- **Scope**: Phần nào của code (optional nhưng recommended)  
- **Subject**: Mô tả ngắn gọn những gì thay đổi

---

**⚠️ Warning: Commit sai format sẽ bị reject tự động!**
