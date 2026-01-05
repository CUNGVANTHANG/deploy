import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Check, Clock } from "lucide-react";

// Mock data
const MOCK_NOTIFICATIONS = [
  {
    id: '1',
    title: 'Bạn được gán vào dự án mới',
    description: 'Techlead đã thêm bạn vào dự án "Website Redesign"',
    time: '2 phút trước',
    read: false,
    type: 'project'
  },
  {
    id: '2',
    title: 'Công việc sắp đến hạn',
    description: 'Task "Review Design" sẽ hết hạn trong 2 giờ tới.',
    time: '1 giờ trước',
    read: false,
    type: 'task'
  },
  {
    id: '3',
    title: 'Cập nhật hệ thống',
    description: 'Hệ thống FUSION đã được cập nhật lên v2.0',
    time: '1 ngày trước',
    read: true,
    type: 'system'
  },
  {
    id: '4',
    title: 'Bình luận mới',
    description: 'Sarah đã bình luận về task "Homepage Hero Section"',
    time: '2 ngày trước',
    read: true,
    type: 'comment'
  },
  {
    id: '5',
    title: 'Lời mời tham gia đội nhóm',
    description: 'Bạn đã được mời tham gia nhóm "Mobile App Team"',
    time: '3 ngày trước',
    read: true,
    type: 'team'
  }
];

export default function NotificationsPage() {
  return (
    <div className="container max-w-4xl mx-auto py-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Thông báo</h1>
          <p className="text-muted-foreground mt-1">Quản lý tất cả các cập nhật và thông báo của bạn.</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Check className="h-4 w-4" /> Đánh dấu tất cả đã đọc
        </Button>
      </div>

      <Card>
        <CardHeader className="p-0 border-b">
          <div className="px-6 py-4">
            <Tabs defaultValue="all" className="w-full">
              <TabsList>
                <TabsTrigger value="all">Tất cả</TabsTrigger>
                <TabsTrigger value="unread">Chưa đọc</TabsTrigger>
                <TabsTrigger value="mentions">Được nhắc đến</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[600px]">
            <div className="divide-y">
              {MOCK_NOTIFICATIONS.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`p-6 flex items-start gap-4 transition-colors hover:bg-muted/50 ${!notification.read ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}`}
                >
                  <div className={`mt-1 h-2 w-2 rounded-full flex-shrink-0 ${!notification.read ? 'bg-blue-600' : 'bg-transparent'}`} />
                  
                  <Avatar className="h-10 w-10 border">
                    <AvatarFallback className={!notification.read ? 'bg-blue-100 text-blue-700 font-semibold' : ''}>
                      <Bell className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className={`text-sm ${!notification.read ? 'font-semibold text-foreground' : 'font-medium text-muted-foreground'}`}>
                        {notification.title}
                      </p>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {notification.time}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {notification.description}
                    </p>
                    {notification.type === 'project' && (
                       <div className="pt-2">
                          <Button size="sm" variant="secondary">Xem dự án</Button>
                       </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-6 text-center">
               <p className="text-sm text-muted-foreground">Bạn đã xem hết thông báo.</p>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
