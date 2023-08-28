
const { ObjectID } = require("bson");
const { ObjectId } = require("mongodb");
const mongoose = require("mongoose")
db_url = "mongodb://localhost:27017/Online-Shop"

const cardSchema = mongoose.Schema({
    name: String,
    price: Number,
    amount: Number,
    productId: String,
    timestamp: Number,
    userId: String
})


const CARD = mongoose.model("card", cardSchema);


exports.addNewItemToCard = data => {
    //console.log(data)
    return new Promise((res, rej) => {
        mongoose.connect(db_url).then(() => {
           return CARD.findOne({productId: data.productId})
    }).then((item) => {
        //console.log(item)
        if(!item){
            let item = new CARD(data)
            return item.save()
        } else {
            return CARD.updateOne({_id: item._id}, {amount: +item.amount + +data.amount})
        }}).then(() => {
            mongoose.disconnect()
            res('ok')
        }).catch((err) => {
            mongoose.disconnect()
            rej(err)
        })
    })
}

exports.getUserCard = userId => {
    return new Promise((res, rej) => {
        mongoose.connect(db_url).then(() => {
            return CARD.find({userId: userId},{} ,{sort:{timestamp: 1}})
        }).then((items) => {
            mongoose.disconnect()
            res(items)
        }).catch((err) => {
            mongoose.disconnect()
            rej(err)
        })
    })
}

// let caurrentAmount = CARD.findOne({_id: id}, {amount:true})
// if(caurrentAmount == newData.amount)
exports.editItemAmount = (id, newData) => {
    //console.log("okm")
    //console.log(ObjectID(id))
    return new Promise((res, rej) => {  
    mongoose.connect(db_url)
    .then(() => {
       return CARD.findOne({_id: id})
    }).then(item => {
            if(item.amount != newData.amount)
                return CARD.updateOne({_id: id}, newData)    
        }).then((items) => {
        mongoose.disconnect();
        // console.log(items, 2)
        res(items);
    }).catch(err => {
        mongoose.disconnect()
        // console.log(err, 1)
        rej(err)
    })
})
}

exports.deleteItem = id => {
    return new Promise((res, rej) => {
        mongoose.connect(db_url)
        .then(() => {
           return CARD.deleteOne({_id: id})
        }).then(() => {
            mongoose.disconnect()
            res("success deletion")
        }).catch(err => {
            mongoose.disconnect()
            rej(err)
        })
    })
}

exports.DeleteAllItems = () => {
    return new Promise((res, rej) => {
        mongoose.connect(db_url).then(() => {
            return CARD.deleteMany()
        }).then(() => {
            mongoose.disconnect()
            res("ok")
        }).catch((err) => {
            mongoose.disconnect()
            rej(err)
        })
    })
}



// --------------------------------------------------------------//
