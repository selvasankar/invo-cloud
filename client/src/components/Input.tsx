export default function Input({ label, register, name, errors, ...rest }) {
  return (
    <div className="mb-4">
      <label className="block mb-1 font-medium">{label}</label>
      <input
        {...register(name)}
        {...rest}
        className="border rounded px-3 py-2 w-full"
      />
      {errors[name] && (
        <p className="text-red-600 text-sm mt-1">{errors[name].message}</p>
      )}
    </div>
  );
}
