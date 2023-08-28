
const mongoose = require('mongoose')
const db_url = "mongodb://localhost:27017/Online-Shop"
const OrderSchema = mongoose.Schema({
    email: String,
    name: String,
    price: Number,
    amount: Number,
    address: String,
    timestamp: Number,
    status: String,
    userId:String
})

const Order = mongoose.model("order", OrderSchema)


exports.addNewOrder = data => {
    return new Promise((res, rej) => {
        mongoose.connect(db_url).then(() => {
            let order = new Order(data)
            return order.save()
        }).then(() => {
            mongoose.disconnect()
            res("ok")
        }).catch((err) => {
            mongoose.disconnect()
            rej(err)
        })
    })
}


exports.addAllOrders = (cards, data) => {
    return new Promise((res, rej) => {
        for(let i = 0; i <= cards.length-1 ; i++){
        mongoose.connect(db_url).then(() => {
            let orders 

                // let Card = new Object()
//console.log(cards[i], i)
 let Card = cards[i]
               // console.log(Card, i)
               // console.log(Card.name)

                // let {name, price, amount} = Card
                // let pOrder = {
                //   }
                let order = new Order({
                    name: Card.name,
                    userId: Card.userId,
                    price: Card.price,
                amount: Card.amount,
                    address: data.address,
                    timestamp: data.timestamp,
                status: data.status,
                email: data.email
                })
                 order.save()
                // mongoose.disconnect()
 //         }
            // return orders
        }).then(() => {
            //mongoose.disconnect()
            res("ok")
        }).catch(err => {
            //mongoose.disconnect()
            rej(err)
        })
    }
    })

}


exports.getOrders = (id) => {
    return new Promise((res, rej) => {
        mongoose.connect(db_url).then(() => {
            return Order.find({userId: id})
        }).then(orders => {
            mongoose.disconnect()
            res(orders)
        }).catch((err) => {
            mongoose.disconnect()
            rej(err)
        })
    })
}

exports.deleteOrder = (cardId) => {
    return new Promise((res, rej) => {
        mongoose.connect(db_url).then(() => {
            return Order.deleteOne({cardId: cardId})
        }).then(() => {
            mongoose.disconnect()
            res("ok")
        }).catch((err) => {
            mongoose.disconnect()
            rej(err)
        })
    })
}



exports.deleteAllOrders = (userId) => {
    return new Promise((res, rej) => {
        mongoose.connect(db_url).then(() => {
            return Order.deleteMany({userId: userId})
        }).then(() => {
            mongoose.disconnect()
            res("ok")
        }).catch((err) => {
            mongoose.disconnect()
            rej(err)
        })
    })
}



exports.getAllOrders = () => {
    console.log(33)
    return new Promise((res, rej) => {
        // return rej("dslf")
        mongoose.connect(db_url).then(() => {
            return Order.find({})
        }).then(orders => {
            mongoose.disconnect()
            res(orders)
        }).catch((err) => {
            mongoose.disconnect()
            rej(err)
        })
    })
}

exports.getOrdersByEmail = (email) => {
    return new Promise((res, rej) => {
        mongoose.connect(db_url).then(() => {
            return Order.find({email: email})
        }).then(orders => {
            mongoose.disconnect()
            res(orders)
        }).catch((err) => {
            mongoose.disconnect()
            rej(err)
        })
    })
}


exports.getOrdersByStatus = (filter, qEmail) => {
    console.log(filter, "model")
    return new Promise((res, rej) => {
        mongoose.connect(db_url).then(() => {
            if(!qEmail)
            return Order.find({status: filter})
            if(qEmail)
            return Order.find({status: filter, email:qEmail})

        }).then((orders) => {
            mongoose.disconnect()
            console.log(orders, 00)
            console.log(qEmail, 090)
            res(orders)
        }).catch((err) => {
            mongoose.disconnect()
            rej(err)
        })
    })
}


exports.updateStatusDB = (cardId, newStatus) => {
    console.log(newStatus, 87)
    return new Promise((res, rej) => {
        mongoose.connect(db_url).then(() => {
            return Order.updateOne({_id: cardId}, {status: newStatus})
        }).then(() => {
            mongoose.disconnect()
            res('ok')
        }).catch(err => {
            mongoose.disconnect()
            rej(err)
        })
    })
}