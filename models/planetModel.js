import mongoose from 'mongoose';

const planetSchema = mongoose.Schema(
  {
    name: {
        type: String, 
        required: true,
    },
    climate: {
        type: String
    },
    terrain: String,
    films: {
        type: [String]
    },
    population: Number,
    imageUrl: String,
  },
  {
    timestamps: true,
  }
);

export const Planet = mongoose.model('Planet', planetSchema);