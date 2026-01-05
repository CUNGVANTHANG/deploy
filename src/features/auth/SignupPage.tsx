import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { authStorageService } from "@/services/auth.storage";
import { toast } from "sonner";

export default function SignupPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
     name: '',
     email: '',
     password: ''
  });

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await authStorageService.register(formData);
      toast.success("Tạo tài khoản thành công!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Đăng ký thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto border-none shadow-none md:border md:shadow-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold tracking-tight">Tạo tài khoản</CardTitle>
        <CardDescription>
          Nhập email của bạn bên dưới để tạo tài khoản
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button variant="outline" className="w-full" onClick={() => {}}>
           <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
              <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
           </svg>
           Đăng ký bằng Google
        </Button>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Hoặc tiếp tục với
            </span>
          </div>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
           <div className="space-y-2">
              <Label htmlFor="name">Họ và tên</Label>
              <Input 
                 id="name" 
                 placeholder="Nguyễn Văn A" 
                 required 
                 value={formData.name}
                 onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
              />
           </div>
           <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                 id="email" 
                 type="email" 
                 placeholder="m@example.com" 
                 required 
                 value={formData.email}
                 onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
              />
           </div>
           <div className="space-y-2">
              <Label htmlFor="password">Mật khẩu</Label>
              <Input 
                 id="password" 
                 type="password" 
                 required 
                 value={formData.password}
                 onChange={e => setFormData(prev => ({ ...prev, password: e.target.value }))}
              />
           </div>
           
           <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Tạo tài khoản
           </Button>
        </form>
      </CardContent>
      <CardFooter className="justify-center text-sm text-muted-foreground">
         Đã có tài khoản? 
         <Link to="/auth/login" className="ml-1 text-primary underline-offset-4 hover:underline">Đăng nhập</Link>
      </CardFooter>
    </Card>
  );
}
