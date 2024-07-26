import Product from '../models/Product.js';

export const createProduct = async (req, res) => {
    const { name, description, price, variants } = req.body;
    console.log(req.user);
    try {
        const product = new Product({
            name,
            description,
            price,
            variants
        });

        await product.save();

        res.status(201).json(product);
    } catch (error) {
        console.error(error); 
        res.status(500).json({ message: 'Error creating product', error: error.message });
    }
};


export const getProducts = async (req, res) => {
    const { page = 1, limit = 10, sortby = 'name', order = 'asc', search = '' } = req.query;

    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(limit, 10);
    const sortOrder = order === 'desc' ? -1 : 1;

    try {
        const searchQuery = search ? { name: { $regex: search, $options: 'i' } } : {};
        const products = await Product.find(searchQuery)
            .populate('variants')
            .sort({ [sortby]: sortOrder })
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize);
        const totalProducts = await Product.countDocuments(searchQuery);

        res.status(200).json({
            total: totalProducts,
            page: pageNumber,
            limit: pageSize,
            totalPages: Math.ceil(totalProducts / pageSize),
            products,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
};


export const getProductById = async (req, res) => {

    try {
        const product = await Product.findById(req.params.id).populate('variants');
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching product' });
    }
};


export const deleteProductById = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product' });
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    console.log(req.body);
    const { name, description, price } = req.body;
    console.log(name,description,price,"before");
    const updates = { name, description, price };

    try {
        // Remove properties that are not being updated
        Object.keys(updates).forEach(key => updates[key] === undefined && delete updates[key]);

        const product = await Product.findByIdAndUpdate(id, updates, { new: true });
        console.log(product);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating product' });
    }
};