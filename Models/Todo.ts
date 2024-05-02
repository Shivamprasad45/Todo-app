import mongoose from "mongoose";
const { Schema } = mongoose;

const TodoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
});

const Todo = mongoose.models.TodoList || mongoose.model("TodoList", TodoSchema);

export default Todo;
