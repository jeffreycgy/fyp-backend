const apiai = require('apiai')('8225da3f7e6f4302bcc514722d4ff336');
const app = require('express')();
const bodyParser = require('body-parser');
const path = require('path');
const PORT = process.env.PORT || 3000;

if(process.env.NODE_ENV !== 'production') {
  require('longjohn');
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// let request = apiai.textRequest('hello there aibou', {
//   sessionId: '12345'
// });

// for demo purposes
app.get('/notes', (req,res) => {
  res.json({notes: 'This is your notebook.'})
  req.on('error', err=>console.error(err));
});

// user POST converstaion with bot
app.post('/api/text', (req, res) => {
  let request = apiai.textRequest(req.body.query, {
    sessionId: '12345'
  });
  request.on('response', (response) => {
    return res.json(response.result.fulfillment.speech);
  });
  request.on('error', (error) => {
    return res.json(error);
  });
  
  request.end();
  // req.on('error', err=>console.error(err));
  // res.end();
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
