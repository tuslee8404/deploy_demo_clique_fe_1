# Dating App - Frontend

Ứng dụng hẹn hò với tính năng kết nối và đặt lịch hẹn hò thông minh.

## 🏗 Tổ chức hệ thống

Dự án được xây dựng theo mô hình Single Page Application (SPA) sử dụng React và Vite:

- **`src/pages`**: Chứa các trang chính của ứng dụng (Login, Register, Dashboard, Matches, Date Scheduling).
- **`src/components`**: Các components UI dùng chung, tích hợp `shadcn/ui`.
- **`src/redux`**: Quản lý state toàn cục (với Redux Toolkit) cho Authentication (lưu user info, tokens).
- **`src/context`**: Cung cấp `SocketContext` cho việc kết nối WebSocket (Socket.io) thời gian thực.
- **`src/services`**: Chứa `api.ts` định nghĩa các hàm gọi API thông qua `axios`.
- **`src/utils`**: Cấu hình `axiosInstance` với interceptors để xử lý auto-refresh token.

## 💾 Lưu trữ dữ liệu

- **Backend / Database**: Toàn bộ dữ liệu về người dùng, bài viết, lượt thích và lịch hẹn được lưu trữ tại Backend (Node.js/Express) và Database (MongoDB).
- **Redux / Local Storage**: Thông tin đăng nhập và `accessToken` được lưu trong Redux Store. Sử dụng `redux-persist` để đồng bộ dữ liệu vào `localStorage`, giúp duy trì trạng thái đăng nhập khi tải lại trang.
- **Cookies**: `refreshToken` được quản lý bởi Backend dưới dạng HttpOnly cookie để đảm bảo bảo mật.

## ❤️ Logic Match

Logic tương hợp (Match) hoạt động dựa trên sự tương tác hai chiều:

1. **Like**: Khi bạn "tym" một người, hệ thống sẽ gửi yêu cầu về Backend.
2. **Tương hợp**: Nếu người đó cũng đã thích bạn trước đó (hoặc thích bạn sau này), một sự kiện `match` sẽ được tạo ra.
3. **Real-time Notification**: Nhờ có Socket.io, ngay khi có sự tương hợp, frontend sẽ nhận được thông báo tức thời và hiển thị Toast "It's a Match!".
4. **Trang Matches**: Danh sách các cặp đôi đã match được lấy từ API `/dating/users/matches`.

## 📅 Logic tìm Slot trùng (Scheduling)

Tính năng đặt lịch hẹn giúp hai người tìm ra khung giờ rảnh chung một cách tự động:

- **Chọn lịch**: Mỗi người chọn các khung giờ rảnh (Yes) hoặc bận (No) trong vòng 21 ngày tới.
- **Gửi Availability**: Khi nhấn "Gửi lịch trống", frontend gửi danh sách các slot `yes` lên backend.
- **Backend Matching**: Backend so sánh lịch của hai người. Nếu tìm thấy khung giờ mà cả hai đều rảnh, nó sẽ trả về `isMatched: true` cùng khung giờ đó.
- **Xử lý xung đột**:
  - Nếu không có xung đột (ví dụ: một trong hai người không có lịch hẹn khác vào lúc đó), lịch hẹn sẽ được chốt tự động.
  - Nếu có xung đột (cùng khung giờ đó nhưng một người đã có lịch hẹn với người khác), hệ thống sẽ hiển thị cảnh báo để người dùng quyết định có "chốt luôn" hay không.

## 🚀 Cải thiện trong tương lai

Nếu có thêm thời gian, dự án sẽ được nâng cấp các hạng mục sau:

- **Hệ thống Chat**: Tích hợp nhắn tin real-time cho các cặp đôi đã match.
- **Bộ lọc tìm kiếm**: Cho phép lọc người dùng theo khoảng cách, sở thích và các tiêu chí chi tiết hơn.
- **Tích hợp Calendar**: Đồng bộ lịch hẹn với Google Calendar hoặc iCal.
- **Tối ưu trải nghiệm mobile**: Cải thiện các cử chỉ vuốt (swipe) để like/unlike mượt mà hơn.
- **Bảo mật**: Triển khai xác thực khuôn mặt hoặc email OTP để tăng tính minh bạch của tài khoản.

## 🛠 Công nghệ sử dụng

- **Frontend**: React, Vite, TypeScript.
- **Styling**: Tailwind CSS, shadcn/ui.
- **State Management**: Redux Toolkit.
- **Communication**: Axios, Socket.io-client.
