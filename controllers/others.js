const Request = require('../models/Request')



module.exports = {
    getOthers: async (req,res)=>{
        try{
            //arrays of documents, sorted from incomplete to completed
            const requestedOthers = await Request.find({itemType: 'Other'})
            requestedOthers.sort((a,b)=>a.completed-b.completed) 

            //trigger render aka invoke ejs return
            res.render('others.ejs', {others: requestedOthers})
        }catch(err){
            console.log(err)
        }
    },
    markComplete: async (req, res)=>{
        try{
            await Request.findOneAndUpdate({_id:req.body.requestIdFromJsFile},{
                completed: true
            })
            console.log('Marked Complete')
            res.json('Marked Complete')
        }catch(err){
            console.log(err)
        }
    },
    markIncomplete: async (req, res)=>{
        try{
            await Request.findOneAndUpdate({_id:req.body.requestIdFromJsFile},{
                completed: false
            })
            console.log('Marked Incomplete')
            res.json('Marked Incomplete')
        }catch(err){
            console.log(err)
        }
    }
}    