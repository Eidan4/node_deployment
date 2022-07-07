const Task1 = require("../models/task");
const User = require('../models/user');
const Station = require('../models/station');
const Zone = require("../models/zone");
const Pro= require("../models/process");
const TaskStation = require("../models/task-station");
const Order= require("../models/order");
const Product = require('../models/product');


const createTaskStation = async (req, res = response)=>{
    const {id} = req.params;
    const order = await Order.findById(id);
    const prefijo = order.prefijo;
    const prefijoUpperCase = prefijo.toUpperCase();
    const product = await Product.findOne({ prefijo: prefijoUpperCase });
    const process = await Pro.findOne({ product: product.id });
    const busqueda = process.tasks;
    let mapeo = busqueda.map(function(obj){
        let rObj = {};
        rObj[obj.task]=true;
        return obj.task;
    })
    // console.log(mapeo);
    lista = [];
    
    function getStations(mapeo,id){
        for(let i=0; i<mapeo.length; i++){
            let buscar = mapeo[i];
            let tareas = Task1.findById(buscar, function(err,inventario){
                const respuesta = inventario.station;
                Station.findById(respuesta).exec((error,inventario)=>{
                    let estacion = inventario.station;
                    lista.push(estacion);
                    if(mapeo.length === lista.length){
                        //  TaskStation.findById(id).exec((error,inventario)=>{
                            
                        //  })
                        res.json(lista);
                    } 
                }) 
            })
        }
    }

    const nombre = req.body.nombre;
    const OrderProductions = id;
    const processt = product.id;
    const Task = mapeo;

    const taskstation = new TaskStation({nombre:nombre,OrderProductions:OrderProductions,processt:processt,Task:Task});
    await taskstation.save();
    const taskstations = await TaskStation.findById(taskstation.id)
                                          .populate('nombre','nombre')
                                          .populate('OrderProductions','OrderProductions')
                                          .populate('Task','Task')

    res.json(taskstations);

    getStations(mapeo,taskstation.id);
}

const getTaskStation =async(req, res = response) => {
    const {id} = req.params;
    const order = await Order.findById(id);
    const prefijo = order.prefijo;
    const prefijoUpperCase = prefijo.toUpperCase();
    const product = await Product.findOne({ prefijo: prefijoUpperCase });
    const process = await Pro.findOne({ product: product.id });
    const busqueda = process.tasks;
    let mapeo = busqueda.map(function(obj){
        let rObj = {};
        rObj[obj.task]=true;
        return obj.task;
    })
    // console.log(mapeo);
    lista = [];
    listaTareas= [];

    function getStations(mapeo,order){
        for(let i=0; i<mapeo.length; i++){
            let buscar = mapeo[i];
            let tareas = Task1.findById(buscar, function(err,inventario){
                const respuesta = inventario;
                lista.push(respuesta);
                if(mapeo.length === lista.length){
                    lista.push(order);
                    res.json(lista);
                }
                
            })
        }
    }
    
    getStations(mapeo,order);
}


const updateTaskStation = async(req, res=response) => {
    const {id} = req.params;
    const order = await Order.findById(id);
    const prefijo = order.prefijo;
    const prefijoUpperCase = prefijo.toUpperCase();
    const product = await Product.findOne({ prefijo: prefijoUpperCase });
    const process = await Pro.findOne({ product: product.id });
    const busqueda = process.tasks;
    let mapeo = busqueda.map(function(obj){
        let rObj = {};
        rObj[obj.task]=true;
        return obj.task;
    })

    function getStations(mapeo){
        for(let i=0; i<mapeo.length; i++){
            let buscar = mapeo[i];
            let tareas = Task1.findById(buscar, function(err,inventario){
                const respuesta = inventario;
                lista.push(respuesta);
                if(mapeo.length===lista.length){
                    let update =TaskStation.findById();
                    res.json(update);
                }
            })
        }
    }
}


module.exports = {createTaskStation,getTaskStation};
