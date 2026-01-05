
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "next-themes";
import { toast } from "sonner";

export default function SettingsPage() {
  const { setTheme } = useTheme();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Cài đặt</h1>
        <p className="text-muted-foreground text-sm">Quản lý tùy chọn ứng dụng của bạn.</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">Chung</TabsTrigger>
          <TabsTrigger value="notifications">Thông báo</TabsTrigger>
          <TabsTrigger value="display">Hiển thị</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
           <Card>
              <CardHeader>
                 <CardTitle>Ngôn ngữ & Khu vực</CardTitle>
                 <CardDescription>Cài đặt ngôn ngữ hiển thị và định dạng ngày tháng.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                       <Label>Ngôn ngữ</Label>
                       <p className="text-sm text-muted-foreground">Tiếng Việt (Mặc định)</p>
                    </div>
                    <Button variant="outline">Thay đổi</Button>
                 </div>
              </CardContent>
           </Card>
        </TabsContent>

        <TabsContent value="notifications">
           <Card>
              <CardHeader>
                 <CardTitle>Cài đặt thông báo</CardTitle>
                 <CardDescription>Chọn cách bạn muốn nhận thông báo.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                 <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="email-notif" className="flex flex-col space-y-1">
                       <span>Email thông báo</span>
                       <span className="font-normal text-xs text-muted-foreground">Nhận email về hoạt động công việc.</span>
                    </Label>
                    <Switch id="email-notif" defaultChecked onCheckedChange={() => toast.success("Đã cập nhật cài đặt")} />
                 </div>
                 
                 <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="push-notif" className="flex flex-col space-y-1">
                       <span>Thông báo đẩy</span>
                       <span className="font-normal text-xs text-muted-foreground">Nhận thông báo ngay trên trình duyệt.</span>
                    </Label>
                    <Switch id="push-notif" defaultChecked onCheckedChange={() => toast.success("Đã cập nhật cài đặt")} />
                 </div>
              </CardContent>
           </Card>
        </TabsContent>
        
        <TabsContent value="display">
           <Card>
              <CardHeader>
                 <CardTitle>Giao diện</CardTitle>
                 <CardDescription>Tùy chỉnh giao diện sáng/tối.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div className="grid grid-cols-3 gap-4">
                    <div className="cursor-pointer" onClick={() => setTheme("light")}>
                       <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
                          <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                             <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                                <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                                <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                             </div>
                             <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                                <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                                <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                             </div>
                          </div>
                       </div>
                       <span className="block w-full p-2 text-center font-normal">Sáng</span>
                    </div>

                    <div className="cursor-pointer" onClick={() => setTheme("dark")}>
                       <div className="items-center rounded-md border-2 border-muted bg-slate-950 p-1 hover:border-accent">
                          <div className="space-y-2 rounded-sm bg-slate-950 p-2">
                             <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                                <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                                <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                             </div>
                             <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                                <div className="h-4 w-4 rounded-full bg-slate-400" />
                                <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                             </div>
                          </div>
                       </div>
                       <span className="block w-full p-2 text-center font-normal">Tối</span>
                    </div>
                 </div>
              </CardContent>
           </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
