import {Schema, model} from 'mongoose'

const matriculaSchema = new Schema({
    codigo:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    descripcion:{
        type:String,
        trim:true,
        default:null
    },
    creditos :{
        type:String,
        default:null
    },
    estudiante:{
        type: Schema.Types.ObjectId,
        ref:"Estudiante",
        required:true
    },
    materia:{
        type: Schema.Types.ObjectId,
        ref:"Materia",
        required:true
    },
    status:{
        type:Boolean,
        default:true
    }
},{
    timestamps:true
})

export default model("Matricula",matriculaSchema)