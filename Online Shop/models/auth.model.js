
const mongoose = require('mongoose')
const db_url = "mongodb://localhost:27017/Online-Shop";
const bcrypt = require('bcrypt');
const { use } = require('../routes/home.route');

const userSchema = mongoose.Schema({
    username:String,
    email:String,
    password:String,
    isAdmin: {
        type: Boolean,
        default: false
    }
})

const User = mongoose.model('user', userSchema);

exports.createAccount = (name, email, pw) => {
    return new Promise((res, rej) => {
        mongoose.connect(db_url).then(() => {
           return User.findOne({email:email})
        }).then(user => {
            if(user){
            mongoose.disconnect()
                rej('Email is already registered')
            } else {
                return bcrypt.hash(pw, 10)
            }
        }).then(hashedpw => 
            {
                let user = new User({
                    username: name,
                    email: email,
                    password: hashedpw
                })
                return user.save()
        }).then(() => {
            mongoose.disconnect()
            res('user created')
    }).catch((err) => {    
        mongoose.disconnect()
        rej(err)
        })
    })
}


exports.login = (email, password) => {
    return new Promise((res, rej) => {
        mongoose.connect(db_url).then(() => {
            return User.findOne({email:email})
    }).then(user => {
        if (!user){
            mongoose.disconnect()
            rej("No account matches this email")
        } else {
            bcrypt.compare(password, user.password).then(same => {
                if(same){
                    console.log(same)
            mongoose.disconnect()
            res({
                userId: user._id,
                isAdmin: user.isAdmin
            })
        } else {
            rej("Incorrect password")
           }
        })
    }
}).catch(err => {
        mongoose.disconnect()
        rej(err);
    })
})
}
    







// exports.createNewUser = (username, email, password) => {
//     // check whether email already existed
//     // yes ==> error
//     // no ==> create account
//     return new Promise((res, rej) => {
//         mongoose.connect(db_url).then(() => {
//             return User.findOne({email: email})
//         }).then(user => {
//             if (user) {
//                 mongoose.disconnect()
//                 rej('email is already registered')
//             }else{
//                 return bcrypt.hash(password, 10)
//             }
//         }).then((hashedPW) => {
//             let user = new User({
//                 username: username,
//                 email: email,
//                 password: hashedPW
//             })
//             return user.save()
//         }).then(() => {
//             mongoose.disconnect()
//             res()
//         }).catch(err => {
//             mongoose.disconnect()
//             rej(err)
//         })
//     })
// }

// exports.login = (email, password) => {
//     // check if email registered
//     // no ==> error
//         // yes ==> continue
//         // check password
//         // pw is false ==> error
//         // pw is true ==> continue
//           // set cockie (isuser, boolean)
//           // / set session /
//     return new Promise((res, rej) => {
//         mongoose.connect(db_url)
//         .then(() => User
//         .findOne({email: email})
//         .then((user) => {
//             if(!user){
//                 mongoose.disconnect()
//                 rej('email is not registerd')
//             }else{
//                  bcrypt.compare(password, user.password).then(same => {
//                     if(!same){
//                         mongoose.disconnect()
//                         rej('Password is not correct')
//                     }else{
//                         // set session
//                         mongoose.disconnect()
//                         res(user._id)
//                     }
//                 })
        
//             }
//         })
//         ).catch((err) => {
//             mongoose.disconnect()
//             rej(err)
//         })
//     })
// }