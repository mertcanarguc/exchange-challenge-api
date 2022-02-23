import { Schema, model, connect } from 'mongoose'
import config from '../../../env'
connect(config.MONGO_URI)

const schema = new Schema({
  firstname:{type:String,required:true},
  lastname:{type:String,required:true},
  email:{type:String,required:true},
  password:{type:String,required:true},
  createdAt:{
    type:Date,
    default:Date.now,
  }
})

const UserModel = model('User',schema);

export default UserModel;