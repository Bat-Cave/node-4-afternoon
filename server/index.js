require('dotenv').config();
const express = require('express'),
      session = require('express-session'),
      checkForSession = require('./middlewares/checkForSession'),
      app = express(),
      swagctrl = require('./controllers/swagController'),
      authctrl = require('./controllers/authController'),
      cartctrl = require('./controllers/cartController'),
      searchctrl = require('./controllers/searchController'),
      {SERVER_PORT, SESSION_SECRET} = process.env;

app.use(express.json());
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: SESSION_SECRET
  })
)
app.use(checkForSession);
app.use(express.static('../build'))

//ENDPOINTS
app.get('/api/swag', swagctrl.read);

app.post('/api/login', authctrl.login);
app.post('/api/register', authctrl.register);
app.post('/api/signout', authctrl.signout);
app.get('/api/user', authctrl.getUser);

app.post('/api/cart/checkout', cartctrl.checkout);
app.post('/api/cart/:id', cartctrl.add);
app.delete('/api/cart/:id', cartctrl.delete);

app.get('/api/search', searchctrl.search);

const port = SERVER_PORT;
app.listen(port, () => console.log(`Server running in port: ${port}`));
