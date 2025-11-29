import { useForm } from "react-hook-form";
import { useSearchParams, useNavigate } from "react-router-dom";
import PageContainer from "../components/PageContainer";
import Button from "../components/Button";
import Input from "../components/Input";
import { resetPasswordApi } from "../api/auth.api";
import handleError from "../utils/handleError";

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token") || "";
  const email = searchParams.get("email") || "";

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<{ password: string }>();

  async function onSubmit(data: { password: string }) {
    try {
      await resetPasswordApi({ email, token, password: data.password });
      alert("Password reset successful. Please log in with your new password.");
      navigate("/login");
    } catch (err: any) {
      handleError(err);
    }
  }

  return (
    <PageContainer>
      <div className="max-w-md mx-auto mt-20 bg-white p-6 rounded-lg shadow-sm">
        <h1 className="text-xl font-semibold mb-4">Reset Password</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input value={email} readOnly className="w-full border rounded px-3 py-2 text-sm bg-gray-100" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">New password</label>
            <input
              {...register("password", { required: "Password required", minLength: { value: 6, message: "At least 6 chars" } })}
              type="password"
              className="w-full border rounded px-3 py-2 text-sm"
            />
            {errors.password && <p className="text-red-600 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>Set new password</Button>
          </div>
        </form>
      </div>
    </PageContainer>
  );
}
