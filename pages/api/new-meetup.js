//     /api/new-meetup

import { MongoClient } from 'mongodb';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const data = req.body;
      const { title, img, address } = data;

      const client = await MongoClient.connect(
        `mongodb+srv://samardeep:${process.env.MONGODBPASS}@cluster0.oubka.mongodb.net/meetUpDB?retryWrites=true&w=majority`,
      );

      const db = client.db();
      const meetupsCollection = db.collection('meetUpsCollection');

      const result = await meetupsCollection.insertOne(data);
      client.close();

      res.status(201).json({ message: 'insert sucessfully' });
    } catch (error) {
      console.log(error);
    }
  }
};

export default handler;
