import customerRepo from "../repositories/customer.repository";

export default {
  list() {
    return customerRepo.list();
  },

  get(id: number) {
    const customer = customerRepo.get(id);
    if (!customer) throw { status: 404, message: "Customer not found" };
    return customer;
  },

  create(data: any) {
    return customerRepo.create(data);
  },

  update(id: number, data: any) {
    return customerRepo.update(id, data);
  },

  delete(id: number) {
    return customerRepo.delete(id);
  },
};

