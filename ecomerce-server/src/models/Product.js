
import mongoose from 'mongoose';

const VariantSchema = new mongoose.Schema({
    color: { type: String, required: true },
    stock: { type: Number, required: true, min: 0 },
}, { timestamps: true });



const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    variants: [VariantSchema], // Use the imported VariantSchema
  }, { timestamps: true });
  
  const Product = mongoose.model('Product', ProductSchema);
  
  export default Product;