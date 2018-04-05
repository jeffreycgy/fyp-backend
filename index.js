const apiai = require('apiai')('8225da3f7e6f4302bcc514722d4ff336');
const app = require('express')();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

var request = apiai.textRequest('hello there aibou', {
  sessionId: '12345'
});

// for demo purposes
app.get('/notes', (req,res) => {
  res.json({notes: 'This is your notebook.'})
  res.end();
});

// app.get('/api/idk', (req, res) => {
//   request.on('response', (response) => {
//     // console.log(response);
//     return res.json(response);
//   });
  
//   request.on('error', (error) => {
//     // console.log(error);
//     return res.json(error);
//   });
  
//   request.end();
//   req.on('error', err=>console.error(err));
//   res.end();
// });

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

app.listen(3000, () => {
  console.log('Server up');
});

// response.result.fulfillment.speech

// const getRes = (query) => {
//   const request = app.textRequest(query, {
//     sessionId: '12345'
//   });

//   const responseFromAPI = new Promise((resolve, reject) => {
//     request.on('error', (error) => {
//       reject(error);
//     });

//     request.on('response', (response) => {
//       resolve(response.result.fulfillment.speech);
//     });
//   });
//   request.end();

//   return responseFromAPI;
// };

// getRes('hello').then((res) => {
//   console.log(res);
// });

// module.exports = {getRes};