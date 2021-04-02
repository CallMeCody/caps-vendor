'use strict';

const store = process.env.STORE;
const io = require('socket.io-client')
const host = 'http://localhost:3001'
const socket = io.connect(host)
const faker = require('faker');

setInterval(() => {
  let entry = {
    store: store,
    orderID: faker.datatype.uuid(),
    customer: faker.name.findName(),
    address: `${faker.address.city()}, ${faker.address.stateAbbr()}`

  };
    socket.emit('pickup', entry)
}, 5000);

socket.on('delivered', (payload) => {
 console.log('VENDOR: thank you for delivering', payload.orderID);
})

console.log('VENDOR CONNECTED');