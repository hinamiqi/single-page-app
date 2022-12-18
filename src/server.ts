import express from 'express';
import path from 'path';

const app = express();

app.use('/static', express.static(path.resolve(__dirname, 'frontend', 'static')));
app.use('/app', express.static(path.resolve(__dirname, 'frontend', 'app')));

app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'static', 'html', 'index.html'));
});

app.listen(process.env.PORT || 3000, () => console.log('Server running...'));