import app from '../app.js';
import connectDB from './config/dbConfig.js'
import { notFound, errorHandler } from './middlewares/errorMiddleware.js';
import authRoutes from './routes/authRoutes.js'
import productRoutes from './routes/productRoutes.js'
import variantRoutes from './routes/variantRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import cartRoutes from './routes/cartRouter.js'
import cors from 'cors';
import { swaggerUi, swaggerSpec } from './utils/swagger/swagger.js';
const port = process.env.PORT || 3000;

connectDB()
app.use(cors());
app.use('/api/auth', authRoutes);
app.use('/api/product', productRoutes);
app.use('/api/product', variantRoutes);
app.use('/api/cart', cartRoutes)
app.use('/api/order', orderRoutes)
// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.use(errorHandler)
// app.use(notFound)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
