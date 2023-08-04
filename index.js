const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const mysql = require('mysql');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;


// // Create a connection pool to MySQL database
// const pool = mysql.createPool({
//     host: '66.29.132.149',
//     user: 'hnktscxf_zipline_db_user',
//     password: 'Zipline_user_123',
//     database: 'hnktscxf_zipline_db',
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0,
// });

// Configure multer to handle file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + extension);
  }
});

const upload = multer({ storage: storage });

// Inside the route handler
app.post('/submit', upload.fields([
    { name: 'govt_id_front', maxCount: 1 },
    { name: 'govt_id_back', maxCount: 1 },
    { name: 'profile_picture', maxCount: 1 }
  ]), (req, res) => {
    const requiredFields = [
      'name', 'email', 'company_name', 'mobile_number',
      'password', 'confirm_password', 'address', 'gender'
    ];
    
    const requiredFiles = [
      'govt_id_front', 'govt_id_back', 'profile_picture'
    ];
  
    const missingFields = requiredFields.filter(field => !req.body[field]);
    const missingFiles = requiredFiles.filter(file => !req.files[file]);
  
    if (missingFields.length > 0 || missingFiles.length > 0) {
      const missingItems = [...missingFields, ...missingFiles];
      const errorMessage = `Missing required ${missingItems.join(', ')}!`;
      return res.status(400).send(errorMessage);
    }
  
    const govtIdFrontFile = req.files['govt_id_front'][0];
    const govtIdBackFile = req.files['govt_id_back'][0];
    const profilePictureFile = req.files['profile_picture'][0];
  
    // Logging received data
    console.log('Received data:');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Company Name:', company_name);
    console.log('Mobile Number:', mobile_number);
    console.log('Password:', password);
    console.log('Confirm Password:', confirm_password);
    console.log('Address:', address);
    console.log('Gender:', gender);
  
    // Logging file details
    console.log('Received files:');
    console.log('Govt ID Front:', govtIdFrontFile.filename);
    console.log('Govt ID Back:', govtIdBackFile.filename);
    console.log('Profile Picture:', profilePictureFile.filename);
  
    res.send('Data and files received successfully.');
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${port}`);
  });