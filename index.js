const express = require('express');
const app = express();
const port = 8000;
const ejs = require('ejs');
const {spawn} = require('child_process');

app.use(express.static('./css'));
app.use(express.urlencoded());
app.set('view engine','ejs');
app.set('views','./views');

app.get('/',function(req,res){
    return res.render('home',{
        title: "home"
    });
});

var way;
app.post('/select-way',function(req,res){
    if(req.body.way == "Extract important sentence"){
        way = "first";
    }
    else{
        way = "second";
    }
    return res.render('input_page',{
        title: "Summarize"
    });
})

app.post('/submit-text',function(req,res){
    var path = "./summariser/first.py";
    if(way=="second"){path = "./summariser/second.py";}
    console.log(way);
    var process = spawn('python',[path,req.body.Text,'text']);
    var summary;
    process.stdout.on('data',function(data){
		summary = data.toString();
        return res.render('summary',{
            title: "summary",
            SentText: req.body.Text,
            SummaryText: summary
        });
	});
});

app.post('/submit-url',function(req,res){
    var path = "./summariser/second.py";
    var process = spawn('python',[path,req.body.url,'url']);
    var summary;
    process.stdout.on('data',function(data){
		summary = data.toString();
        return res.render('summary',{
            title: "summary",
            SentText: req.body.Text,
            SummaryText: summary
        });
	});
});

app.listen(port,function(err){
    if(err){
        console.log('Error in running the server '+err);
    }
    console.log(`Server is running on port ${port}`);
});