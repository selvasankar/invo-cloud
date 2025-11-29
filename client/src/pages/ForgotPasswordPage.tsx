import { useForm } from "react-hook-form";
import PageContainer from "../components/PageContainer";
import Button from "../components/Button";
import Input from "../components/Input";
import { forgotPasswordApi } from "../api/auth.api";
import handleError from "../utils/handleError";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function ForgotPasswordPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<{ email: string }>();
  const [done, setDone] = useState(false);

  async function onSubmit(data: { email: string }) {
    try {
      await forgotPasswordApi(data.email);
      setDone(true);
    } catch (err: any) {
      handleError(err);
    }
  }

  return (
    <PageContainer>
      <div className="max-w-md mx-auto mt-20 bg-white p-6 rounded-lg shadow-sm">
        <h1 className="text-xl font-semibold mb-4">Forgot Password</h1>

        {!done ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input label="Email" name="email" register={register} errors={errors} />
            <Button type="submit" className="w-full" disabled={isSubmitting}>Send reset link</Button>
          </form>
        ) : (
          <div className="text-center">
            <p className="mb-4">If the email exists, we sent a reset link. Check your inbox.</p>
            <Link to="/login" className="text-blue-600">Back to login</Link>
          </div>
        )}
      </div>
    </PageContainer>
  );
}
