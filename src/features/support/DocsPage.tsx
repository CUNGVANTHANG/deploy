import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export default function DocsPage() {
  return (
    <div className="flex h-[calc(100vh-8rem)] animate-in fade-in duration-500">
      <div className="w-64 border-r pr-6 hidden md:block">
        <h3 className="font-semibold mb-4 text-lg">Mục lục</h3>
        <ScrollArea className="h-full">
          <div className="space-y-4 text-sm text-muted-foreground">
            <div className="space-y-2">
              <h4 className="font-medium text-foreground">Bắt đầu</h4>
              <ul className="space-y-2 border-l ml-1 pl-4">
                <li className="text-primary font-medium border-l-2 border-primary -ml-[18px] pl-4">Giới thiệu chung</li>
                <li className="hover:text-foreground cursor-pointer">Cài đặt ban đầu</li>
                <li className="hover:text-foreground cursor-pointer">Cấu trúc dự án</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-foreground">Tính năng chính</h4>
              <ul className="space-y-2 border-l ml-1 pl-4">
                <li className="hover:text-foreground cursor-pointer">Quản lý dự án</li>
                <li className="hover:text-foreground cursor-pointer">Bảng công việc (Kanban)</li>
                <li className="hover:text-foreground cursor-pointer">Làm việc nhóm</li>
                <li className="hover:text-foreground cursor-pointer">Báo cáo & Thống kê</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-foreground">Nâng cao</h4>
              <ul className="space-y-2 border-l ml-1 pl-4">
                <li className="hover:text-foreground cursor-pointer">Tích hợp API</li>
                <li className="hover:text-foreground cursor-pointer">Bảo mật</li>
                <li className="hover:text-foreground cursor-pointer">Phân quyền</li>
              </ul>
            </div>
          </div>
        </ScrollArea>
      </div>

      <div className="flex-1 pl-0 md:pl-8 overflow-y-auto">
        <div className="max-w-3xl space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-4">Giới thiệu về FUSION Platform</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              FUSION là nền tảng quản lý công việc và dự án toàn diện dành cho doanh nghiệp. 
              Được thiết kế để tối ưu hóa quy trình làm việc, tăng cường sự cộng tác và nâng cao hiệu suất đội nhóm.
            </p>
          </div>

          <Separator />

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">Các khái niệm cơ bản</h2>
            <div className="grid gap-4 md:grid-cols-2">
               <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Workspace (Không gian làm việc)</h3>
                  <p className="text-sm text-muted-foreground">Mỗi doanh nghiệp hoặc tổ chức sẽ có một workspace riêng biệt chứa các dự án và thành viên của họ.</p>
               </div>
               <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Projects (Dự án)</h3>
                  <p className="text-sm text-muted-foreground">Tập hợp các công việc liên quan đến một mục tiêu nhất định. Dự án có thể được quản lý theo dạng danh sách hoặc bảng Kanban.</p>
               </div>
               <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Tasks (Công việc)</h3>
                  <p className="text-sm text-muted-foreground">Đơn vị nhỏ nhất của công việc. Có thể được gán cho thành viên, đặt hạn chót, và theo dõi tiến độ.</p>
               </div>
               <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Teams (Đội nhóm)</h3>
                  <p className="text-sm text-muted-foreground">Nhóm các thành viên làm việc cùng nhau. Giúp dễ dàng phân quyền và quản lý tài nguyên.</p>
               </div>
            </div>
          </div>

          <div className="space-y-4">
             <h2 className="text-2xl font-semibold tracking-tight">Lộ trình phát triển</h2>
             <p className="text-muted-foreground">
                Chúng tôi liên tục cập nhật FUSION với các tính năng mới. Hãy theo dõi trang thông báo để cập nhật những thay đổi mới nhất.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
