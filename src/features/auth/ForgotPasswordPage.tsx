
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ArrowLeft, CheckCircle2 } from "lucide-react";
import { authStorageService } from "@/services/auth.storage";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await authStorageService.forgotPassword(email);
      setSuccess(true);
      toast.success("Đã gửi email khôi phục!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold tracking-tight">Quên mật khẩu?</CardTitle>
        <CardDescription>
          Nhập địa chỉ email của bạn và chúng tôi sẽ gửi liên kết đặt lại mật khẩu.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {success ? (
          <div className="flex flex-col items-center justify-center space-y-4 py-4 animate-in fade-in zoom-in">
             <div className="h-12 w-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6" />
             </div>
             <div className="text-center space-y-2">
                <h3 className="font-semibold text-lg">Đã gửi email!</h3>
                <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                   Chúng tôi đã gửi hướng dẫn đặt lại mật khẩu đến <strong>{email}</strong>.
                </p>
             </div>
             <Button asChild className="w-full mt-4" variant="outline">
                <Link to="/auth/login">Quay lại đăng nhập</Link>
             </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="name@company.com" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button className="w-full" type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Gửi liên kết khôi phục
            </Button>
          </form>
        )}
      </CardContent>
      <CardFooter>
         {!success && (
            <Button variant="link" asChild className="px-0 text-muted-foreground w-full">
               <Link to="/auth/login" className="flex items-center justify-center gap-2">
                  <ArrowLeft className="h-4 w-4" /> Quay lại đăng nhập
               </Link>
            </Button>
         )}
      </CardFooter>
    </Card>
  );
}
