const app = require('./app');

const PORT = 3000;

app.listen(process.env.PORT || PORT, () => console.log(`conectado na porta ${PORT}`));
