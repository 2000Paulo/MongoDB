const User = require("../models/User");

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.createUser = async (req, res) => {
    const user = new User(req.body);
    try {
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
};

exports.updateUser = async (req, res) =>{
    const {id} = req.params;
    try {
        const updateUser = await User.findByIdAndUpdate(id,req.body, {new: true});
        if (!updateUser){
            return res.status(404).json({ message: "Usuário não encontrado"});
        }
        res.status(200).json(updateUser);
    }catch (error){
        res.status(400).json({ message: error.message});
    }
}

exports.deleteUser = async (req, res) =>{
    const {id} = req.params;
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser){
            return res.status(404).json({ message: "Usuário não encontrado"});
        }
        res.status(200).json({message: "Usuário excluído com sucesso"});
    }catch (error){
        res.status(400).json({ message: error.message});
    }
}


//Async Await Javascript
// Desestruturação
// Try e Catch

//Trabalho de Vocês
// Update User
//Delete User
