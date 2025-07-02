const port = 4000;
require("dotenv").config({ path: "./config.env" });
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const { log } = require("console");
const bcrypt = require("bcrypt");

app.use(express.json());
app.use(cors());
mongoose.connect(
  "mongodb+srv://himanshumire23:i8ff3kSgsw098i9B@cluster0.dbdcipd.mongodb.net/e-commerce"
);

app.get("/", (req, res) => {
  res.send("express app is running");
});

//image storage engine
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

app.use("/images", express.static("upload/images"));
app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});

const Product = mongoose.model("product", {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
  },
  new_price: {
    type: Number,
  },
  old_price: {
    type: Number,
  },
  discount: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

app.post("/addproduct", async (req, res) => {
  let Products = await Product.find({});
  let id;
  if (Products.length > 0) {
    let last_product_array = Products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id + 1;
  } else {
    id = 1;
  }
  try {
    const product = new Product({
      id: id,
      name: req.body.name,
      image: req.body.image,
      category: req.body.category,
      quantity: req.body.quantity,
      new_price: req.body.new_price,
      old_price: req.body.old_price,
      available: req.body.available ?? true, // optional fallback
    });

    console.log(product);
    await product.save();
    console.log("product added successfully");

    res.json({
      success: 1,
      name: req.body.name,
      message: "product added successfully",
    });
  } catch (err) {
    console.error("Error while adding product:", err.message);
    res.status(500).json({
      success: 0,
      message: "Internal server error",
      error: err.message,
    });
  }
});

app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  console.log("product removed successfully");
  res.json({
    success: true,
    name: req.body.name,
  });
});

app.get("/allproducts", async (req, res) => {
  let products = await Product.find({});
  console.log("all products fetched successfully");
  res.send(products);
});

const User = mongoose.model("user", {
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  cartData: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

//user register
// FIXED: User signup with proper validation and error handling
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields (name, email, password) are required",
      });
    }

    // Check if user already exists
    let check = await User.findOne({ email: email });
    if (check) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    // Hash password before storing (IMPORTANT for security)
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Default cart setup
    let cart = {};
    for (let i = 0; i < 300; i++) {
      cart[i] = 0;
    }

    const user = new User({
      name: name,
      email: email,
      password: hashedPassword, // Store hashed password
      cartData: cart,
    });

    // Save user first, then create token
    await user.save();
    console.log("User created successfully:", user.name);

    const data = {
      user: {
        id: user.id,
      },
    };

    const token = jwt.sign(data, process.env.JWT_SECRET || "secret_ecom");

    res.json({ 
      success: true, 
      data: {
        token: token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      }
    });
  } catch (err) {
    console.error("Signup error:", err.message);
    
    // Handle MongoDB duplicate key error specifically
    if (err.code === 11000) {
      return res.status(400).json({ 
        success: false, 
        message: "User with this email already exists" 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: "Internal server error"
    });
  }
});

// FIXED: User login with proper password comparison
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid email or password" 
      });
    }

    // Compare hashed password
    const passCompare = await bcrypt.compare(password, user.password);
    if (!passCompare) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid email or password" 
      });
    }

    const data = {
      user: {
        id: user.id
      }
    };
    
    const token = jwt.sign(data, process.env.JWT_SECRET || 'secret_ecom');
    res.json({ 
      success: true, 
      data: {
        token: token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      }
    });
    
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ 
      success: false, 
      message: "Internal server error"
    });
  }
});

//creating endpoint for new collection
app.get('/popularinwomen',async(req,res)=>{
  let products = await Product.find({category:"women"});
  let popular_in_women = products.slice(0,4);
  console.log("Popular In Women Fetched")
  res.send(popular_in_women);
})

//middleware - FIXED: Multiple errors corrected
const fetchUser = async(req, res, next)=>{
  const token = req.header('auth-token');
  if(!token){
    res.status(401).send({errors:"Please auth using valid token"})
  }
  else{
    try{
      // Fixed: Changed 'salt' to 'process.env.JWT_SECRET || "secret_ecom"' and removed 'secrete_ecom'
      const data = jwt.verify(token, process.env.JWT_SECRET || "secret_ecom");
      req.user = data.user;
      next();
    }catch(error){
      res.status(401).send({errors:"please authenticate using a valid token"})
    }
  }
}

// FIXED: Changed 'Users' to 'User' and fixed cartData update
app.post('/addtocart',fetchUser, async (req, res)=>{
  console.log("Added", req.body.itemId);
  let userData = await User.findOne({_id:req.user.id});
  userData.cartData[req.body.itemId] += 1;
  await User.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData}); // Fixed: Changed 'cart' to 'cartData'
  res.json({ message: "Added" });
})

//Remove products - FIXED: Changed 'Users' to 'User' and fixed cartData update
app.post('/removefromcart',fetchUser,async(req, res)=>{
  console.log("Removed", req.body.itemId);
  let userData = await User.findOne({_id:req.user.id});
  if(userData.cartData[req.body.itemId] >0)
  userData.cartData[req.body.itemId] -= 1;
  await User.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData}); // Fixed: Changed 'cart' to 'cartData'
  res.json({ message: "Removed" });
})

//get cartData - FIXED: Changed 'addEventListener' to 'app' and 'Users' to 'User'
app.post('/getcart',fetchUser,async (req, res)=>{
  console.log("GetCart");
  let userData = await User.findOne({_id:req.user.id})
  res.json(userData.cartData);
})

app.listen(port, (error) => {
  if (!error) {
    console.log("server running on port!" + port);
  } else {
    console.log("error" + error);
  }
});
module.exports = app;