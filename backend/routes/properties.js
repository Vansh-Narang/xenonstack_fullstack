const express = require('express');
const Property = require('../models/Property');

const router = express.Router();

// Get all properties
router.get('/', async (req, res) => {
    try {
        const properties = await Property.find();
        res.json(properties);
    } catch (err) {
        res.status(500).json({ msg: 'Error fetching properties' });
    }
});

// Create a new property
router.post('/create-property', async (req, res) => {
    const { title, description, price, location, type } = req.body;

    try {
        const property = new Property({ title, description, price, location, type });
        await property.save();
        res.status(201).json(property);
    } catch (err) {
        res.status(500).json({ msg: 'Error adding property' });
    }
});

// router.get('/recommendations', async (req, res) => {
//     const properties = await Property.find();
//     const userPreferences = {
//         interestedTypes: ['sale', 'rent'], // Replace with actual user preferences
//         preferredLocations: ['Miami, FL', 'Aspen, CO']
//     };

//     const recommendations = getRecommendedProperties(userPreferences, properties);
//     res.json(recommendations);
// });

// const getRecommendedProperties = (userPreferences, properties) => {
//     return properties.filter(property =>
//         userPreferences.interestedTypes.includes(property.type) &&
//         userPreferences.preferredLocations.includes(property.location)
//     );
// };

module.exports = router;