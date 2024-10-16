import React, { useEffect, useState } from 'react';

const RecommendedProperties = () => {
    const [recommendedProperties, setRecommendedProperties] = useState([]);
    const [currentUserId, setCurrentUserId] = useState('user1'); // Default user
    const [userBrowsingHistory] = useState([
        {
            userId: "user1",
            browsingHistory: [
                { propertyId: "property1", timestamp: "2024-10-01T12:00:00Z" },
                { propertyId: "property2", timestamp: "2024-10-02T14:30:00Z" }
            ]
        },
        {
            userId: "user2",
            browsingHistory: [
                { propertyId: "property3", timestamp: "2024-10-03T10:00:00Z" },
                { propertyId: "property1", timestamp: "2024-10-04T15:00:00Z" }
            ]
        },
        {
            userId: "user3",
            browsingHistory: [
                { propertyId: "property2", timestamp: "2024-10-05T11:00:00Z" },
                { propertyId: "property3", timestamp: "2024-10-06T13:00:00Z" }
            ]
        }
    ]);

    const properties = [
        {
            id: "property1",
            title: "Beautiful Beachfront Villa",
            description: "A stunning beachfront property with ocean views.",
            price: 1200000,
            location: "Miami, FL",
            image: "https://via.placeholder.com/300",
            type: "sale"
        },
        {
            id: "property2",
            title: "Cozy Mountain Cabin",
            description: "A peaceful cabin in the mountains with modern amenities.",
            price: 500000,
            location: "Aspen, CO",
            image: "https://via.placeholder.com/300",
            type: "rent"
        },
        {
            id: "property3",
            title: "Luxury City Apartment",
            description: "A spacious apartment in the heart of the city.",
            price: 900000,
            location: "New York, NY",
            image: "https://via.placeholder.com/300",
            type: "sale"
        }
    ];

    useEffect(() => {
        // Fetch recommendations based on the current user's browsing history
        const userHistory = userBrowsingHistory.find(user => user.userId === currentUserId);

        if (userHistory) {
            const recommendedIds = userHistory.browsingHistory.map(item => item.propertyId);
            const recommendations = properties.filter(property => recommendedIds.includes(property.id));
            setRecommendedProperties(recommendations);
        }
    }, [currentUserId]);

    const handleUserChange = (userId) => {
        setCurrentUserId(userId);
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-6">Recommended Properties for You</h1>
            <div className="mb-4 text-center">
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-400 mx-2"
                    onClick={() => handleUserChange('user1')}
                >
                    User 1
                </button>
                <button
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-400 mx-2"
                    onClick={() => handleUserChange('user2')}
                >
                    User 2
                </button>
                <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-400 mx-2"
                    onClick={() => handleUserChange('user3')}
                >
                    User 3
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendedProperties.length > 0 ? (
                    recommendedProperties.map((property) => (
                        <div key={property.id} className="bg-white rounded-lg shadow-md p-6">
                            <img
                                src={property.image}
                                alt={property.title}
                                className="w-full h-48 object-cover rounded-lg"
                            />
                            <h2 className="text-xl font-bold mt-4">{property.title}</h2>
                            <p className="text-gray-600">{property.location}</p>
                            <p className="text-gray-900 font-semibold">${property.price}</p>
                            <p className="mt-2">{property.type.toUpperCase()}</p>
                            <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500">
                                View Details
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No recommendations available at this time.</p>
                )}
            </div>
        </div>
    );
};

export default RecommendedProperties;
