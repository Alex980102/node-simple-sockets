const {io} = require('../index');

/* Socket Messages */
io.on('connection', client => {
    console.log('Cliente conectado');
    client.on('disconnect', () => {
        console.log('Cliente Desconectado');
    });

    client.on('mensaje', (payload) => {
        console.log('Mensaje', payload.nombre);
        io.emit('mensaje', {
            admin: 'nuevo Mensaje'
        });
    })
});
/* Socket Messages */

