import {Schema, model} from 'mongoose'

const estudianteSchema = new Schema({
    nombre:{
        type:String,
        required:true,
        trim:true
    },
    apellido:{
        type:String,
        required:true,
        trim:true
    },
    cedula:{
        type:String,
        required:true,
        trim:true,
        unique:true,
    },
    fecha_nacimiento: {
        type: Date,
        default: null
    },
    ciudad:{
        type:String,
        trim:true,
        default:null
    },
    direccion:{
        type:String,
        trim:true,
        default:null
    },
    telefono:{
        type:String,
        trim:true,
        default:null
    },
    email:{
        type:String,
        required:true,
        trim:true,
		unique:true
    },
    status:{
        type:Boolean,
        default:true
    },
    rol:{
        type:String,
        default:"estudiante"
    }

},{
    timestamps:true
})


export default model('Estudiante',estudianteSchema)