import React, { useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";
import { Helmet } from "react-helmet";

interface Competitor {
    name: string;
    price: number;
    features: number[];
}

interface Feature {
    name: string;
}

interface ScoreMatrix {
    competitors: Competitor[];
    features: Feature[];
}

interface ChartDataItem {
    name: string;
    [key: string]: string | number;
}

const Analysis: React.FC = () => {
    const [companyName, setCompanyName] = useState("");
    const [competitors, setCompetitors] = useState(["", "", ""]);
    const [features, setFeatures] = useState(["", "", "", "", ""]);
    const [scoreMatrix, setScoreMatrix] = useState<ScoreMatrix>({
        competitors: [],
        features: [],
    });
    const [saved, setSaved] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleCompanyNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCompanyName(e.target.value);
        if (e.target.value) {
            setErrors(prev => ({ ...prev, companyName: '' }));
        }
    };

    const handleCompetitorChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        const newCompetitors = [...competitors];
        newCompetitors[index] = e.target.value;
        setCompetitors(newCompetitors);
        if (e.target.value) {
            setErrors(prev => ({ ...prev, [`competitor${index}`]: '' }));
        }
    };

    const handleFeatureChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        const newFeatures = [...features];
        newFeatures[index] = e.target.value;
        setFeatures(newFeatures);
        if (e.target.value) {
            setErrors(prev => ({ ...prev, [`feature${index}`]: '' }));
        }
    };

    const handleScoreChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        competitorIndex: number,
        featureIndex: number
    ) => {
        const value = parseInt(e.target.value, 10);
        // Allow empty string for better typing experience, handle validation on blur or save if needed
        // But for now, let's keep the logic simple and safe

        if (value < 0 || value > 100) {
            // Ideally show an inline error, but for score matrix cells, alert might be okay or just clamp
            // Let's clamp or just ignore invalid input
            return;
        }

        const newScoreMatrix = { ...scoreMatrix };
        if (!newScoreMatrix.competitors[competitorIndex]) {
            newScoreMatrix.competitors[competitorIndex] = {
                name: competitors[competitorIndex],
                price: 0,
                features: [],
            };
        }
        if (featureIndex === 0) {
            newScoreMatrix.competitors[competitorIndex].price = isNaN(value) ? 0 : value;
        } else {
            if (!newScoreMatrix.competitors[competitorIndex].features[featureIndex - 1]) {
                newScoreMatrix.competitors[competitorIndex].features[featureIndex - 1] = isNaN(value) ? 0 : value;
            } else {
                newScoreMatrix.competitors[competitorIndex].features[featureIndex - 1] = isNaN(value) ? 0 : value;
            }
        }
        setScoreMatrix(newScoreMatrix);
    };

    const handleSave = () => {
        const newErrors: { [key: string]: string } = {};
        if (!companyName) newErrors.companyName = "Company Name is required";
        competitors.forEach((c, i) => {
            if (!c) newErrors[`competitor${i}`] = "Competitor Name is required";
        });
        features.forEach((f, i) => {
            if (!f) newErrors[`feature${i}`] = "Feature Name is required";
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const updatedScoreMatrix: ScoreMatrix = {
            competitors: [
                {
                    name: companyName || 'You',
                    price: scoreMatrix.competitors[0]?.price || 0,
                    features: features.map((_, featureIndex) =>
                        scoreMatrix.competitors[0]?.features[featureIndex] || 0
                    ),
                },
                ...competitors.map((name, index) => ({
                    name,
                    price: scoreMatrix.competitors[index + 1]?.price || 0,
                    features: features.map((_, featureIndex) =>
                        scoreMatrix.competitors[index + 1]?.features[featureIndex] || 0
                    ),
                })),
            ],
            features: features.map(name => ({ name })),
        };
        setScoreMatrix(updatedScoreMatrix);
        setSaved(true);
    };

    if (!saved) {
        return (
            <div className="container max-w-4xl w-11/12 laptop:w-full mx-auto p-4 my-10 rounded border laptop:p-12 bg-white shadow-sm">
                <Helmet>
                    <title>Analysis Tool - Blue Ocean Strategy</title>
                    <meta name="description" content="Input your competitors and features to generate a strategy canvas." />
                </Helmet>

                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Step 1: Define Market</h2>
                    <p className="text-gray-600">Enter your company name, your top competitors, and the key features that define your industry.</p>
                </div>

                <div className="mb-6">
                    <label
                        className="block text-gray-700 text-base font-bold mb-2"
                        htmlFor="companyName"
                    >
                        Your Company/Product Name:
                    </label>
                    <input
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.companyName ? 'border-red-500' : ''}`}
                        id="companyName"
                        type="text"
                        value={companyName}
                        onChange={handleCompanyNameChange}
                        placeholder="e.g., My Innovative App"
                    />
                    {errors.companyName && <p className="text-red-500 text-xs italic mt-1">{errors.companyName}</p>}
                </div>

                <div className="mb-6">
                    <h2 className="text-lg laptop:text-xl font-bold mb-3 mt-8 text-gray-800">List of Competitors:</h2>
                    {competitors.map((competitor, index) => (
                        <div key={index} className="mb-3">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-1"
                                htmlFor={`competitor${index}`}
                            >
                                Competitor {index + 1}:
                            </label>
                            <input
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors[`competitor${index}`] ? 'border-red-500' : ''}`}
                                id={`competitor${index}`}
                                type="text"
                                value={competitor}
                                onChange={(e) => handleCompetitorChange(e, index)}
                                placeholder={`Competitor ${index + 1} Name`}
                            />
                            {errors[`competitor${index}`] && <p className="text-red-500 text-xs italic mt-1">{errors[`competitor${index}`]}</p>}
                        </div>
                    ))}
                </div>

                <div className="mb-6">
                    <h2 className="text-lg laptop:text-xl font-bold mb-3 mt-8 text-gray-800">
                        List of Competitive Features:
                    </h2>
                    <p className="text-sm text-gray-500 mb-4">These are the factors your industry competes on (e.g., Speed, Quality, Ease of Use etc. exclude <b>Price</b>).</p>
                    {features.map((feature, index) => (
                        <div key={index} className="mb-3">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-1"
                                htmlFor={`feature${index}`}
                            >
                                Feature {index + 1}:
                            </label>
                            <input
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors[`feature${index}`] ? 'border-red-500' : ''}`}
                                id={`feature${index}`}
                                type="text"
                                value={feature}
                                onChange={(e) => handleFeatureChange(e, index)}
                                placeholder={`Feature ${index + 1} Name`}
                            />
                            {errors[`feature${index}`] && <p className="text-red-500 text-xs italic mt-1">{errors[`feature${index}`]}</p>}
                        </div>
                    ))}
                </div>

                <div className="mb-8">
                    <h2 className="text-lg laptop:text-xl font-bold mb-3 mt-8 text-gray-800">Score Matrix:</h2>
                    <div className="bg-blue-50 p-4 rounded-md mb-4 border border-blue-100">
                        <h4 className="font-bold text-blue-900 text-sm mb-1">How to Score</h4>
                        <p className="text-sm text-blue-800">
                            Rate each competitor on each feature from <strong>0 (Low)</strong> to <strong>100 (High)</strong>.
                            <br />For example, a high price should be 100, and a low price should be 0 (or vice versa, depending on if high price is "good" or "bad" for your strategy, but typically high magnitude = high score).
                        </p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full score-matrix min-w-[600px]">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="px-4 py-2 text-left">Competitor</th>
                                    <th className="px-4 py-2 text-center">Price</th>
                                    {features.map((feature, index) => (
                                        <th key={index} className="px-4 py-2 text-center">
                                            {feature || `F${index + 1}`}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                <tr key="company" className="border-b">
                                    <td className="px-4 py-3 font-bold">{companyName || 'You'}</td>
                                    <td className="px-4 py-3 text-center">
                                        <input
                                            className="shadow appearance-none border rounded w-20 py-1 px-2 text-center text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            type="number"
                                            min="0"
                                            max="100"
                                            value={scoreMatrix.competitors[0]?.price || ''}
                                            onChange={(e) => handleScoreChange(e, 0, 0)}
                                        />
                                    </td>
                                    {features.map((_, featureIndex) => (
                                        <td key={featureIndex} className="px-4 py-3 text-center">
                                            <input
                                                className="shadow appearance-none border rounded w-20 py-1 px-2 text-center text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                type="number"
                                                min="0"
                                                max="100"
                                                value={scoreMatrix.competitors[0]?.features[featureIndex] || ''}
                                                onChange={(e) =>
                                                    handleScoreChange(
                                                        e,
                                                        0,
                                                        featureIndex + 1
                                                    )
                                                }
                                            />
                                        </td>
                                    ))}
                                </tr>
                                {competitors.map((competitor, competitorIndex) => (
                                    <tr key={competitorIndex + 1} className="border-b">
                                        <td className="px-4 py-3">{competitor || `C${competitorIndex + 1}`}</td>
                                        <td className="px-4 py-3 text-center">
                                            <input
                                                className="shadow appearance-none border rounded w-20 py-1 px-2 text-center text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                type="number"
                                                min="0"
                                                max="100"
                                                value={scoreMatrix.competitors[competitorIndex + 1]?.price || ''}
                                                onChange={(e) => handleScoreChange(e, competitorIndex + 1, 0)}
                                            />
                                        </td>
                                        {features.map((_, featureIndex) => (
                                            <td key={featureIndex} className="px-4 py-3 text-center">
                                                <input
                                                    className="shadow appearance-none border rounded w-20 py-1 px-2 text-center text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                    type="number"
                                                    min="0"
                                                    max="100"
                                                    value={scoreMatrix.competitors[competitorIndex + 1]?.features[featureIndex] || ''}
                                                    onChange={(e) =>
                                                        handleScoreChange(
                                                            e,
                                                            competitorIndex + 1,
                                                            featureIndex + 1
                                                        )
                                                    }
                                                />
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="text-center mt-10">
                    <button
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded focus:outline-none focus:shadow-outline transition duration-300"
                        onClick={handleSave}
                    >
                        Generate Strategy Canvas
                    </button>
                </div>
            </div>
        );
    } else {
        const chartData: ChartDataItem[] = [
            {
                name: "Price",
                [companyName]: scoreMatrix.competitors[0]?.price || 0,
                ...scoreMatrix.competitors.slice(1).reduce((acc, competitor) => {
                    if (competitor && competitor.name) {
                        acc[competitor.name] = competitor.price;
                    }
                    return acc;
                }, {} as { [key: string]: number })
            },
            ...features.map((feature, index) => ({
                name: feature,
                [companyName]: scoreMatrix.competitors[0]?.features[index] || 0,
                ...scoreMatrix.competitors.slice(1).reduce((acc, competitor) => {
                    if (competitor && competitor.name) {
                        acc[competitor.name] = competitor.features[index];
                    }
                    return acc;
                }, {} as { [key: string]: number })
            }))
        ];

        return (
            <div className="container max-w-6xl w-11/12 laptop:w-full mx-auto p-4 my-10 rounded border laptop:p-12 bg-white shadow-sm">
                <Helmet>
                    <title>Strategy Canvas - Blue Ocean Strategy</title>
                </Helmet>
                <div className="flex justify-between items-center pb-8 border-b mb-8">
                    <h2 className="text-2xl font-bold text-gray-800">Strategy Canvas</h2>
                    <button
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition"
                        onClick={() => setSaved(false)}
                    >
                        Edit Data
                    </button>
                </div>

                <div className="mb-12 h-[500px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis domain={[0, 100]} />
                            <Tooltip />
                            <Legend />
                            <Line
                                key="company"
                                type="monotone"
                                dataKey={companyName}
                                stroke="#ff0000"
                                strokeWidth={3}
                                activeDot={{ r: 8 }}
                            />
                            {scoreMatrix.competitors.slice(1).map((competitor, index) => {
                                const darkShades = ['#4B0082', '#9B870C', '#0000FF', '#006400'];
                                const randomColor = darkShades[index % darkShades.length];
                                return (
                                    <Line
                                        key={index}
                                        type="monotone"
                                        dataKey={competitor.name}
                                        stroke={randomColor}
                                        strokeWidth={2}
                                    />
                                );
                            })}
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">Score Matrix Review</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full table-auto mb-10 score-matrix border-collapse">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="px-4 py-2 border text-left">Competitor</th>
                                    <th className="px-4 py-2 border text-center">Price</th>
                                    {features.map((feature, index) => (
                                        <th key={index} className="px-4 py-2 border text-center">{feature}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {scoreMatrix.competitors.map((competitor, index) => (
                                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                        <td className="px-4 py-2 border font-medium">{competitor.name}</td>
                                        <td className="px-4 py-2 border text-center">
                                            {competitor.price}
                                        </td>
                                        {competitor.features.map((score, featureIndex) => (
                                            <td key={featureIndex} className="px-4 py-2 border text-center">
                                                {score}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
};

export default Analysis;
