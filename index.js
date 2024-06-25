const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'gateway01.ap-southeast-1.prod.aws.tidbcloud.com',
  user: 'RZ1kQ4i94H8LSNk.root',
  password: 'lBG4FL42oQPoajWG',  // ใช้รหัสผ่านที่ถูกต้อง
  database: 'animedb',
  port: 4000,
  ssl: {
    rejectUnauthorized: true
  }
});

// ตรวจสอบการเชื่อมต่อ
db.connect((err) => {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('Connected to database');
});

// สร้าง endpoint สำหรับดึงข้อมูลทั้งหมด
app.get('/animes', (req, res) => {
  const sql = 'SELECT * FROM animes';
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(result);
  });
});

// สร้าง endpoint สำหรับดึงข้อมูลตาม ID
app.get('/animes/:id', (req, res) => {
  const sql = 'SELECT * FROM animes WHERE id = ?';
  const id = req.params.id;
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(result[0]);
  });
});

// เริ่มเซิร์ฟเวอร์
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
