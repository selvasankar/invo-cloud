import productService from "../services/product.service";

export default {
  listProducts: async (req, res) => {
    const data = await productService.list();
    res.json({ status: true, data });
  },

  getProductById: async (req, res) => {
    const data = await productService.get(Number(req.params.id));
    res.json({ status: true, data });
  },

  createProduct: async (req, res) => {
    const [product] = await productService.create(req.body);
    res.status(201).json({ status: true, data: product });
  },

  updateProduct: async (req, res) => {
    await productService.update(Number(req.params.id), req.body);
    res.json({ status: true, message: "Product updated" });
  },

  deleteProduct: async (req, res) => {
    await productService.delete(Number(req.params.id));
    res.json({ status: true, message: "Product deleted" });
  },
};
