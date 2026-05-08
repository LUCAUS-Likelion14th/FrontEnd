import AdminSidebar from "@/components/admin/AdminSidebar";
import "./admin.css";

export const metadata = {
  title: "LUCAUS 관리자",
  description: "LUCAUS 축제 관리자 페이지",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-root">
      <AdminSidebar />
      <div className="admin-content">
        <div className="admin-indicator">
          <span className="admin-indicator__badge">관리자</span>
          <span className="admin-indicator__text">LUCAUS 관리자 페이지입니다</span>
        </div>
        {children}
      </div>
    </div>
  );
}
