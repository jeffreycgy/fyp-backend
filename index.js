const apiai = require('apiai')('8225da3f7e6f4302bcc514722d4ff336');
const app = require('express')();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

var request = apiai.textRequest('hello there aibou', {
  sessionId: '12345'
});

// for demo purposes
app.get('/notes', (req,res) => {
  res.json({notes: 'This is your notebook.'})
});

// user POST converstaion with bot
app.post('/api/text', (req, res) => {
  console.log('called');
  request = apiai.textRequest(req.body.query, {
    sessionId: '12345'
  });
  request.on('response', (response) => {
    return res.json(response.result.fulfillment.speech);
  });
  
  request.on('error', (error) => {
    return res.json(error.result.fulfillment.speech);
  });
  
  request.end();
  req.on('error', err=>console.error(err));
  res.end();
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
