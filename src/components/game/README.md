# ZERO HOUR - Mạng Lưới Tử Thần (Game Components)

## 📋 Tổng quan
Các component game cho trò chơi tương tác về bảo mật số.

## 🎮 Components

### LoginScreen
- Xác thực MSSV (11 chữ số, bắt đầu bằng 3)
- Xác thực Email UEH (@st.ueh.edu.vn, chứa MSSV)
- Hiển thị lỗi chi tiết trên UI

### GameScreen
- Hiển thị câu hỏi và đáp án
- Đếm ngược thời gian
- Hiệu ứng typewriter cho dialogue
- Progress bar màu theo thời gian còn lại

### KnowledgePopup
- Hiển thị kiến thức sau mỗi câu đúng (Level 1-4)
- Tạm dừng bộ đếm thời gian
- Tài liệu tham khảo

### GameOverScreen
- 4 loại kết thúc khác nhau:
  - Excellent Win (≥8 phút, có confetti)
  - Normal Win (<8 phút)
  - Timeout Loss (hết giờ)
  - Instant Loss (sai Level 5)

## 🔧 Cấu hình

### Google Apps Script
Cập nhật URL trong `src/pages/Index.tsx`:
```typescript
const GAS_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
```

### Thời gian
- MAX_TIME: 600 giây (10 phút)
- PENALTY_TIME: 120 giây (2 phút cho mỗi câu sai)

## 🎨 Design System
- Dark cybersecurity theme
- Neon colors (cyan, red, yellow, green)
- Monospace fonts
- Glowing effects và animations
