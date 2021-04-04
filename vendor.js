'use strict';

const io = require('socket.io-client')
const host = 'http://localhost:3000'

const socket = io.connect(host)
const caps = io.connect(`${host}/caps`);

const faker = require('faker');
require('dotenv').config();


const store = process.env.STORE;

setInterval( () => {
  let entry = {
    store: store,
    orderID: faker.datatype.uuid(),
    customer: faker.name.findName(),
    address: `${faker.address.city()}, ${faker.address.stateAbbr()}`

  };
    caps.emit('pickup', entry)
}, 5000);

caps.on('delivered', confirmDelivery);

function confirmDelivery(payload) {
  console.log(`VENDOR: thank you for delivery ${payload.orderID}`)
}


console.log('VENDOR CONNECTED');