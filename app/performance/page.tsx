"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { BarChart3, ArrowLeft, TrendingUp, Clock, Target, Award, AlertTriangle, CheckCircle } from "lucide-react"
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
  ScatterChart,
  Scatter,
  Area,
  AreaChart,
} from "recharts"

// Comprehensive performance data
const performanceMetrics = {
  "K-Means": {
    silhouetteScore: 0.724,
    calinskiHarabasz: 156.8,
    daviesBouldin: 0.89,
    inertia: 234.5,
    executionTime: 0.045,
    memoryUsage: 12.3,
    convergenceIterations: 8,
    stability: 0.92,
    scalability: 0.95,
    interpretability: 0.85,
    businessImpact: 0.88,
    clusters: 3,
    accuracy: 85.2,
    precision: 0.83,
    recall: 0.87,
    f1Score: 0.85,
  },
  Hierarchical: {
    silhouetteScore: 0.681,
    calinskiHarabasz: 142.1,
    daviesBouldin: 0.95,
    inertia: 267.3,
    executionTime: 0.123,
    memoryUsage: 45.7,
    convergenceIterations: 1,
    stability: 0.88,
    scalability: 0.45,
    interpretability: 0.95,
    businessImpact: 0.78,
    clusters: 3,
    accuracy: 78.4,
    precision: 0.76,
    recall: 0.81,
    f1Score: 0.78,
  },
  DBSCAN: {
    silhouetteScore: 0.582,
    calinskiHarabasz: 98.4,
    daviesBouldin: 1.23,
    inertia: 312.7,
    executionTime: 0.087,
    memoryUsage: 18.9,
    convergenceIterations: 1,
    stability: 0.75,
    scalability: 0.78,
    interpretability: 0.72,
    businessImpact: 0.65,
    clusters: 4,
    accuracy: 65.8,
    precision: 0.68,
    recall: 0.72,
    f1Score: 0.7,
  },
  "Gaussian Mixture": {
    silhouetteScore: 0.693,
    calinskiHarabasz: 148.3,
    daviesBouldin: 0.92,
    inertia: 245.8,
    executionTime: 0.156,
    memoryUsage: 28.4,
    convergenceIterations: 12,
    stability: 0.84,
    scalability: 0.68,
    interpretability: 0.65,
    businessImpact: 0.82,
    clusters: 3,
    accuracy: 80.1,
    precision: 0.79,
    recall: 0.83,
    f1Score: 0.81,
  },
}

// Performance trends over time
const performanceTrends = [
  { iteration: 1, kmeans: 0.45, hierarchical: 0.68, dbscan: 0.58, gaussian: 0.42 },
  { iteration: 2, kmeans: 0.58, hierarchical: 0.68, dbscan: 0.58, gaussian: 0.55 },
  { iteration: 3, kmeans: 0.65, hierarchical: 0.68, dbscan: 0.58, gaussian: 0.62 },
  { iteration: 4, kmeans: 0.69, hierarchical: 0.68, dbscan: 0.58, gaussian: 0.66 },
  { iteration: 5, kmeans: 0.71, hierarchical: 0.68, dbscan: 0.58, gaussian: 0.68 },
  { iteration: 6, kmeans: 0.72, hierarchical: 0.68, dbscan: 0.58, gaussian: 0.69 },
  { iteration: 7, kmeans: 0.72, hierarchical: 0.68, dbscan: 0.58, gaussian: 0.69 },
  { iteration: 8, kmeans: 0.72, hierarchical: 0.68, dbscan: 0.58, gaussian: 0.69 },
]

// Computational efficiency data
const efficiencyMetrics = [
  { algorithm: "K-Means", time: 0.045, memory: 12.3, scalability: 95 },
  { algorithm: "Hierarchical", time: 0.123, memory: 45.7, scalability: 45 },
  { algorithm: "DBSCAN", time: 0.087, memory: 18.9, scalability: 78 },
  { algorithm: "Gaussian Mixture", time: 0.156, memory: 28.4, scalability: 68 },
]

// Business impact metrics
const businessMetrics = [
  { metric: "Customer Retention", kmeans: 88, hierarchical: 78, dbscan: 65, gaussian: 82 },
  { metric: "Marketing ROI", kmeans: 92, hierarchical: 85, dbscan: 70, gaussian: 88 },
  { metric: "Segmentation Clarity", kmeans: 85, hierarchical: 95, dbscan: 72, gaussian: 65 },
  { metric: "Actionable Insights", kmeans: 90, hierarchical: 82, dbscan: 68, gaussian: 85 },
]

