import { Schema,model } from "mongoose";
import bcrypt from 'bcryptjs'

const usuarioSchema = new Schema({
    nombre:{
        type: String,
        required: true,
        trim: true
    },
    apellido:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password:{
        type: String,
        required: true,     
        trim: true
    },
    status:{
        type: Boolean,
        default: true
    },
    token:{
        type: String,
        default: null
    },
    rol:{
        type: String,
        default:"usuario"
    }
},{
   timestamps: true
})

// Método para encriptar la contraseña antes de guardarla
usuarioSchema.methods.encryptPassword = async function(password){
    const salt = await bcrypt.genSalt(10)
    const passwordEncryp = await bcrypt.hash(password,salt)
    return passwordEncryp
}

// verificar si la contraseña coincide con la bdd
usuarioSchema.methods.matchPassword = async function(password){
    const response = await bcrypt.compare(password,this.password)
    return response
}

//crear token
usuarioSchema.methods.createToken = function(){
    const tokenGenerado = Math.random().toString(36).substring(2)
    this.token = tokenGenerado
    return tokenGenerado
}

export default model('Usuario',usuarioSchema)