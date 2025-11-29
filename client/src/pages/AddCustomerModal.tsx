import { useForm } from "react-hook-form";
import Modal from "../components/Modal";
import Input from "../components/Input";
import Button from "../components/Button";
import { createCustomer } from "../api/customers.api";
import handleError from "../utils/handleError";

export default function AddCustomerModal({ isOpen, onClose, onSuccess }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const customer = await createCustomer(data);
      onSuccess(customer);
      onClose();
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <Modal title="Add Customer" isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input label="Name" name="name" register={register} errors={errors} required />
        <Input label="Email" name="email" register={register} errors={errors} />
        <Input label="Phone" name="phone" register={register} errors={errors} />
        <Input label="Address" name="address" register={register} errors={errors} />

        <Button type="submit" className="w-full mt-4">
          Save Customer
        </Button>
      </form>
    </Modal>
  );
}
