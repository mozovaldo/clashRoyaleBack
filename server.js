require('dotenv').config()
const app = require('express')()
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

//conexao com o database
mongoose.connect(`mongodb+srv://root:${process.env.PASSWORD_DB}@cluster0.xptfl.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,{useNewUrlParser:true,useUnifiedTopology: true})

const db = mongoose.connection

db.on('error',console.error.bind(console,'Erro de conexao'))

db.once('open',function(){
    console.log('Conexao bem sucedida')
})
//definindo os middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use(cors())

app.get('/',(req,res)=>{res.send('Ola mundo')})
//configurando rotas
app.use('/auth',require('./routes/auth'))

//ouvindo porta no servidor
app.listen(3333,()=>{
    console.log('Iniciou o servidor')
})