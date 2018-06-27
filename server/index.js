require('newrelic');
const app = require('./application');

const port = process.env.PORT || 3003;

app.listen(port, () => console.log(`Overview module listening on port ${port}`));
