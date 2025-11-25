import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Home: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-12 max-w-5xl">
            <Helmet>
                <title>Blue Ocean Strategy - Create Uncontested Market Space</title>
                <meta name="description" content="Learn about Blue Ocean Strategy and use our tool to plot your strategy canvas." />
            </Helmet>

            <div className="text-center mb-16">
                <h1 className="text-4xl laptop:text-6xl font-extrabold text-gray-900 mb-6">
                    Blue Ocean <span className="text-blue-600">Strategy</span>
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                    Stop competing in overcrowded industries. Create new market spaces and make the competition irrelevant.
                </p>
                <Link to="/app" className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold py-3 px-8 rounded-lg shadow-lg transform transition hover:-translate-y-1">
                    Start Your Analysis
                </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-12 mb-16">
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">What is it?</h2>
                    <p className="text-gray-600 leading-relaxed">
                        Blue Ocean Strategy is a business approach that focuses on creating new, uncontested market spaces ("blue oceans") rather than competing in existing, saturated markets ("red oceans"). It emphasizes the simultaneous pursuit of differentiation and low cost to open up new demand.
                    </p>
                </div>
                <div className="bg-blue-50 p-8 rounded-xl border border-blue-100">
                    <h2 className="text-2xl font-bold mb-4 text-blue-900">Key Principles</h2>
                    <ul className="space-y-3 text-blue-800">
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span><strong>Create Uncontested Market Space:</strong> Find markets that are not currently being exploited.</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span><strong>Value Innovation:</strong> Innovate to create value for both the business and customers.</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span><strong>Break Existing Demand:</strong> Look beyond traditional customers to new segments.</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="mb-16">
                <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Success Stories</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
                        <h3 className="text-xl font-bold mb-2 text-gray-900">Apple</h3>
                        <p className="text-gray-600">Opened new markets with the iPhone, setting itself apart from traditional phone manufacturers.</p>
                    </div>
                    <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
                        <h3 className="text-xl font-bold mb-2 text-gray-900">Netflix</h3>
                        <p className="text-gray-600">Transitioned from DVD rentals to streaming, creating a new space in entertainment consumption.</p>
                    </div>
                    <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
                        <h3 className="text-xl font-bold mb-2 text-gray-900">Ford</h3>
                        <p className="text-gray-600">Revolutionized the auto industry with the Model T, making cars affordable for everyone.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
