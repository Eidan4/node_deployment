const { response } = require("express");

const Order = require("../models/order");
const ProcessInstance = require('../models/processInstance');
const Process = require('../models/process');
const Product = require('../models/product');

const createOrder = async(req, res = response) => {

    const prefijo = req.body.prefijo.toUpperCase();

    const { cliente,
            fechaDeEntrega,
            OF,
            NroPedido, 
            codigo,
            referencia,
            cantidad,
            NF,
            paso,
            anchoTubo,
            cantidadTubo,
            longitudTubo,
            anchoAleta,
            cantidadAleta,
            longitudAleta,
            PC,
            UES_Colectores,
            observaciones } = req.body;

    const order = new Order({
        cliente,
        fechaDeEntrega,
        OF,
        NroPedido, 
        codigo,
        prefijo,
        referencia,
        cantidad,
        NF,
        paso,
        anchoTubo,
        cantidadTubo,
        longitudTubo,
        anchoAleta,
        cantidadAleta,
        longitudAleta,
        PC,
        UES_Colectores,
        observaciones });

    await order.save();

    const product = await Product.find({ prefijo });
    const process = await Process.find({product: product[0].id});

    let tasks = [];

    for (let i = 0; i < process[0].tasks.length; i++) {

        const task = process[0].tasks[i].id;

        tasks = [ ...tasks, {task}];
    }

    const processInstance = new ProcessInstance({
        order: order.id,
        process: {
            product: product[0],
            tasks
        }
    });

    await processInstance.save();

    res.json({
        order
    });
}

const getOrders = async(req, res = response) => {

    const [total, order] = await Promise.all([
        Order.count(),
        Order.find()
    ]);

    res.json({
        total,
        order
    });
}

module.exports = {
    createOrder,
    getOrders
}