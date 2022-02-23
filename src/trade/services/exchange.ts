const ETH = 0.04791411
const LTC = 0.00592855
const DASH = 0.06756612
const XRP = 0.00002001

const coins = [
  { coin: "ETH", value: ETH },
  { coin: "LTC", value: LTC },
  { coin: "DASH", value: DASH },
  { coin: "XRP", value: XRP },
]

const ExchangeService = (selling: string, buying: string, amount: number) => {
  const sellingCoin = coins.filter(item => item.coin == selling)[0] // satılmak istenen coin
  const buyingCoin = coins.filter(item => item.coin == buying)[0] // alınmak istenen coin
  const btc = sellingCoin.value * amount // satılacak coinin toplan btc değeri
  const fee = (btc * 0.045) // trade işlemi fee miktarı
  const purchaseAmount = (btc - fee) // fee çıkarıldıktan sonra kalan btc miktarı
  const purchasedCoinAmount = purchaseAmount / buyingCoin.value // fee'den sonra kalan miktar ile alınabilecek coin miktari
  return {
    selling_coin: sellingCoin,
    buying_coin: buyingCoin,
    fee: fee,
    amount: purchasedCoinAmount
  }
}

const BuyExchangeService = (selling: string, buying: string, amount: number) => {
  const sellingCoin = coins.filter(item => item.coin == selling)[0] // satılmak istenen coin
  const buyingCoin = coins.filter(item => item.coin == buying)[0] // alınmak istenen coin
  const btc = buyingCoin.value * amount // satılacak coinin toplan btc değeri
  const fee = (btc * 0.045) // trade işlemi fee miktarı
  const purchaseAmount = (btc - fee) // fee çıkarıldıktan sonra kalan btc miktarı
  const purchasedCoinAmount = purchaseAmount / sellingCoin.value // fee'den sonra kalan miktar ile alınabilecek coin miktari
  return {
    selling_coin: sellingCoin,
    buying_coin: buyingCoin,
    fee: fee,
    amount: purchasedCoinAmount
  }
}


export { ExchangeService,BuyExchangeService }