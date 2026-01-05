import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Keyboard } from "lucide-react";

const SHORTCUTS = [
  { category: "Chung", keys: ["Ctrl", "K"], description: "Mở thanh tìm kiếm nhanh" },
  { category: "Chung", keys: ["Shift", "?"], description: "Mở menu trợ giúp này" },
  { category: "Điều hướng", keys: ["G", "H"], description: "Về trang chủ (Dashboard)" },
  { category: "Điều hướng", keys: ["G", "P"], description: "Đến trang Dự án" },
  { category: "Điều hướng", keys: ["G", "T"], description: "Đến trang Công việc" },
  { category: "Tác vụ", keys: ["C"], description: "Tạo mới (Công việc/Dự án)" },
  { category: "Tác vụ", keys: ["Esc"], description: "Đóng cửa sổ / Modal" },
  { category: "Công việc", keys: ["Space"], description: "Gán cho bản thân (trong chi tiết task)" },
  { category: "Công việc", keys: ["Ctrl", "Enter"], description: "Lưu thay đổi / Gửi comment" },
];

export default function ShortcutsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center gap-4 py-4">
         <div className="p-3 bg-muted rounded-full">
            <Keyboard className="h-8 w-8 text-muted-foreground" />
         </div>
         <div>
            <h1 className="text-2xl font-bold tracking-tight">Phím tắt</h1>
            <p className="text-muted-foreground">Danh sách các phím tắt giúp bạn thao tác nhanh hơn trên FUSION.</p>
         </div>
      </div>

      <Card>
         <CardHeader>
            <CardTitle>Danh sách phím tắt</CardTitle>
            <CardDescription>Sử dụng các phím tắt này để tăng tốc độ làm việc của bạn.</CardDescription>
         </CardHeader>
         <CardContent>
            <Table>
               <TableHeader>
                  <TableRow>
                     <TableHead className="w-[150px]">Danh mục</TableHead>
                     <TableHead className="w-[200px]">Phím tắt</TableHead>
                     <TableHead>Chức năng</TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {SHORTCUTS.map((item, index) => (
                     <TableRow key={index}>
                        <TableCell className="font-medium text-muted-foreground">{item.category}</TableCell>
                        <TableCell>
                           <div className="flex gap-1">
                              {item.keys.map(k => (
                                 <kbd key={k} className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                                    {k}
                                 </kbd>
                              ))}
                           </div>
                        </TableCell>
                        <TableCell>{item.description}</TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </CardContent>
      </Card>
      
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-sm text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-900">
         <span className="font-semibold">Mẹo:</span> Bạn có thể tùy chỉnh một số phím tắt trong phần Cài đặt cá nhân.
      </div>
    </div>
  );
}
