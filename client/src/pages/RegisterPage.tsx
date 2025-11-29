// client/src/pages/RegisterPage.tsx
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Button from "../components/Button";
import PageContainer from "../components/PageContainer";
import handleError from "../utils/handleError";

type FormValues = {
  name: string;
  email: string;
  password: string;
  remember?: boolean;
};

export default function RegisterPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    defaultValues: { name: "", email: "", password: "", remember: true },
  });

  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth?.token) {
      navigate("/", { replace: true });
    }
  }, [auth?.token, navigate]);

  async function onSubmit(data: FormValues) {
    try {
      // Use register helper in context; it registers and logs in automatically
      if (auth?.register) {
        await auth.register(data.name, data.email, data.password, !!data.remember);
        navigate("/", { replace: true });
      } else {
        // fallback: call API directly then login
        // import registerApi if you want fallback path (but keep bundle small)
        throw new Error("Registration unavailable - please try again.");
      }
    } catch (err: any) {
      handleError(err);
    }
  }

  return (
    <PageContainer>
      <div className="max-w-md mx-auto mt-16 bg-white p-6 rounded-lg shadow-sm">
        <h1 className="text-2xl font-semibold mb-4 text-center">Create an account</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full name</label>
            <input
              {...register("name", { required: "Name is required" })}
              type="text"
              className="w-full border rounded px-3 py-2 text-sm"
              placeholder="Your full name"
              autoComplete="name"
            />
            {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name.message}</p>}
          </div>

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
              {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
              type="password"
              className="w-full border rounded px-3 py-2 text-sm"
              placeholder="Choose a strong password"
              autoComplete="new-password"
            />
            {errors.password && <p className="text-red-600 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              {...register("remember")}
              className="h-4 w-4 rounded"
              defaultChecked
            />
            <span className="ml-2 text-sm">Remember me</span>
          </div>

          <div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create account"}
            </Button>
          </div>
        </form>

        <div className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">Sign in</Link>
        </div>
      </div>
    </PageContainer>
  );
}
