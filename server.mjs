import express from 'express';
import fetch from 'node-fetch';
const app = express();
const PORT = process.env.PORT || 3000;

// Lista de dominios permitidos
const allowedOrigins = [
    'https://5666986.hs-sites.com',
    'https://landings.multimoney.com/' 
];

app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});


app.get('/proxy/:symbol', async (req, res) => {
    const symbol = req.params.symbol;
    try {
        const response = await fetch(`https://api.paxos.com/v2/markets/${symbol}/ticker`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).send('Error al obtener los datos');
    }
});

app.listen(PORT, () => {
    console.log(`Servidor proxy corriendo en el puerto ${PORT}`);
});
