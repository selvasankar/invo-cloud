import customerService from "../services/customer.service";

export default {
  listCustomers: async (req, res) => {
    const data = await customerService.list();
    res.json({ status: true, data });
  },

  getCustomerById: async (req, res) => {
    const data = await customerService.get(Number(req.params.id));
    res.json({ status: true, data });
  },

  createCustomer: async (req, res) => {
    const [customer] = await customerService.create(req.body);
    res.status(201).json({ status: true, data: customer });
  },

  updateCustomer: async (req, res) => {
    await customerService.update(Number(req.params.id), req.body);
    res.json({ status: true, message: "Customer updated" });
  },

  deleteCustomer: async (req, res) => {
    await customerService.delete(Number(req.params.id));
    res.json({ status: true, message: "Customer deleted" });
  },
};
