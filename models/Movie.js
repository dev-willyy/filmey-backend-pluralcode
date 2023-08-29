import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  genre: {
    type: String,
  },
  productionYear: {
    type: String,
  },
  nameOfActors: {
    type: [String],
  },
});

const Movie = mongoose.model('Model', movieSchema);

export default Movie;
