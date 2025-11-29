// client/src/pages/LoginPage.tsx
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Button from "../components/Button";
import PageContainer from "../components/PageContainer";
import handleError from "../utils/handleError";

type FormValues = {
  email: string;
  password: string;
  remember?: boolean;
};

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, watch } = useForm<FormValues>({
    defaultValues: { email: "", password: "", remember: true },
  });

  const auth = useAuth();
  const navigate = useNavigate();
  const remember = watch("remember");

  useEffect(() => {
    if (auth?.token) {
      navigate("/", { replace: true });
    }
  }, [auth?.token, navigate]);

  async function onSubmit(data: FormValues) {
    try {
      await auth?.login(data.email, data.password, !!data.remember);
      navigate("/", { replace: true });
    } catch (err: any) {
      handleError(err);
    }
  }

  return (
    <PageContainer>
      <div className="max-w-md mx-auto mt-20 bg-white p-6 rounded-lg shadow-sm">
        <h1 className="text-2xl font-semibold mb-4 text-center">Sign in</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              className="w-full border rounded px-3 py-2 text-sm"
              placeholder="you@example.com"
              autoComplete="email"
            />
            {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              {...register("password", { required: "Password is required" })}
              type="password"
              className="w-full border rounded px-3 py-2 text-sm"
              placeholder="••••••••"
              autoComplete="current-password"
            />
            {errors.password && <p className="text-red-600 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <div className="flex items-center justify-between">
            <label className="inline-flex items-center text-sm">
              <input
                type="checkbox"
                {...register("remember")}
                className="h-4 w-4 rounded"
                defaultChecked
              />
              <span className="ml-2 text-sm">Remember me</span>
            </label>

            <Link to="/forgot" className="text-sm text-blue-600 hover:underline">Forgot?</Link>
          </div>

          <div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Signing in..." : "Sign in"}
            </Button>
          </div>
        </form>

        <div className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
        </div>
      </div>
    </PageContainer>
  );
}
