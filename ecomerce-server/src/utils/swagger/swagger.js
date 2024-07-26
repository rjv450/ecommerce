import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'E-commerce API',
    version: '1.0.0',
    description: 'API documentation for the E-commerce application',
  },
  servers: [
    {
      url: `http://localhost:${process.env.PORT || 3000}`,
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      Product: {
        type: 'object',
        required: ['name', 'description', 'price'],
        properties: {
          _id: {
            type: 'string',
            format: 'uuid',
          },
          name: {
            type: 'string',
            description: 'Name of the product',
          },
          description: {
            type: 'string',
            description: 'Description of the product',
          },
          price: {
            type: 'number',
            format: 'float',
            description: 'Price of the product',
            minimum: 0,
          },
          variants: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/Variant',
            },
            description: 'List of variants for the product',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'Date and time when the product was created',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'Date and time when the product was last updated',
          },
        },
      },
      Variant: {
        type: 'object',
        required: ['color', 'stock'],
        properties: {
          _id: {
            type: 'string',
            format: 'uuid',
          },
          color: {
            type: 'string',
            description: 'Color of the variant',
          },
          stock: {
            type: 'number',
            description: 'Stock quantity of the variant',
            minimum: 0,
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'Date and time when the variant was created',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'Date and time when the variant was last updated',
          },
        },
      },
      User: {
        type: 'object',
        required: ['name', 'email', 'password'],
        properties: {
          _id: {
            type: 'string',
            format: 'uuid',
          },
          name: {
            type: 'string',
            description: 'Name of the user',
          },
          email: {
            type: 'string',
            format: 'email',
            description: 'Email of the user',
          },
          password: {
            type: 'string',
            description: 'Password of the user',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'Date and time when the user was created',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'Date and time when the user was last updated',
          },
        },
      },
      CartItem: {
        type: 'object',
        required: ['productId', 'variantId', 'quantity'],
        properties: {
          productId: {
            type: 'string',
            format: 'uuid',
            description: 'ID of the product',
          },
          variantId: {
            type: 'string',
            format: 'uuid',
            description: 'ID of the product variant',
          },
          quantity: {
            type: 'number',
            description: 'Quantity of the item in the cart',
            minimum: 1,
          },
        },
      },
      Cart: {
        type: 'object',
        required: ['userId', 'items'],
        properties: {
          userId: {
            type: 'string',
            format: 'uuid',
            description: 'ID of the user',
          },
          items: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/CartItem',
            },
            description: 'List of items in the cart',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'Date and time when the cart was created',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'Date and time when the cart was last updated',
          },
        },
      },
      OrderItem: {
        type: 'object',
        required: ['productId', 'variantId', 'quantity'],
        properties: {
          productId: {
            type: 'string',
            format: 'uuid',
            description: 'ID of the product',
          },
          variantId: {
            type: 'string',
            format: 'uuid',
            description: 'ID of the product variant',
          },
          quantity: {
            type: 'number',
            description: 'Quantity of the item in the order',
            minimum: 1,
          },
        },
      },
      Order: {
        type: 'object',
        required: ['userId', 'items', 'totalAmount'],
        properties: {
          userId: {
            type: 'string',
            format: 'uuid',
            description: 'ID of the user',
          },
          items: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/OrderItem',
            },
            description: 'List of items in the order',
          },
          totalAmount: {
            type: 'number',
            description: 'Total amount of the order',
            minimum: 0,
          },
          status: {
            type: 'string',
            enum: ['pending', 'completed', 'shipped', 'canceled'],
            description: 'Current status of the order',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'Date and time when the order was created',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'Date and time when the order was last updated',
          },
        },
      },
    },
  },
  security: [{
    bearerAuth: []
  }],
};


// Options for the swagger docs
const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.js', './src/models/*.js',   path.join(__dirname, '../../swagger-doc/*.js'),'../swagger/swagger-doc/authRoutes.swagger'],
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

export { swaggerUi, swaggerSpec };
