require("dotenv").config();
const app = require("./src/app");
const morgan = require("morgan");
const connectDB = require("./src/config/db"); 

const PORT = process.env.PORT || 5000;

connectDB();

app.use(morgan(":method :url :status :response-time ms - :date[clf]"));

// Start server
app.listen(PORT, () => {
  console.log(`
   Server started successfully!
  URL: http://localhost:${PORT}
  
   MongoDB Connected!
   Counselor Login: POST http://localhost:${PORT}/api/counselor/login
  
   Login Credentials:
     Email: counselor@company.com
     Password:Counselor@123#Secure
  
   Test with: GET http://localhost:${PORT}
  `);
});
