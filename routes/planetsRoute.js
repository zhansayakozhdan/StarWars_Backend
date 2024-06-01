import express from 'express';
import { Planet } from '../models/planetModel.js';

const router = express.Router();


router.post('/', async (request, response) => {
    try {
      if (!request.body.name) {
        return response.status(400).send({
          message: 'Send required field: name',
        });
      }
      const newPlanet = {
        name: request.body.name,
        climate: request.body.climate,
        terrain: request.body.terrain,
        population: request.body.population,
        imageUrl: request.body.imageUrl,
        films: request.body.films
      };
  
      const planet = await Planet.create(newPlanet);
  
      return response.status(201).send(planet);
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });



router.get('/', async (request, response) => {
    try {
      const planets = await Planet.find({});
  
      return response.status(200).json({
        count: planets.length,
        data: planets,
      });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });


router.get('/sorting', async (request, response) => {
    try {
      // получаем параметра terrain из строки запроса
      const terrain = request.query.terrain;
    
      if (!terrain) {
      return res.status(400).send('Требуется параметр ландшафта');
      }

      // поиск планет по ландшафту terrain
      const planets = await Planet.find({ terrain: { $regex: terrain, $options: 'i' } });
  
      return response.status(200).json({
        count: planets.length,
        data: planets,
      });
      
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });


router.get('/:id', async (request, response) => {
    try {
      const { id } = request.params;
  
      const planet = await Planet.findById(id);
  
      return response.status(200).json(planet);
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  

router.put('/:id', async (request, response) => {
    try {
  
      const { id } = request.params;
  
      const result = await Planet.findByIdAndUpdate(id, request.body);
  
      if (!result) {
        return response.status(404).json({ message: 'Planet not found' });
      }
  
      return response.status(200).send({ message: 'Planet updated successfully' });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  

router.delete('/:id', async (request, response) => {
    try {
      const { id } = request.params;
  
      const result = await Planet.findByIdAndDelete(id);
  
      if (!result) {
        return response.status(404).json({ message: 'Planet not found' });
      }
  
      return response.status(200).send({ message: 'Planet deleted successfully' });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  

  export default router;