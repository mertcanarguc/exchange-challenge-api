import { Schema, model, connect } from 'mongoose'
import config from '../../../env'
connect(config.MONGO_URI)

const schema = new Schema({
  user_id:{type:String,required:true},
  coin:{type:String,required:true},
  amount:{type:Number,required:true},
  createdAt:{
    type:Date,
    default:Date.now,
  },
  updatedAt:{
    type:Date
  }
})

const WalletModel = model('Wallet',schema);

export default WalletModel;