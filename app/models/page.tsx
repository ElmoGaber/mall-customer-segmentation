"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { BarChart3, ArrowLeft, CheckCircle, XCircle, AlertCircle, TrendingUp } from "lucide-react"
import Link from "next/link"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"

// Model performance data
const modelPerformance = [
  {
    name: "K-Means",
    silhouetteScore: 0.72,
    inertia: 234.5,
    calinski: 156.8,
    daviesBouldin: 0.89,
    executionTime: 0.045,
    clusters: 3,
    description:
      "Partitioning algorithm that divides data into k clusters by minimizing within-cluster sum of squares.",
    pros: ["Fast and efficient", "Works well with spherical clusters", "Simple to understand and implement"],
    cons: [
      "Requires pre-defining number of clusters",
      "Sensitive to initialization",
      "Struggles with non-spherical clusters",
    ],
    bestFor: "Large datasets with well-separated, spherical clusters",
    complexity: "O(n*k*i*d)",
    recommended: true,
  },
  {
    name: "Hierarchical",
    silhouetteScore: 0.68,
    inertia: 267.3,
    calinski: 142.1,
    daviesBouldin: 0.95,
    executionTime: 0.123,
    clusters: 3,
    description: "Creates a tree of clusters by iteratively merging or splitting clusters based on distance.",
    pros: ["No need to specify number of clusters", "Creates interpretable dendrogram", "Deterministic results"],
    cons: ["Computationally expensive O(n³)", "Sensitive to noise and outliers", "Difficult to handle large datasets"],
    bestFor: "Small to medium datasets where cluster hierarchy is important",
    complexity: "O(n³)",
    recommended: false,
  },
  {
    name: "DBSCAN",
    silhouetteScore: 0.58,
    inertia: 312.7,
    calinski: 98.4,
    daviesBouldin: 1.23,
    executionTime: 0.087,
    clusters: 4,
    description: "Density-based algorithm that groups together points in high-density areas and marks outliers.",
    pros: ["Finds arbitrary shaped clusters", "Automatically determines cluster count", "Robust to outliers"],
    cons: [
      "Sensitive to hyperparameters",
      "Struggles with varying densities",
      "Poor performance on high-dimensional data",
    ],
    bestFor: "Datasets with noise and clusters of varying shapes",
    complexity: "O(n log n)",
    recommended: false,
  },
  {
    name: "Gaussian Mixture",
    silhouetteScore: 0.69,
    inertia: 245.8,
    calinski: 148.3,
    daviesBouldin: 0.92,
    executionTime: 0.156,
    clusters: 3,
    description: "Probabilistic model that assumes data comes from a mixture of Gaussian distributions.",
    pros: ["Provides soft clustering", "Can handle elliptical clusters", "Gives probability of cluster membership"],
    cons: ["Computationally expensive", "Sensitive to initialization", "Requires assumption of Gaussian distribution"],
    bestFor: "Data with overlapping clusters and when probability estimates are needed",
    complexity: "O(n*k*i*d)",
    recommended: false,
  },
]

const performanceMetrics = [
  { metric: "Silhouette Score", kmeans: 0.72, hierarchical: 0.68, dbscan: 0.58, gaussian: 0.69 },
  { metric: "Calinski-Harabasz", kmeans: 156.8, hierarchical: 142.1, dbscan: 98.4, gaussian: 148.3 },
  { metric: "Davies-Bouldin", kmeans: 0.89, hierarchical: 0.95, dbscan: 1.23, gaussian: 0.92 },
]

const executionTimes = [
  { algorithm: "K-Means", time: 0.045 },
  { algorithm: "Hierarchical", time: 0.123 },
  { algorithm: "DBSCAN", time: 0.087 },
  { algorithm: "Gaussian Mixture", time: 0.156 },
]

const radarData = [
  { metric: "Accuracy", kmeans: 85, hierarchical: 78, dbscan: 65, gaussian: 80 },
  { metric: "Speed", kmeans: 95, hierarchical: 45, dbscan: 70, gaussian: 40 },
  { metric: "Scalability", kmeans: 90, hierarchical: 30, dbscan: 75, gaussian: 60 },
  { metric: "Robustness", kmeans: 60, hierarchical: 70, dbscan: 85, gaussian: 65 },
  { metric: "Interpretability", kmeans: 80, hierarchical: 95, dbscan: 70, gaussian: 60 },
]

