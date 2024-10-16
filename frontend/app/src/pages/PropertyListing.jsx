import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import RecommendedProperties from './RecommendedProperties'; // Ensure this import is correct

const PropertyListing = () => {
    const [properties, setProperties] = useState([]);
    const [showRecommendations, setShowRecommendations] = useState(false);
    const [recommendedProperties, setRecommendedProperties] = useState([]);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/properties');
                setProperties(response.data);
            } catch (error) {
                console.error('Error fetching properties', error);
            }
        };

        fetchProperties();
    }, []);

    const handleShowRecommendations = () => {
        setShowRecommendations(prevState => !prevState);
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-6">Properties</h1>
            <button
                onClick={handleShowRecommendations}
                className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500"
            >
                {showRecommendations ? 'Hide Recommendations' : 'Show Recommendations'}
            </button>
            {showRecommendations && (
                <RecommendedProperties setRecommendedProperties={setRecommendedProperties} />
            )}
            <h2 className="text-2xl font-bold mt-8">All Available Properties</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((property) => (
                    <div key={property._id} className="bg-white rounded-lg shadow-md p-6">
                        <img
                            src={property.image}
                            alt={property.title}
                            className="w-full h-48 object-cover rounded-lg"
                        />
                        <h2 className="text-xl font-bold mt-4">{property.title}</h2>
                        <p className="text-gray-600">{property.location}</p>
                        <p className="text-gray-900 font-semibold">${property.price}</p>
                        <p className="mt-2">{property.description}</p>
                        <p className='mt-2'>{property.type.toUpperCase()}</p>
                        <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500">
                            <Link to="*">View Details</Link>
                        </button>
                    </div>
                ))}
            </div>
            {/* Recommended Properties Section */}
            <h2 className="text-2xl font-bold mt-8">Recommended Properties</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendedProperties.length > 0 ? (
                    recommendedProperties.map((property) => (
                        <div key={property.id} className="bg-yellow-100 rounded-lg shadow-md p-6">
                            <img
                                src={property.image}
                                alt={property.title}
                                className="w-full h-48 object-cover rounded-lg"
                            />
                            <h2 className="text-xl font-bold mt-4">{property.title}</h2>
                            <p className="text-gray-600">{property.location}</p>
                            <p className="text-gray-900 font-semibold">${property.price}</p>
                            <p className="mt-2">{property.type.toUpperCase()}</p>
                            <Link to="*" className="mt-4 inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500">
                                View Details
                            </Link>
                        </div>
                    ))
                ) : (
                    <p>No recommendations available at this time.</p>
                )}
            </div>
        </div>
    );
};

export default PropertyListing;
