import Clarifai from 'clarifai';

//You must add your own API key here from Clarifai.
const app = new Clarifai.App({
    apiKey: ''
   });

const handleApiCall = (req, res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {res.json(data)})
    .catch(err => res.status(400).json('unable to work with api'));
}

const handleImage = (req, res, pg) => {
    const { id } = req.body;
    pg('users').where('id', '=', id).increment('entries', 1).returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err =>  res.status(400).json('unable to get entries'));
}

export {handleImage, handleApiCall};
