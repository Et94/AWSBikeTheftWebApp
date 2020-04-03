let express = require('express')
let app = express();
let bodyParser = require('body-parser');
let path = require('path');
let expressHbs = require('express-handlebars');

app.engine(
	'hbs',
	expressHbs({
		layoutsDir: 'views/layouts/',
		helpers: require('./handlebar-helpers'),
		defaultLayout: 'main-layout',
		extname: 'hbs'
	})
);
app.set('view engine', 'hbs');
app.set('views', 'views');



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })) // middleware

// parse application/json
app.use(bodyParser.json()) // middleware

// add back if css is added
// app.use(express.static('./public'));

let routes = require('./routes.js');
app.use(routes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server ready @ port ${PORT}`));