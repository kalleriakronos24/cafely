const express = require('express');
const app = new express();
const mongoose = require('mongoose');
const PORT = 3000;
const path = require('path');
const bodyParser = require('body-parser');
const { Food } = require('../server/database/models/food.models');
const { User } = require('../server/database/models/user.models');

const cors = require('cors');


app.use('/public', express.static('../assets/'));
app.use(cors());
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	if (req.method == 'OPTIONS') {
		return res.sendStatus(200);
	}
	next();
});

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);
app.use(bodyParser.json());

app.get('/', (req,res) => {
    res.send({
        text : 'hello?'
    })
})
app.post('/addfood', (req,res) => {
    const qq = new Food({
        name : req.body.name,
        price : req.body.price,
        qty : req.body.qty,
        description : req.body.desc,
        primary_img : req.body.pri_img,
        other_img : req.body.other_img
    }, (err, result) => {
        console.log(result);
    })
    qq.save();
    res.send(qq);

})
app.post('/send', (req,res) => {
    const q = new Food({
        name : req.body.name ,
        price: req.body.price,
        qty : req.body.qty
    }, (result, err) => {
        console.log('result', result)
        console.log('error', err)
    })
    q.save();
})

app.post('/make', (req, res) => {
    const  q = new User({
        username : req.body.username,
        email : req.body.email,
        fullname : req.body.fullname,
        password : req.body.password
    })
    q.save();
    res.send('Berhasil');
})

app.get('/fetch', (req, res) => {
    const q = Food.find({}).then(r => {
        res.send(r)
    })
    return q;
})
app.post('/edit/:id', async (req, res) => {
    try{
        await Food.updateOne({ _id : req.params.id }, {
            name : req.body.name
        }).then(result => console.log(result))
    }catch(e){
        console.log(e)
    }
 
})

mongoose
	.connect('mongodb://localhost/cafely')
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Your app is now runnig on port ${PORT}`);
		});
	})
	.catch((err) => {
		console.log(err);
	});