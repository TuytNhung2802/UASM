import {
  instagramIcon,
  facebookIcon,
  tiktokIcon,
  youtubeIcon,
  aiIcon,
  logo1,
  logo2,
  logo3,
  logo4,
  trashIcon,
  languageIcon,
  settingIcon,
  uploadIcon,
} from "@/assets";

export const navbarItems = [
  {
    text: "TRANG CHỦ",
    path: "/",
  },
  {
    text: "THÔNG BÁO",
    path: "/notification",
  },
  {
    text: "TUYỂN SINH CHAT-GPT",
    path: "/admissions-chat-gpt",
  },
  {
    text: "NGÀNH NGHỀ ĐÀO TẠO",
    path: "/training",
  },
  {
    text: "XẾP HẠNG",
    path: "/ranking",
  },
];

export const socialIcons = [
  {
    icon: instagramIcon,
    path: "/instagram",
  },
  {
    icon: facebookIcon,
    path: "/facebook",
  },
  {
    icon: tiktokIcon,
    path: "/tiktok",
  },
  {
    icon: youtubeIcon,
    path: "/youtube",
  },
];

export const navigationItems = [
  {
    icon: aiIcon,
    text: "XÉT HỌC BẠ",
    path: "/admission-based-on-academic-records",
  },
  {
    icon: aiIcon,
    text: "XÉT TUYỂN THẲNG",
    path: "/direct-admission-to-university",
  },
  {
    icon: aiIcon,
    text: "XÉT KẾT QUẢ THI THPT",
    path: "/admission-based-on-highschool-result",
  },
  {
    icon: aiIcon,
    text: "XÉT KẾT QUẢ THI ĐÁNH GIÁ NĂNG LỰC",
    path: "/admission-based-on-competency-test-results",
  },
  {
    icon: aiIcon,
    text: "TRÒ CHUYỆN CÙNG GPT VỀ XÉT TUYỂN",
    path: "/admissions-chat-gpt",
  },
];

export const thongTinTuyenSinh = [
  {
    text: "Điểm chuẩn Trúng tuyển vào ĐH Duy Tân đợt 1 năm 2023",
    path: "/",
  },
  {
    text: "Điểm Xét tuyển kết quả thi Tốt nghiệp THPT năm 2023",
    path: "/",
  },
  {
    text: "Đối tượng Tuyển sinh",
    path: "/",
  },
  {
    text: "Chỉ tiêu Tuyển Sinh",
    path: "/",
  },
  {
    text: "Thông tin Tuyển sinh Đại học năm 2023",
    path: "/",
  },
  {
    text: "Quy trình Đăng ký",
    path: "/",
  },
  {
    text: "Thi tuyển ngành Kiến trúc",
    path: "/",
  },
  {
    text: "Thủ tục Nhập học",
    path: "/",
  },
  {
    text: "Chính sách Ưu tiên",
    path: "/",
  },
];

export const chuongTrinhQuocTeItems = [
  {
    text: "CMU - Chương trình Công Nghệ Thông tin số 1 đến từ Mỹ",
    path: "",
  },
  {
    text: "PSU - Chương trình Tiên tiến Khối ngành Kinh tế Đẳng cấp nhất Việt Nam đến từ Mỹ",
    path: "",
  },
  {
    text: "CSU - Chương trình Tiên tiến Xây dựng và Kiến trúc Duy nhất tại Miền Trung",
    path: "",
  },
  {
    text: "PNU - Chương trình đào tạo kỹ sư Điện - Điện tử đạt chuẩn quốc tế",
    path: "",
  },
];

export const logoArr = [logo1, logo2, logo3, logo4];

export const chuongTrinhHocBtn = [
  {
    text: "CHƯƠNG TRÌNH QUỐC TẾ",
    state: "international",
  },
  {
    text: "DU HỌC & DU HỌC NƯỚC NGOÀI",
    state: "studyAbroad",
  },
];

export const optionChatBox = [
  {
    icon: trashIcon,
    text: "Xoá tất cả các đoạn hội thoại",
  },
  {
    icon: languageIcon,
    text: "Thay đổi ngôn ngữ",
  },
  {
    icon: settingIcon,
    text: "Cài đặt",
  },
  {
    icon: uploadIcon,
    text: "Tải lên file dữ liệu",
  },
];
