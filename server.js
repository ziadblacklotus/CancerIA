const express = require('express');
const app = express();
const tf = require('@tensorflow/tfjs-node');
const path = require('path');

let model;

// Charger le modèle
(async () => {
  model = await tf.loadLayersModel('file://model/model.json');
})();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Route pour les prédictions
app.post('/predict', async (req, res) => {
  try {
    const input = tf.tensor(req.body.input);
    const prediction = model.predict(input);
    prediction.array().then(array => {
      res.json(array);
    });
  } catch (error) {
    console.error('Erreur lors de la prédiction:', error);
    res.status(500).send('Erreur lors de la prédiction');
  }
});

// Route pour servir le fichier index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
