const express = require('express');
const cors = require('cors');
const proxy = require('express-http-proxy');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/post', proxy('http://localhost:8022'))
app.use('/user', proxy('http://localhost:8003'))


app.listen(8004, () => {
    console.log('Gateway is Listening to Port 8004')
})