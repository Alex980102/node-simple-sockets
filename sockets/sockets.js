const {io} = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();

bands.addBand(new Band('Felipe Calderon'));
bands.addBand(new Band('Andres Manuel'));
bands.addBand(new Band('Carlos Huerta'));
bands.addBand(new Band('Miguel Alemán'));

/* Socket Messages */
io.on('connection', client => {
    console.log('Cliente conectado');

    client.emit('active-bands', bands.getBands());

    client.on('disconnect', () => {
        console.log('Cliente Desconectado');
    });

    client.on('mensaje', (payload) => {
        io.emit('mensaje', {
            admin: 'nuevo Mensaje'
        });
    });

    client.on('vote-band', (payload)=>{
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    }); 

    client.on('add-band', (payload)=>{
        const newBand = new Band(payload.name);
        bands.addBand(newBand);
        io.emit('active-bands', bands.getBands());
    });

    client.on('delete-band', (payload)=>{
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    })

    // client.on('emitir-mensaje', (payload)=>{
    //     /* io.emit('nuevo-mensaje', payload); */
    //     /* client.broadcast.emit('nuevo-mensaje', payload); */ // Emite a todos menos al que emitió
    //     client.broadcast.emit('nuevo-mensaje', payload);
    // });
    
});
/* Socket Messages */

