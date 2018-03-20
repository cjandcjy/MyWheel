let express = require('express')
let cors = require('cors')
let multer = require('multer')

let app = express()
let upload = multer({dest:'/upload'})
app.options('/upload',cors())
app.post('/upload',cors(),upload.single('file'),function(req,res){
    return res.send(res.file.key)
})

app.get('/upload',function(req,res){
    let key = req.param('key')
    let options = {
        root:__dirname+'/upload/',
        headers:{
            'content-type':'image/jpeg'
        }
    }
    res.sendFile(key,options,function(err){
        if(err){
            res.sendStatus(404)
        }else{
            console.log('send file success');
        }
    })
})

app.use('*',function(req,res){
    res.send('error')
})
app.listen(3000,function(){
    console.log("listening on port 3000...");
});
