# ⚓️ Captain Teacher 20/11 - Hải Trình Tri Ân Người Thuyền Trưởng

Trang web Landing Page tương tác kỷ niệm ngày Nhà giáo Việt Nam 20/11 dành cho Sinh viên và Giảng viên theo phong cách Key Visual **"Captain Teacher"**.

Live Demo: [https://taingo2112003.github.io/captain-teacher-2011/](https://taingo2112003.github.io/captain-teacher-2011/)

---

## 🌟 Tính Năng Nổi Bật

### 1. Key Visual "Captain Teacher" Độc Đáo
- Tôn vinh hình ảnh Người Thầy thời đại mới như một **Vị Thuyền Trưởng** can trường, vững tay lái vượt qua sóng gió đồ án, bài tập và deadline để đưa bao thế hệ sinh viên cập bến tri thức.
- Bố cục biên tập (editorial layout), không bị AI hóa: tông màu Oceanic Navy & Brass Gold sang trọng, ấm áp.

### 2. Xưởng Chế Tác Thiệp Điện Tử (Card Creator)
- **4 Phong cách thiệp độc quyền**: Hải Trình Hoàng Kim, Sổ Nhật Ký Viễn Dương, Bảng Đen Giảng Đường, Ngọn Hải Đăng Rạng Rỡ.
- Form cá nhân hóa người nhận (Thầy/Cô, Khoa/Bộ môn), người gửi (Lớp/Khóa), đính kèm ảnh kỷ niệm.
- **Hệ thống Sticker Kéo Thả (Drag & Drop)**: Dán sticker huy hiệu (Thuyền trưởng 5 sao ⚓️, Kim chỉ nam 🧭, Phao cứu sinh 🛟, Điểm 10 tuyệt đối 📜, Hoa tri ân 🌹...) trực tiếp lên mặt thiệp.
- Gợi ý câu chúc hay theo phong cách trang trọng, hài hước hoặc hoài niệm.
- Hiệu ứng pháo hoa ăn mừng khi gửi thiệp (`canvas-confetti`).

### 3. Tường Lời Chúc (Wish Wall)
- Danh sách thiệp gửi về thời gian thực, có chế độ ghim bài nổi bật, bộ lọc tìm kiếm theo tên Thầy Cô, Khoa, ảnh đính kèm.
- Nút thả tim ❤️ và modal xem thiệp phóng to chuẩn typography chữ viết tay.

### 4. Diễn Đàn 4 Chủ Đề Thảo Luận
1. ⚓️ *"Chiếc phao cứu sinh"* – Kỷ niệm qua môn thần kỳ nhờ Thầy/Cô.
2. 🧭 *"Kim chỉ nam"* – Câu nói bất hủ của Giảng viên làm bạn nhớ mãi.
3. 📸 *"Góc ảnh Thuyền Trưởng"* – Khoe khoảnh khắc đáng yêu cùng Thầy Cô.
4. 💌 *"Hải trình giấu kín"* – Lời tri ân chưa từng dám nói trước mặt Giảng viên.
- Hỗ trợ gửi phản hồi kèm **1-3 ảnh đính kèm** thực tế.

### 5. Bảng Điều Khiển Quản Trị (Admin Demo)
- Truy cập bảo mật bằng mã PIN: `2011`.
- Duyệt / Ẩn thiệp và bình luận vi phạm.
- Bộ lọc từ nhạy cảm (Censorship Filter) tự động gắn cờ hoặc che `***`.
- Cơ chế chống spam (Rate-limiting 30s, Cloudflare Turnstile, kiểm tra trùng lặp).
- **Tab Đề Xuất Báo Giá & Kiến Trúc Kỹ Thuật (RFP)**: Sẵn sàng gửi cho đối tác với phương án chịu tải 200.000 lượt truy cập đột biến.

---

## 🛠️ Công Nghệ Sử Dụng

- **Frontend**: React 19, Tailwind CSS v4, Lucide React, Canvas Confetti.
- **Build tool**: Vite 8.
- **Lưu trữ dữ liệu**: LocalStorage + Edge Ready.
- **Triển khai**: GitHub Pages & GitHub Actions.

---

## 🚀 Khởi Chạy Local

```bash
# Cài đặt thư viện
npm install

# Chạy server phát triển
npm run dev

# Đóng gói sản phẩm
npm run build
```
