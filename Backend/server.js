require("dotenv").config();
const app = require("./src/app");
const morgan = require("morgan");
const connectDB = require("./src/config/db"); 

const PORT = process.env.PORT || 5000;


connectDB();


app.use(morgan(":method :url :status :response-time ms - :date[clf]"));


app.listen(PORT, '0.0.0.0', () => {
  console.log(`
  ╔══════════════════════════════════════════════════════════╗
  ║     🚀 SERVER STARTED SUCCESSFULLY                       ║
  ╠══════════════════════════════════════════════════════════╣
  ║  📍 Local: http://localhost:${PORT}                              
  ║  🌍 Public: https://counceller-project-2-1.onrender.com  
  ║                                                          ║
  ║  📦 MongoDB: Connected                                   
  ║  📧 Email: Resend Active                                 
  ║  🔑 Counselor Login: POST /api/counselor/login           
  ║                                                          ║
  ║  🧪 Test: GET http://localhost:${PORT}                      
  ╚══════════════════════════════════════════════════════════╝
  `);
});