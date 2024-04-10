import express from 'express';
const app = express();
const port = 3001;

// 假设你使用的是 MongoDB Node.js 驱动程序
import { MongoClient } from 'mongodb';
const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'trip';

app.get('/api/data', async (req, res) => {
  try {
    const client = await MongoClient.connect(mongoUrl);
    const db = client.db(dbName);
    const collection = db.collection('trip');
    const result = await collection.find().toArray();
    res.json(result);
  } catch (error) {
    console.error('从数据库获取数据时出错:', error);
    res.status(500).json({ error: '从数据库获取数据时出错' });
  }
});

app.listen(port, () => {
  console.log(`后端服务器运行在 http://localhost:${port}`);
});