export default function ModelsPage() {
  const [selectedModel, setSelectedModel] = useState<string>("K-Means")

  const currentModel = modelPerformance.find((m) => m.name === selectedModel)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-6 w-6 text-primary" />
              <span className="font-serif font-bold text-xl">Model Comparison</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8">
        {/* Overview */}
        <div className="mb-8">
          <h1 className="font-serif font-bold text-3xl mb-4">Clustering Algorithm Comparison</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Comprehensive analysis of four different clustering algorithms applied to mall customer data. Each algorithm
            has been evaluated using multiple performance metrics to determine the optimal approach.
          </p>
        </div>

        {/* Performance Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {modelPerformance.map((model) => (
            <Card
              key={model.name}
              className={`cursor-pointer transition-all ${selectedModel === model.name ? "ring-2 ring-primary" : ""}`}
              onClick={() => setSelectedModel(model.name)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="font-serif text-lg">{model.name}</CardTitle>
                  {model.recommended && (
                    <Badge variant="default" className="text-xs">
                      Recommended
                    </Badge>
                  )}
                </div>
                <CardDescription className="text-sm">Silhouette: {model.silhouetteScore.toFixed(2)}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Performance</span>
                    <span>{Math.round(model.silhouetteScore * 100)}%</span>
                  </div>
                  <Progress value={model.silhouetteScore * 100} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Time: {model.executionTime}s</span>
                    <span>Clusters: {model.clusters}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="comparison" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="comparison">Performance Comparison</TabsTrigger>
            <TabsTrigger value="details">Algorithm Details</TabsTrigger>
            <TabsTrigger value="metrics">Detailed Metrics</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>

          <TabsContent value="comparison" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Performance Metrics Comparison</CardTitle>
                  <CardDescription>
                    Higher silhouette and Calinski-Harabasz scores indicate better clustering
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={performanceMetrics}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="metric" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="kmeans" name="K-Means" fill="hsl(var(--chart-1))" />
                        <Bar dataKey="hierarchical" name="Hierarchical" fill="hsl(var(--chart-2))" />
                        <Bar dataKey="dbscan" name="DBSCAN" fill="hsl(var(--chart-3))" />
                        <Bar dataKey="gaussian" name="Gaussian Mixture" fill="hsl(var(--chart-4))" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Execution Time Comparison</CardTitle>
                  <CardDescription>Time taken to complete clustering (in seconds)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={executionTimes} layout="horizontal">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="algorithm" type="category" width={100} />
                        <Tooltip />
                        <Bar dataKey="time" fill="hsl(var(--primary))" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Algorithm Performance Radar</CardTitle>
                <CardDescription>Multi-dimensional comparison across key performance indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="metric" />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} />
                      <Radar
                        name="K-Means"
                        dataKey="kmeans"
                        stroke="hsl(var(--chart-1))"
                        fill="hsl(var(--chart-1))"
                        fillOpacity={0.1}
                      />
                      <Radar
                        name="Hierarchical"
                        dataKey="hierarchical"
                        stroke="hsl(var(--chart-2))"
                        fill="hsl(var(--chart-2))"
                        fillOpacity={0.1}
                      />
                      <Radar
                        name="DBSCAN"
                        dataKey="dbscan"
                        stroke="hsl(var(--chart-3))"
                        fill="hsl(var(--chart-3))"
                        fillOpacity={0.1}
                      />
                      <Radar
                        name="Gaussian Mixture"
                        dataKey="gaussian"
                        stroke="hsl(var(--chart-4))"
                        fill="hsl(var(--chart-4))"
                        fillOpacity={0.1}
                      />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="details" className="space-y-6">
            {currentModel && (
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="font-serif text-2xl">{currentModel.name}</CardTitle>
                      {currentModel.recommended && <Badge variant="default">Recommended</Badge>}
                    </div>
                    <CardDescription className="text-base">{currentModel.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-green-600 mb-3 flex items-center">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Advantages
                        </h4>
                        <ul className="space-y-2">
                          {currentModel.pros.map((pro, index) => (
                            <li key={index} className="text-sm flex items-start">
                              <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-red-600 mb-3 flex items-center">
                          <XCircle className="h-4 w-4 mr-2" />
                          Disadvantages
                        </h4>
                        <ul className="space-y-2">
                          {currentModel.cons.map((con, index) => (
                            <li key={index} className="text-sm flex items-start">
                              <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                              {con}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 pt-4 border-t">
                      <div>
                        <h4 className="font-semibold mb-2">Best Use Case</h4>
                        <p className="text-sm text-muted-foreground">{currentModel.bestFor}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Time Complexity</h4>
                        <code className="text-sm bg-muted px-2 py-1 rounded">{currentModel.complexity}</code>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid md:grid-cols-4 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Silhouette Score</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{currentModel.silhouetteScore.toFixed(3)}</div>
                      <Progress value={currentModel.silhouetteScore * 100} className="mt-2" />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Execution Time</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{currentModel.executionTime}s</div>
                      <p className="text-xs text-muted-foreground mt-1">Processing time</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Clusters Found</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{currentModel.clusters}</div>
                      <p className="text-xs text-muted-foreground mt-1">Optimal clusters</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Davies-Bouldin</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{currentModel.daviesBouldin.toFixed(2)}</div>
                      <p className="text-xs text-muted-foreground mt-1">Lower is better</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="metrics" className="space-y-6">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Detailed Performance Metrics</CardTitle>
                  <CardDescription>Comprehensive evaluation metrics for all clustering algorithms</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-semibold">Algorithm</th>
                          <th className="text-left py-3 px-4 font-semibold">Silhouette Score</th>
                          <th className="text-left py-3 px-4 font-semibold">Inertia</th>
                          <th className="text-left py-3 px-4 font-semibold">Calinski-Harabasz</th>
                          <th className="text-left py-3 px-4 font-semibold">Davies-Bouldin</th>
                          <th className="text-left py-3 px-4 font-semibold">Execution Time</th>
                          <th className="text-left py-3 px-4 font-semibold">Clusters</th>
                        </tr>
                      </thead>
                      <tbody>
                        {modelPerformance.map((model, index) => (
                          <tr key={model.name} className={`border-b ${model.recommended ? "bg-primary/5" : ""}`}>
                            <td className="py-3 px-4">
                              <div className="flex items-center space-x-2">
                                <span className="font-medium">{model.name}</span>
                                {model.recommended && (
                                  <Badge variant="default" className="text-xs">
                                    Best
                                  </Badge>
                                )}
                              </div>
                            </td>
                            <td className="py-3 px-4">{model.silhouetteScore.toFixed(3)}</td>
                            <td className="py-3 px-4">{model.inertia.toFixed(1)}</td>
                            <td className="py-3 px-4">{model.calinski.toFixed(1)}</td>
                            <td className="py-3 px-4">{model.daviesBouldin.toFixed(2)}</td>
                            <td className="py-3 px-4">{model.executionTime.toFixed(3)}s</td>
                            <td className="py-3 px-4">{model.clusters}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-serif">Metric Explanations</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold">Silhouette Score</h4>
                      <p className="text-sm text-muted-foreground">
                        Measures how similar an object is to its own cluster compared to other clusters. Range: [-1, 1],
                        higher is better.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Inertia</h4>
                      <p className="text-sm text-muted-foreground">
                        Sum of squared distances of samples to their closest cluster center. Lower values indicate
                        tighter clusters.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Calinski-Harabasz Index</h4>
                      <p className="text-sm text-muted-foreground">
                        Ratio of between-cluster dispersion to within-cluster dispersion. Higher values indicate better
                        clustering.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Davies-Bouldin Index</h4>
                      <p className="text-sm text-muted-foreground">
                        Average similarity measure of each cluster with its most similar cluster. Lower values indicate
                        better clustering.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="font-serif">Performance Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        <span className="text-sm">
                          <strong>Best Overall:</strong> K-Means clustering
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">
                          <strong>Fastest:</strong> K-Means (0.045s)
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="h-4 w-4 text-orange-500" />
                        <span className="text-sm">
                          <strong>Most Robust:</strong> DBSCAN
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="h-4 w-4 text-purple-500" />
                        <span className="text-sm">
                          <strong>Most Interpretable:</strong> Hierarchical
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Algorithm Recommendations</CardTitle>
                <CardDescription>Based on performance analysis and dataset characteristics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <h3 className="font-semibold text-green-800 dark:text-green-200">
                      Recommended: K-Means Clustering
                    </h3>
                  </div>
                  <p className="text-green-700 dark:text-green-300 mb-4">
                    K-Means achieved the highest silhouette score (0.72) and fastest execution time (0.045s), making it
                    the optimal choice for this mall customer dataset.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Why K-Means Works Best:</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Customer segments are naturally spherical</li>
                        <li>• Clear separation between spending behaviors</li>
                        <li>• Optimal number of clusters (3) is known</li>
                        <li>• Fast processing for real-time applications</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Business Impact:</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Clear customer segments for marketing</li>
                        <li>• Fast analysis for operational decisions</li>
                        <li>• Easy to interpret and explain to stakeholders</li>
                        <li>• Scalable for larger customer databases</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Alternative Scenarios</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold">Use Hierarchical When:</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Need to understand cluster relationships</li>
                          <li>• Working with smaller datasets (&lt;1000 customers)</li>
                          <li>• Cluster hierarchy is important for business</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold">Use DBSCAN When:</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Data contains significant outliers</li>
                          <li>• Cluster shapes are irregular</li>
                          <li>• Number of clusters is unknown</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Implementation Guidelines</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold">For Production Use:</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Start with K-Means for baseline</li>
                          <li>• Validate with multiple random initializations</li>
                          <li>• Monitor silhouette score over time</li>
                          <li>• Re-evaluate quarterly with new data</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold">Performance Monitoring:</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Track cluster stability</li>
                          <li>• Monitor execution time</li>
                          <li>• Validate business relevance</li>
                          <li>• A/B test marketing strategies</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
