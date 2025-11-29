import productRepo from "../repositories/product.repository";

export default {
  list() {
    return productRepo.list();
  },

  get(id: number) {
    return productRepo.get(id);
  },

  create(data: any) {
    return productRepo.create(data);
  },

  update(id: number, data: any) {
    return productRepo.update(id, data);
  },

  delete(id: number) {
    return productRepo.delete(id);
  },
};
