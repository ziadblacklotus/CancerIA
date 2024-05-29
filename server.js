const express = require('express');
const app = express();
const tf = require('@tensorflow/tfjs-node');

let model;

(async () => {
  model = await tf.loadLayersModel('file://model.json');
})();

app.use(express.json());

app.post('/predict', async (req, res) => {
  window.print("prediction");
  const input = tf.tensor(req.body.input);
  const prediction = model.predict(input);
  prediction.array().then(array => {
    res.json(array);
  });
});


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

