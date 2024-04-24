const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require('mongoose');
const userRoutes = require("../src/routes/userRoutes");
const User = require("../src/models/User");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/users', async (req, res) => {
    try {
        const nome = req.body.nome;
        const email = req.body.email;
        const idade = req.body.idade;
        const users = await User.find(); // Buscar todos os usuários do MongoDB
        res.json(users); // Enviar os usuários como resposta JSON
    } catch (error) {
        res.status(500).json({ message: error.message }); // Lidar com erros
    }
});

const PORT = 3000;

mongoose.connect('mongodb+srv://paaulomsf:pv123@pv.3vruzqb.mongodb.net/?retryWrites=true&w=majority&appName=pv')
.then(() => {
    console.log("Conexão com o MongoDB estabelecida com sucesso");
}).catch(error => {
    console.log("Erro ao conectar ao MongoDB:", error);
});
app.use(express.json());

app.use('/api/users', userRoutes);

app.post('/api/users', async (req, res) => {
    try {
      const newuser = new User(req.body); // Criar novo objeto User a partir do corpo da requisição
      await newuser.save(); // Salvar o novo usuário no MongoDB
      res.status(201).json({ message: 'Usuário criado com sucesso!' }); // Retornar mensagem de sucesso
    } catch (error) {
      res.status(400).json({ message: error.message }); // Lidar com erros de validação
    }
  });
  

app.listen(PORT, () => {
    console.log(`Servidor está conectado na porta  ${PORT}`);
});

// const axios = require('axios');

// const newUser = {
//   name: 'Paulo Victor',
//   email: 'OneDayOrDayOne@gmail.com',
//   password: 'senha123'
// };



// axios.post('http://localhost:41200/api/users', newUser)
//   .then(response => {
//     console.log('Usuário criado com sucesso!');
//     console.log(response.data);
//   })
//   .catch(error => {
//     console.error('Erro ao criar usuário:', error);
//   });