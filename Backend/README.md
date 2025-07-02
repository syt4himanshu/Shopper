# E-commerce Backend API

A complete, production-ready e-commerce backend built with Node.js, Express, MongoDB, and JWT authentication.

## 🚀 Features

- **Product Management**: CRUD operations for products with image upload
- **User Authentication**: JWT-based authentication with password hashing
- **Cart Management**: Add, remove, and manage user shopping carts
- **Image Upload**: Secure file upload with validation and size limits
- **Rate Limiting**: API rate limiting to prevent abuse
- **Input Validation**: Comprehensive request validation
- **Error Handling**: Centralized error handling with proper HTTP status codes
- **Security**: CORS configuration, input sanitization, and secure headers

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ecommerce-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   - Copy `config.env` and update the values:
   ```env
   PORT=4000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   NODE_ENV=development
   ```

4. **Create upload directory**
   ```bash
   mkdir -p upload/images
   ```

5. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## 📚 API Documentation

### Base URL
```
http://localhost:4000
```

### Authentication
All protected routes require a Bearer token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## 🔐 Authentication Endpoints

### User Registration
```http
POST /api/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### User Login
```http
POST /api/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Get User Profile
```http
GET /api/profile
Authorization: Bearer <token>
```

### Update User Profile
```http
PUT /api/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Smith",
  "email": "johnsmith@example.com"
}
```

## 🛒 Cart Management

### Add Item to Cart
```http
POST /api/addtocart
Authorization: Bearer <token>
Content-Type: application/json

{
  "itemId": 1,
  "quantity": 2
}
```

### Remove Item from Cart
```http
POST /api/removefromcart
Authorization: Bearer <token>
Content-Type: application/json

{
  "itemId": 1
}
```

### Get Cart Data
```http
POST /api/getcart
Authorization: Bearer <token>
```

## 📦 Product Management

### Get All Products
```http
GET /api/allproducts?category=men&available=true&limit=10&page=1
```

### Get Single Product
```http
GET /api/product/1
```

### Get New Collections (Latest 8 Products)
```http
GET /api/newcollections
```

### Get Popular Women Products
```http
GET /api/popularinwomen
```

### Add New Product (Admin Only)
```http
POST /api/addproduct
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "id": 1,
  "name": "Product Name",
  "image": "product_image.jpg",
  "category": "men",
  "new_price": 99.99,
  "old_price": 129.99,
  "description": "Product description",
  "stock": 50
}
```

### Update Product (Admin Only)
```http
PUT /api/updateproduct/1
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "name": "Updated Product Name",
  "new_price": 89.99,
  "stock": 25
}
```

### Remove Product (Admin Only)
```http
POST /api/removeproduct
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "id": 1
}
```

## 📸 Image Upload

### Upload Product Image
```http
POST /upload
Content-Type: multipart/form-data

Form Data:
- product: [image file]
```

**Supported formats**: JPEG, JPG, PNG, GIF, WebP
**Maximum size**: 5MB

## 📊 Response Format

All API responses follow a consistent format:

### Success Response
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {
    // Response data
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "fieldName",
      "message": "Validation error message",
      "value": "invalid value"
    }
  ]
}
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 4000 |
| `MONGODB_URI` | MongoDB connection string | Required |
| `JWT_SECRET` | JWT secret key | Required |
| `NODE_ENV` | Environment mode | development |

### Rate Limiting

- **Window**: 15 minutes
- **Max requests**: 100 per IP
- **Headers**: Standard rate limit headers included

## 🏗️ Project Structure

```
├── controllers/
│   ├── productController.js
│   └── userController.js
├── middleware/
│   ├── auth.js
│   ├── errorHandler.js
│   ├── upload.js
│   └── validation.js
├── models/
│   ├── Product.js
│   └── User.js
├── routes/
│   ├── productRoutes.js
│   └── userRoutes.js
├── upload/
│   └── images/
├── config.env
├── index.js
├── package.json
└── README.md
```

## 🗄️ Database Schemas

### Product Schema
```javascript
{
  id: Number,           // Required, unique
  name: String,         // Required, max 100 chars
  image: String,        // Required
  category: String,     // Required, enum values
  new_price: Number,    // Required, min 0
  old_price: Number,    // Required, min 0
  date: Date,           // Default: Date.now
  available: Boolean,   // Default: true
  description: String,  // Optional, max 500 chars
  stock: Number         // Default: 0, min 0
}
```

### User Schema
```javascript
{
  name: String,         // Required, max 50 chars
  email: String,        // Required, unique, validated
  password: String,     // Required, min 6 chars, hashed
  cartData: Object,     // Default: empty cart with 300 slots
  date: Date,           // Default: Date.now
  role: String,         // Default: 'user', enum: ['user', 'admin']
  isActive: Boolean     // Default: true
}
```

## 🔒 Security Features

- **Password Hashing**: bcryptjs with salt rounds
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Express-validator for all inputs
- **CORS Protection**: Configurable CORS settings
- **Rate Limiting**: Prevents API abuse
- **File Upload Security**: Type and size validation
- **Error Handling**: No sensitive data exposure

## 🧪 Testing

### Manual Testing with cURL

1. **Register a user**
   ```bash
   curl -X POST http://localhost:4000/api/signup \
     -H "Content-Type: application/json" \
     -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
   ```

2. **Login**
   ```bash
   curl -X POST http://localhost:4000/api/login \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"password123"}'
   ```

3. **Get all products**
   ```bash
   curl http://localhost:4000/api/allproducts
   ```

## 🚀 Deployment

### Production Checklist

1. **Environment Variables**
   - Set `NODE_ENV=production`
   - Use strong `JWT_SECRET`
   - Configure production MongoDB URI

2. **Security**
   - Update CORS origins
   - Use HTTPS in production
   - Set up proper firewall rules

3. **Performance**
   - Enable MongoDB indexes
   - Configure proper logging
   - Set up monitoring

4. **File Upload**
   - Configure cloud storage (AWS S3, etc.)
   - Set up CDN for images

## 📝 License

This project is licensed under the ISC License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support and questions, please open an issue in the repository. 