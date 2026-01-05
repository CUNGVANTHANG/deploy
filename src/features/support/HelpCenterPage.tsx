import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, HelpCircle, FileText, MessageCircle } from "lucide-react";

export default function HelpCenterPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="text-center space-y-4 py-8">
        <h1 className="text-3xl font-bold tracking-tight">Trung tâm trợ giúp</h1>
        <p className="text-muted-foreground text-lg">Bạn cần giúp đỡ gì hôm nay?</p>
        
        <div className="relative max-w-md mx-auto mt-6">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Tìm kiếm câu hỏi..." 
            className="pl-10 h-10"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-6 border rounded-xl bg-card text-card-foreground shadow-sm flex flex-col items-center text-center space-y-2 hover:bg-accent/50 transition-colors cursor-pointer">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-full text-blue-600 dark:text-blue-400">
            <FileText className="h-6 w-6" />
          </div>
          <h3 className="font-semibold">Hướng dẫn sử dụng</h3>
          <p className="text-sm text-muted-foreground">Tài liệu chi tiết về các tính năng</p>
        </div>
        <div className="p-6 border rounded-xl bg-card text-card-foreground shadow-sm flex flex-col items-center text-center space-y-2 hover:bg-accent/50 transition-colors cursor-pointer">
          <div className="p-3 bg-amber-100 dark:bg-amber-900/50 rounded-full text-amber-600 dark:text-amber-400">
            <HelpCircle className="h-6 w-6" />
          </div>
          <h3 className="font-semibold">Câu hỏi thường gặp</h3>
          <p className="text-sm text-muted-foreground">Giải đáp các thắc mắc phổ biến</p>
        </div>
        <div className="p-6 border rounded-xl bg-card text-card-foreground shadow-sm flex flex-col items-center text-center space-y-2 hover:bg-accent/50 transition-colors cursor-pointer">
          <div className="p-3 bg-emerald-100 dark:bg-emerald-900/50 rounded-full text-emerald-600 dark:text-emerald-400">
            <MessageCircle className="h-6 w-6" />
          </div>
          <h3 className="font-semibold">Liên hệ hỗ trợ</h3>
          <p className="text-sm text-muted-foreground">Chat trực tiếp với đội ngũ support</p>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Câu hỏi phổ biến</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Làm thế nào để tạo một dự án mới?</AccordionTrigger>
            <AccordionContent>
              Bạn có thể tạo dự án mới bằng cách nhấp vào nút "Tạo mới" ở thanh menu trên cùng và chọn "Dự án mới", hoặc truy cập trang Dự án và nhấp vào nút "Thêm dự án".
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left">Tôi có thể mời thành viên vào đội nhóm không?</AccordionTrigger>
            <AccordionContent>
              Có, bạn có thể vào trang "Đội nhóm", chọn nhóm bạn muốn quản lý và nhấp vào nút "Thêm thành viên".
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Làm sao để thay đổi mật khẩu?</AccordionTrigger>
            <AccordionContent>
              Truy cập vào Avatar ở góc phải → Cài đặt → Bảo mật để thay đổi mật khẩu của bạn.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
