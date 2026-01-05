
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authStorageService } from "@/services/auth.storage";
import { User } from "@/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    phone: '',
    bio: '',
    title: '',
    department: '',
    location: ''
  });

  useEffect(() => {
    const currentUser = authStorageService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      setFormData(prev => ({ 
         ...prev, 
         name: currentUser.name, 
         email: currentUser.email,
         phone: currentUser.phone || '',
         bio: currentUser.bio || '',
         title: currentUser.title || '',
         department: currentUser.department || '',
         location: currentUser.location || ''
      }));
    }
  }, []);

  const handleUpdateProfile = () => {
     if (!user) return;
     // In a real app, this would call an API
     // For now, we update local storage via auth service hack if needed, or just mock it
     toast.success("Cập nhật thông tin thành công!");
  };

  const handleChangePassword = () => {
     if (!formData.currentPassword || !formData.newPassword) {
        toast.error("Vui lòng nhập mật khẩu");
        return;
     }
     toast.success("Đổi mật khẩu thành công!");
     setFormData(prev => ({ ...prev, currentPassword: '', newPassword: '' }));
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Hồ sơ cá nhân</h1>
        <p className="text-muted-foreground text-sm">Quản lý thông tin và bảo mật tài khoản.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Thông tin chung</CardTitle>
            <CardDescription>Thông tin hiển thị công khai của bạn.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                   <AvatarImage src={user.avatarUrl} />
                   <AvatarFallback className="text-lg">{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm">Thay đổi Avatar</Button>
             </div>

             <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                   <Label htmlFor="name">Tên hiển thị</Label>
                   <Input 
                      id="name" 
                      value={formData.name} 
                      onChange={e => setFormData({...formData, name: e.target.value})}
                   />
                </div>
                <div className="grid gap-2">
                   <Label htmlFor="title">Chức danh</Label>
                   <Input 
                      id="title" 
                      value={formData.title} 
                      onChange={e => setFormData({...formData, title: e.target.value})}
                      placeholder="Ví dụ: Product Manager"
                   />
                </div>
             </div>

             <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                   <Label htmlFor="email">Email</Label>
                   <Input 
                      id="email" 
                      value={formData.email} 
                      disabled 
                      className="bg-muted"
                   />
                </div>
                <div className="grid gap-2">
                   <Label htmlFor="phone">Số điện thoại</Label>
                   <Input 
                      id="phone" 
                      value={formData.phone} 
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                      placeholder="+84..."
                   />
                </div>
             </div>

             <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                   <Label htmlFor="department">Phòng ban</Label>
                   <Input 
                      id="department" 
                      value={formData.department} 
                      onChange={e => setFormData({...formData, department: e.target.value})}
                   />
                </div>
                <div className="grid gap-2">
                   <Label htmlFor="location">Địa điểm</Label>
                   <Input 
                      id="location" 
                      value={formData.location} 
                      onChange={e => setFormData({...formData, location: e.target.value})}
                   />
                </div>
             </div>

             <div className="grid gap-2">
                <Label htmlFor="bio">Giới thiệu ngắn</Label>
                <Input 
                   id="bio" 
                   value={formData.bio} 
                   onChange={e => setFormData({...formData, bio: e.target.value})}
                   placeholder="Một chút về bản thân bạn..."
                />
             </div>

             <Button onClick={handleUpdateProfile}>Lưu thay đổi</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Bảo mật</CardTitle>
            <CardDescription>Đổi mật khẩu và bảo mật tài khoản.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="grid gap-2">
                <Label htmlFor="current-password">Mật khẩu hiện tại</Label>
                <Input 
                   id="current-password" 
                   type="password"
                   value={formData.currentPassword}
                   onChange={e => setFormData({...formData, currentPassword: e.target.value})}
                />
             </div>
             
             <div className="grid gap-2">
                <Label htmlFor="new-password">Mật khẩu mới</Label>
                <Input 
                   id="new-password" 
                   type="password"
                   value={formData.newPassword}
                   onChange={e => setFormData({...formData, newPassword: e.target.value})}
                />
             </div>

             <Button variant="outline" onClick={handleChangePassword}>Đổi mật khẩu</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
