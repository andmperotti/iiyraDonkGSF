const User = require('../models/User')



module.exports = {
    getUsers: async (req,res)=>{
        try{
            //arrays of documents, sorted from incomplete to completed
            const users = await User.find({})
            //sort document objects in the array by the userName property value
            users.sort((a,b)=>a.userName-b.userName)

            //trigger render aka invoke ejs return
            res.render('users.ejs', {users: users})
        }catch(err){
            console.log(err)
        }
    }
}    