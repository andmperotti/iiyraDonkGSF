const Build = require('../models/Build')



module.exports = {
    getBuilds: async (req,res)=>{
        try{
            //arrays of build documents, sorted from incomplete to completed
            const builds = await Build.find({})
            builds.sort((a,b)=>a.completed-b.completed) 

            //trigger render aka invoke ejs return
            res.render('builds.ejs', {builds: builds})
        }catch(err){
            console.log(err)
        }
    },
    createBuild: async (req, res)=>{
        try{
            await Build.create({buildName: req.body.buildName, buildCharacterName: req.body.buildCharacterName, buildResource: req.body.buildResource, completed: false, userName: req.user.userName})
            console.log('Todo has been added!')
            res.redirect('/builds')
        }catch(err){
            console.log(err)
        }
    }
}    