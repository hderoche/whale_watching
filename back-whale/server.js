
const mongoose = require('mongoose');
const http = require('http');
const app = require('./app');
// Not using fork at the moment
const fork = require('child_process').fork
const whale = require('./logic/whaleApi');

const transactionRouter = require('./routes/transactions');



// MongoDB Atlas pwd : pQik6TGVZJkCGkFU
// MongoDB Atlas usr : hderoche
mongoose.connect(`mongodb+srv://hderoche:pQik6TGVZJkCGkFU@cluster0.f5hgc.mongodb.net/<dbname>?retryWrites=true&w=majority`,  { useNewUrlParser: true, useUnifiedTopology: true } ).then(()=>{
    console.log('Successfully connected to MongoDB Atlas Whale')
}).catch((error)=>{
    console.log('Unable to connect to the database');
    console.error(error);
})

const normalizePort = val => {
    const port = parseInt(val, 10);
  
    if (isNaN(port)) {
      return val;
    }
    if (port >= 0) {
      return port;
    }
    return false;
  };
  const port = normalizePort(process.env.PORT || '4000');
  app.set('port', port);
  
  const errorHandler = error => {
    if (error.syscall !== 'listen') {
      throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges.');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use.');
        process.exit(1);
        break;
      default:
        throw error;
    }
  };
  
  const server = http.createServer(app);
  
  server.on('error', errorHandler);
  server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
  });


//Function to call the whale alert Api periodically
//whale.cronFunc()



app.use('/api', transactionRouter);
// Fonction pour save les json dans la base de données MongoDB
// Fonction pour traiter les données, whale_watching


server.listen(port);