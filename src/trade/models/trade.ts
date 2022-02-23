import { Schema, model, connect } from 'mongoose'
import config from '../../../env'
connect(config.MONGO_URI)

const schema = new Schema({
  user_id: { type: String },
  selling_coin: { type: Object, required: true },
  purchased_coin: { type: Object, required: true },
  fee: { type: String, required: true },
  amount: { type: Number, required: true },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const TradeModel = model('Trade', schema);

export default TradeModel;