// DbConnect.ts
import mongoose from 'mongoose';

 const DbConnect =async () => {
  try {
   await mongoose.connect('mongodb+srv://shivamGond:Mmfdv2UuHK9LVAjS@cluster0.y7agcqc.mongodb.net/Todo');
    console.log("Mongoose connected");
  } catch (error) {
    console.log(error);
  }
};


export default DbConnect