// Validation metrics comparison
const validationData = Object.entries(performanceMetrics).map(([name, metrics]) => ({
  algorithm: name,
  silhouette: metrics.silhouetteScore,
  calinski: metrics.calinskiHarabasz / 200, // Normalized
  daviesBouldin: 1 - metrics.daviesBouldin, // Inverted (lower is better)
  stability: metrics.stability,
}))

export default function PerformancePage() {
  const [selectedMetric, setSelectedMetric] = useState<string>("silhouetteScore")
  const [timeRange, setTimeRange] = useState<string>("all")

  const getMetricColor = (value: number, metric: string) => {
    if (metric === "executionTime" || metric === "memoryUsage") {
      return value < 0.1 ? "text-green-600" : value < 0.15 ? "text-yellow-600" : "text-red-600"
    }
    return value > 0.8 ? "text-green-600" : value > 0.6 ? "text-yellow-600" : "text-red-600"
  }

  const getPerformanceGrade = (algorithm: string) => {
    const metrics = performanceMetrics[algorithm]
    const score = (metrics.silhouetteScore + metrics.stability + metrics.businessImpact) / 3
    if (score > 0.85) return { grade: "A+", color: "text-green-600", bg: "bg-green-50" }
    if (score > 0.8) return { grade: "A", color: "text-green-600", bg: "bg-green-50" }
    if (score > 0.75) return { grade: "B+", color: "text-blue-600", bg: "bg-blue-50" }
    if (score > 0.7) return { grade: "B", color: "text-blue-600", bg: "bg-blue-50" }
    return { grade: "C", color: "text-orange-600", bg: "bg-orange-50" }
  }

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
              <span className="font-serif font-bold text-xl">Performance Metrics</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="recent">Recent</SelectItem>
                <SelectItem value="historical">Historical</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="container py-8">
        {/* Performance Overview */}
        <div className="mb-8">
          <h1 className="font-serif font-bold text-3xl mb-4">Clustering Performance Analysis</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Comprehensive performance evaluation of clustering algorithms including validation metrics, computational
            efficiency, and business impact analysis.
          </p>
        </div>

        {/* Algorithm Performance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Object.entries(performanceMetrics).map(([algorithm, metrics]) => {
            const grade = getPerformanceGrade(algorithm)
            return (
              <Card key={algorithm} className="relative">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-serif text-lg">{algorithm}</CardTitle>
                    <div className={`px-2 py-1 rounded-md text-sm font-bold ${grade.bg} ${grade.color}`}>
                      {grade.grade}
                    </div>
                  </div>
                  <CardDescription>Overall Performance Score</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Silhouette Score</span>
                    <span className={`font-medium ${getMetricColor(metrics.silhouetteScore, "silhouetteScore")}`}>
                      {metrics.silhouetteScore.toFixed(3)}
                    </span>
                  </div>
                  <Progress value={metrics.silhouetteScore * 100} className="h-2" />

                  <div className="flex justify-between items-center">
                    <span className="text-sm">Execution Time</span>
                    <span className={`font-medium ${getMetricColor(metrics.executionTime, "executionTime")}`}>
                      {metrics.executionTime.toFixed(3)}s
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm">Business Impact</span>
                    <span className={`font-medium ${getMetricColor(metrics.businessImpact, "businessImpact")}`}>
                      {Math.round(metrics.businessImpact * 100)}%
                    </span>
                  </div>

                  <div className="pt-2 border-t">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Clusters: {metrics.clusters}</span>
                      <span>Accuracy: {metrics.accuracy.toFixed(1)}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <Tabs defaultValue="validation" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="validation">Validation Metrics</TabsTrigger>
            <TabsTrigger value="efficiency">Computational Efficiency</TabsTrigger>
            <TabsTrigger value="trends">Performance Trends</TabsTrigger>
            <TabsTrigger value="business">Business Impact</TabsTrigger>
            <TabsTrigger value="detailed">Detailed Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="validation" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Validation Metrics Comparison</CardTitle>
                  <CardDescription>Key clustering validation scores across algorithms</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={validationData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="algorithm" />
                        <PolarRadiusAxis angle={90} domain={[0, 1]} />
                        <Radar
                          name="Silhouette"
                          dataKey="silhouette"
                          stroke="hsl(var(--chart-1))"
                          fill="hsl(var(--chart-1))"
                          fillOpacity={0.1}
                        />
                        <Radar
                          name="Calinski-Harabasz"
                          dataKey="calinski"
                          stroke="hsl(var(--chart-2))"
                          fill="hsl(var(--chart-2))"
                          fillOpacity={0.1}
                        />
                        <Radar
                          name="Davies-Bouldin"
                          dataKey="daviesBouldin"
                          stroke="hsl(var(--chart-3))"
                          fill="hsl(var(--chart-3))"
                          fillOpacity={0.1}
                        />
                        <Radar
                          name="Stability"
                          dataKey="stability"
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

              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Metric Rankings</CardTitle>
                  <CardDescription>Algorithm rankings by validation metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Silhouette Score</span>
                        <Award className="h-4 w-4 text-yellow-500" />
                      </div>
                      <div className="space-y-2">
                        {Object.entries(performanceMetrics)
                          .sort(([, a], [, b]) => b.silhouetteScore - a.silhouetteScore)
                          .map(([name, metrics], index) => (
                            <div key={name} className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <Badge variant={index === 0 ? "default" : "secondary"} className="w-6 h-6 p-0 text-xs">
                                  {index + 1}
                                </Badge>
                                <span className="text-sm">{name}</span>
                              </div>
                              <span className="text-sm font-medium">{metrics.silhouetteScore.toFixed(3)}</span>
                            </div>
                          ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Execution Speed</span>
                        <Clock className="h-4 w-4 text-blue-500" />
                      </div>
                      <div className="space-y-2">
                        {Object.entries(performanceMetrics)
                          .sort(([, a], [, b]) => a.executionTime - b.executionTime)
                          .map(([name, metrics], index) => (
                            <div key={name} className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <Badge variant={index === 0 ? "default" : "secondary"} className="w-6 h-6 p-0 text-xs">
                                  {index + 1}
                                </Badge>
                                <span className="text-sm">{name}</span>
                              </div>
                              <span className="text-sm font-medium">{metrics.executionTime.toFixed(3)}s</span>
                            </div>
                          ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Business Impact</span>
                        <Target className="h-4 w-4 text-green-500" />
                      </div>
                      <div className="space-y-2">
                        {Object.entries(performanceMetrics)
                          .sort(([, a], [, b]) => b.businessImpact - a.businessImpact)
                          .map(([name, metrics], index) => (
                            <div key={name} className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <Badge variant={index === 0 ? "default" : "secondary"} className="w-6 h-6 p-0 text-xs">
                                  {index + 1}
                                </Badge>
                                <span className="text-sm">{name}</span>
                              </div>
                              <span className="text-sm font-medium">{Math.round(metrics.businessImpact * 100)}%</span>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Comprehensive Validation Matrix</CardTitle>
                <CardDescription>Detailed comparison of all validation metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-semibold">Algorithm</th>
                        <th className="text-left py-3 px-4 font-semibold">Silhouette</th>
                        <th className="text-left py-3 px-4 font-semibold">Calinski-H</th>
                        <th className="text-left py-3 px-4 font-semibold">Davies-B</th>
                        <th className="text-left py-3 px-4 font-semibold">Stability</th>
                        <th className="text-left py-3 px-4 font-semibold">Precision</th>
                        <th className="text-left py-3 px-4 font-semibold">Recall</th>
                        <th className="text-left py-3 px-4 font-semibold">F1-Score</th>
                        <th className="text-left py-3 px-4 font-semibold">Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(performanceMetrics).map(([algorithm, metrics]) => {
                        const grade = getPerformanceGrade(algorithm)
                        return (
                          <tr key={algorithm} className="border-b hover:bg-muted/50">
                            <td className="py-3 px-4 font-medium">{algorithm}</td>
                            <td className="py-3 px-4">{metrics.silhouetteScore.toFixed(3)}</td>
                            <td className="py-3 px-4">{metrics.calinskiHarabasz.toFixed(1)}</td>
                            <td className="py-3 px-4">{metrics.daviesBouldin.toFixed(2)}</td>
                            <td className="py-3 px-4">{metrics.stability.toFixed(2)}</td>
                            <td className="py-3 px-4">{metrics.precision.toFixed(2)}</td>
                            <td className="py-3 px-4">{metrics.recall.toFixed(2)}</td>
                            <td className="py-3 px-4">{metrics.f1Score.toFixed(2)}</td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded text-xs font-bold ${grade.bg} ${grade.color}`}>
                                {grade.grade}
                              </span>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="efficiency" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Execution Time vs Memory Usage</CardTitle>
                  <CardDescription>Computational efficiency comparison</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <ScatterChart data={efficiencyMetrics}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" name="Execution Time" unit="s" />
                        <YAxis dataKey="memory" name="Memory Usage" unit="MB" />
                        <Tooltip
                          formatter={(value, name) => [value, name]}
                          labelFormatter={(label) => `Algorithm: ${label}`}
                        />
                        <Scatter data={efficiencyMetrics} fill="hsl(var(--primary))" />
                      </ScatterChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Scalability Analysis</CardTitle>
                  <CardDescription>Performance scalability scores</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={efficiencyMetrics} layout="horizontal">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" domain={[0, 100]} />
                        <YAxis dataKey="algorithm" type="category" width={100} />
                        <Tooltip />
                        <Bar dataKey="scalability" fill="hsl(var(--chart-2))" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {Object.entries(performanceMetrics).map(([algorithm, metrics]) => (
                <Card key={algorithm}>
                  <CardHeader>
                    <CardTitle className="font-serif text-lg">{algorithm}</CardTitle>
                    <CardDescription>Computational Performance</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Execution Time</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">{metrics.executionTime.toFixed(3)}s</span>
                        {metrics.executionTime < 0.1 ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-yellow-500" />
                        )}
                      </div>
                    </div>
                    <Progress value={(1 - metrics.executionTime / 0.2) * 100} className="h-2" />

                    <div className="flex items-center justify-between">
                      <span className="text-sm">Memory Usage</span>
                      <span className="text-sm font-medium">{metrics.memoryUsage.toFixed(1)} MB</span>
                    </div>
                    <Progress value={(1 - metrics.memoryUsage / 50) * 100} className="h-2" />

                    <div className="flex items-center justify-between">
                      <span className="text-sm">Scalability</span>
                      <span className="text-sm font-medium">{Math.round(metrics.scalability * 100)}%</span>
                    </div>
                    <Progress value={metrics.scalability * 100} className="h-2" />

                    <div className="pt-2 border-t text-xs text-muted-foreground">
                      <div>Convergence: {metrics.convergenceIterations} iterations</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Performance Convergence Trends</CardTitle>
                <CardDescription>Silhouette score evolution during algorithm execution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={performanceTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="iteration" />
                      <YAxis domain={[0.4, 0.75]} />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="kmeans"
                        stackId="1"
                        stroke="hsl(var(--chart-1))"
                        fill="hsl(var(--chart-1))"
                        fillOpacity={0.3}
                        name="K-Means"
                      />
                      <Area
                        type="monotone"
                        dataKey="hierarchical"
                        stackId="2"
                        stroke="hsl(var(--chart-2))"
                        fill="hsl(var(--chart-2))"
                        fillOpacity={0.3}
                        name="Hierarchical"
                      />
                      <Area
                        type="monotone"
                        dataKey="dbscan"
                        stackId="3"
                        stroke="hsl(var(--chart-3))"
                        fill="hsl(var(--chart-3))"
                        fillOpacity={0.3}
                        name="DBSCAN"
                      />
                      <Area
                        type="monotone"
                        dataKey="gaussian"
                        stackId="4"
                        stroke="hsl(var(--chart-4))"
                        fill="hsl(var(--chart-4))"
                        fillOpacity={0.3}
                        name="Gaussian Mixture"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Stability Analysis</CardTitle>
                  <CardDescription>Algorithm consistency across multiple runs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(performanceMetrics).map(([algorithm, metrics]) => (
                      <div key={algorithm}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">{algorithm}</span>
                          <span className="text-sm">{Math.round(metrics.stability * 100)}%</span>
                        </div>
                        <Progress value={metrics.stability * 100} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Performance Summary</CardTitle>
                  <CardDescription>Key insights and recommendations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <TrendingUp className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <div className="font-medium text-sm">Best Overall Performance</div>
                        <div className="text-sm text-muted-foreground">
                          K-Means shows superior balance of accuracy and efficiency
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Clock className="h-5 w-5 text-blue-500 mt-0.5" />
                      <div>
                        <div className="font-medium text-sm">Fastest Execution</div>
                        <div className="text-sm text-muted-foreground">
                          K-Means completes in 0.045s with minimal memory usage
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Target className="h-5 w-5 text-purple-500 mt-0.5" />
                      <div>
                        <div className="font-medium text-sm">Highest Business Impact</div>
                        <div className="text-sm text-muted-foreground">K-Means delivers 88% business impact score</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5" />
                      <div>
                        <div className="font-medium text-sm">Scalability Concerns</div>
                        <div className="text-sm text-muted-foreground">
                          Hierarchical clustering shows poor scalability (45%)
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="business" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Business Impact Analysis</CardTitle>
                <CardDescription>Real-world performance metrics for business applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={businessMetrics}>
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

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">ROI Analysis</CardTitle>
                  <CardDescription>Return on investment for each algorithm</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(performanceMetrics)
                      .sort(([, a], [, b]) => b.businessImpact - a.businessImpact)
                      .map(([algorithm, metrics], index) => (
                        <div key={algorithm} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Badge variant={index === 0 ? "default" : "secondary"} className="w-8 h-8 p-0">
                              {index + 1}
                            </Badge>
                            <div>
                              <div className="font-medium">{algorithm}</div>
                              <div className="text-sm text-muted-foreground">
                                {Math.round(metrics.businessImpact * 100)}% impact score
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-green-600">
                              ${Math.round(metrics.businessImpact * 50000).toLocaleString()}
                            </div>
                            <div className="text-xs text-muted-foreground">Annual value</div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Implementation Recommendations</CardTitle>
                  <CardDescription>Strategic guidance for production deployment</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="font-medium text-green-800 dark:text-green-200">Primary Recommendation</span>
                      </div>
                      <p className="text-sm text-green-700 dark:text-green-300">
                        Deploy K-Means for production use due to optimal balance of performance, speed, and business
                        impact.
                      </p>
                    </div>

                    <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Target className="h-4 w-4 text-blue-600" />
                        <span className="font-medium text-blue-800 dark:text-blue-200">Secondary Option</span>
                      </div>
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        Consider Gaussian Mixture for scenarios requiring probability estimates and soft clustering.
                      </p>
                    </div>

                    <div className="p-4 bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <AlertTriangle className="h-4 w-4 text-orange-600" />
                        <span className="font-medium text-orange-800 dark:text-orange-200">Caution</span>
                      </div>
                      <p className="text-sm text-orange-700 dark:text-orange-300">
                        Avoid Hierarchical clustering for large datasets due to poor scalability and high memory usage.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="detailed" className="space-y-6">
            <div className="grid gap-6">
              {Object.entries(performanceMetrics).map(([algorithm, metrics]) => {
                const grade = getPerformanceGrade(algorithm)
                return (
                  <Card key={algorithm}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="font-serif text-xl">{algorithm}</CardTitle>
                        <div className={`px-3 py-1 rounded-lg text-sm font-bold ${grade.bg} ${grade.color}`}>
                          Grade: {grade.grade}
                        </div>
                      </div>
                      <CardDescription>Comprehensive performance breakdown</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-6">
                        <div>
                          <h4 className="font-semibold mb-3">Validation Metrics</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm">Silhouette Score</span>
                              <span className="font-medium">{metrics.silhouetteScore.toFixed(3)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Calinski-Harabasz</span>
                              <span className="font-medium">{metrics.calinskiHarabasz.toFixed(1)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Davies-Bouldin</span>
                              <span className="font-medium">{metrics.daviesBouldin.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Inertia</span>
                              <span className="font-medium">{metrics.inertia.toFixed(1)}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-3">Performance Metrics</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm">Accuracy</span>
                              <span className="font-medium">{metrics.accuracy.toFixed(1)}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Precision</span>
                              <span className="font-medium">{metrics.precision.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Recall</span>
                              <span className="font-medium">{metrics.recall.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">F1-Score</span>
                              <span className="font-medium">{metrics.f1Score.toFixed(2)}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-3">Operational Metrics</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm">Execution Time</span>
                              <span className="font-medium">{metrics.executionTime.toFixed(3)}s</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Memory Usage</span>
                              <span className="font-medium">{metrics.memoryUsage.toFixed(1)} MB</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Stability</span>
                              <span className="font-medium">{Math.round(metrics.stability * 100)}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Business Impact</span>
                              <span className="font-medium">{Math.round(metrics.businessImpact * 100)}%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
