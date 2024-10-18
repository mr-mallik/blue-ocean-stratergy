import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

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

// Add this new interface
interface ChartDataItem {
  name: string;
  [key: string]: string | number;
}

const CompetitiveAnalysisApp: React.FC = () => {
  const [companyName, setCompanyName] = useState("");
  const [competitors, setCompetitors] = useState(["", "", ""]);
  const [features, setFeatures] = useState(["", "", "", "", ""]);
  const [scoreMatrix, setScoreMatrix] = useState<ScoreMatrix>({
    competitors: [],
    features: [],
  });
  const [saved, setSaved] = useState(false);

  const handleCompanyNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyName(e.target.value);
  };

  const handleCompetitorChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newCompetitors = [...competitors];
    newCompetitors[index] = e.target.value;
    setCompetitors(newCompetitors);
  };

  const handleFeatureChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newFeatures = [...features];
    newFeatures[index] = e.target.value;
    setFeatures(newFeatures);
  };

  const handleScoreChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    competitorIndex: number,
    featureIndex: number
  ) => {
    const newScoreMatrix = { ...scoreMatrix };
    if (!newScoreMatrix.competitors[competitorIndex]) {
      newScoreMatrix.competitors[competitorIndex] = {
        name: competitors[competitorIndex],
        price: 0,
        features: [],
      };
    }
    if (featureIndex === 0) {
      newScoreMatrix.competitors[competitorIndex].price = parseInt(
        e.target.value,
        10
      );
    } else {
      if (
        !newScoreMatrix.competitors[competitorIndex].features[featureIndex - 1]
      ) {
        newScoreMatrix.competitors[competitorIndex].features[featureIndex - 1] =
          parseInt(e.target.value, 10);
      } else {
        newScoreMatrix.competitors[competitorIndex].features[featureIndex - 1] =
          parseInt(e.target.value, 10);
      }
    }
    setScoreMatrix(newScoreMatrix);
  };

  const handleSave = () => {
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
      <div className="bg-color container max-w-2xl w-full mx-auto p-4 pt-10">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="companyName"
          >
            Your Company/Product Name:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="companyName"
            type="text"
            value={companyName}
            onChange={handleCompanyNameChange}
          />
        </div>
        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-2 mt-8">List of Competitors:</h2>
          {competitors.map((competitor, index) => (
            <div key={index} className="mb-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor={`competitor${index}`}
              >
                Competitor {index + 1}:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id={`competitor${index}`}
                type="text"
                value={competitor}
                onChange={(e) => handleCompetitorChange(e, index)}
              />
            </div>
          ))}
        </div>
        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-2 mt-8">
            List of Competitive Features:
          </h2>
          {features.map((feature, index) => (
            <div key={index} className="mb-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor={`feature${index}`}
              >
                Feature {index + 1}:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id={`feature${index}`}
                type="text"
                value={feature}
                onChange={(e) => handleFeatureChange(e, index)}
              />
            </div>
          ))}
        </div>
        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-2">Score Matrix:</h2>
          <table className="w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Competitor</th>
                <th className="px-4 py-2">Price</th>
                {features.map((feature, index) => (
                  <th key={index} className="px-4 py-2">
                    {feature || `F${index + 1}`}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr key="company">
                <td className="px-4 py-1">{companyName || 'You'}</td>
                <td className="px-4 py-1">
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="number"
                    min="0"
                    max="100"
                    value={scoreMatrix.competitors[0]?.price || ''}
                    onChange={(e) => handleScoreChange(e, 0, 0)}
                  />
                </td>
                {features.map((_, featureIndex) => (
                  <td key={featureIndex} className="px-4 py-1">
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                <tr key={competitorIndex + 1}>
                  <td className="px-4 py-1">{competitor || `C${competitorIndex + 1}`}</td>
                  <td className="px-4 py-2">
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="number"
                      min="0"
                      max="100"
                      value={scoreMatrix.competitors[competitorIndex + 1]?.price || ''}
                      onChange={(e) => handleScoreChange(e, competitorIndex + 1, 0)}
                    />
                  </td>
                  {features.map((_, featureIndex) => (
                    <td key={featureIndex} className="px-4 py-2">
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
        <div className="text-center my-10">
          <button
            className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    );
  } else {
    console.log(scoreMatrix);
    
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
      <div className="container mx-auto p-4">
        <a href="/">Back</a>
        <h1 className="text-3xl font-bold mb-4">Competitive Analysis Chart</h1>
        <div className="flex">
          <LineChart width={window.innerWidth} height={400} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              key="company"
              type="monotone"
              dataKey={companyName}
              stroke="#ff0000"
            />
            {scoreMatrix.competitors.slice(1).map((competitor, index) => {
              const darkShades = ['#4B0082', '#008080', '#008B8B', '#006400'];
              const randomColor = darkShades[Math.floor(Math.random() * darkShades.length)];
              return (
                <Line
                  key={index}
                  type="monotone"
                  dataKey={competitor.name}
                  stroke={randomColor}
                />
              );
            })}
          </LineChart>
          <div className="ml-8">
            <h2 className="text-xl font-bold mb-2  mt-8">Score Matrix</h2>
            <table className="table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2">Competitor</th>
                  <th className="px-4 py-2">Price</th>
                  {features.map((feature, index) => (
                    <th key={index} className="px-4 py-2">{feature}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {scoreMatrix.competitors.map((competitor, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{competitor.name}</td>
                    <td className="border px-4 py-2">
                      <input
                        type="number"
                        value={competitor.price}
                        onChange={(e) => {
                          const updatedCompetitors = scoreMatrix.competitors.map((c, i) => {
                            if (i === index) {
                              return {
                                ...c,
                                price: parseInt(e.target.value, 10)
                              };
                            }
                            return c;
                          });
                          setScoreMatrix({ ...scoreMatrix, competitors: updatedCompetitors });
                        }}
                      />
                    </td>
                    {competitor.features.map((score, featureIndex) => (
                      <td key={featureIndex} className="border px-4 py-2">
                        <input
                          type="number"
                          value={score}
                          onChange={(e) => {
                            const updatedCompetitors = scoreMatrix.competitors.map((c, i) => {
                              if (i === index) {
                                return {
                                  ...c,
                                  features: c.features.map((s, j) => j === featureIndex ? parseInt(e.target.value, 10) : s)
                                };
                              }
                              return c;
                            });
                            setScoreMatrix({ ...scoreMatrix, competitors: updatedCompetitors });
                          }}
                        />
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

export default CompetitiveAnalysisApp;
