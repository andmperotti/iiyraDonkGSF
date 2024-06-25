const Request = require('../models/Request')



module.exports = {
    getRequestedItems: async (req,res)=>{
        try{
            //arrays of documents, sorted from incomplete to completed
            const requestedGems = await Request.find({userName:req.user.userName, itemType: 'Gem'})
            //sort by incompleted first then completed
            requestedGems.sort((a,b)=>a.completed-b.completed) 

            const requestedUniques = await Request.find({userName:req.user.userName, itemType: 'Unique'})
            requestedUniques.sort((a,b)=>a.completed-b.completed) 

            const requestedOthers = await Request.find({userName:req.user.userName, itemType: "Other"})
            requestedGems.sort((a,b)=>a.completed-b.completed)


            //trigger render aka invoke ejs return
            res.render('request.ejs', {gems: requestedGems, uniques: requestedUniques, others: requestedOthers})
        }catch(err){
            console.log(err)
        }
    },
    createRequestedItem: async (req, res)=>{
        try{
            await Request.create({requestedItem: req.body.requestedItem, completed: false, userName: req.user.userName, itemType: req.body.itemType, discordName: req.user.discordName})
            res.redirect('/request')
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
    },
    deleteRequested: async (req, res)=>{
        console.log(req.body.requestIdFromJsFile)
        try{
            await Request.findOneAndDelete({_id:req.body.requestIdFromJsFile})
            console.log('Deleted request')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }
}    