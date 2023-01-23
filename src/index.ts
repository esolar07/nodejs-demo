import * as dotenv from 'dotenv'
import app from './server'

dotenv.config()

app.get('*', function(req, res) {
    // log.info(req);
    res.status(404).send("404 Page not found!");
});

// Proper way to assign a PORT
const port = process.env.PORT || 3001
app.listen(port, () => console.log(`Listen on port ${port}...`));