"use client"

import { useState, useEffect, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { BarChart3, ArrowLeft, Play, RotateCcw, Settings } from "lucide-react"
import Link from "next/link"
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"

// Sample customer data for demonstration
const baseCustomerData = [
  { id: 1, age: 19, income: 15, spendingScore: 39 },
  { id: 2, age: 21, income: 15, spendingScore: 81 },
  { id: 3, age: 20, income: 16, spendingScore: 6 },
  { id: 4, age: 23, income: 16, spendingScore: 77 },
  { id: 5, age: 31, income: 17, spendingScore: 40 },
  { id: 6, age: 22, income: 17, spendingScore: 76 },
  { id: 7, age: 35, income: 18, spendingScore: 6 },
  { id: 8, age: 23, income: 18, spendingScore: 94 },
  { id: 9, age: 64, income: 19, spendingScore: 3 },
  { id: 10, age: 30, income: 19, spendingScore: 72 },
  { id: 11, age: 67, income: 19, spendingScore: 14 },
  { id: 12, age: 35, income: 20, spendingScore: 99 },
  { id: 13, age: 58, income: 20, spendingScore: 15 },
  { id: 14, age: 24, income: 20, spendingScore: 77 },
  { id: 15, age: 37, income: 20, spendingScore: 13 },
  { id: 16, age: 22, income: 20, spendingScore: 79 },
  { id: 17, age: 35, income: 21, spendingScore: 35 },
  { id: 18, age: 20, income: 21, spendingScore: 66 },
  { id: 19, age: 52, income: 23, spendingScore: 29 },
  { id: 20, age: 35, income: 23, spendingScore: 98 },
  { id: 21, age: 35, income: 24, spendingScore: 35 },
  { id: 22, age: 25, income: 25, spendingScore: 73 },
  { id: 23, age: 46, income: 25, spendingScore: 5 },
  { id: 24, age: 31, income: 25, spendingScore: 73 },
  { id: 25, age: 54, income: 28, spendingScore: 14 },
  { id: 26, age: 29, income: 28, spendingScore: 82 },
  { id: 27, age: 45, income: 28, spendingScore: 32 },
  { id: 28, age: 35, income: 28, spendingScore: 61 },
  { id: 29, age: 40, income: 29, spendingScore: 31 },
  { id: 30, age: 23, income: 29, spendingScore: 87 },
  { id: 31, age: 60, income: 30, spendingScore: 4 },
  { id: 32, age: 21, income: 30, spendingScore: 73 },
  { id: 33, age: 53, income: 33, spendingScore: 4 },
  { id: 34, age: 18, income: 33, spendingScore: 92 },
  { id: 35, age: 49, income: 33, spendingScore: 14 },
  { id: 36, age: 21, income: 33, spendingScore: 81 },
  { id: 37, age: 42, income: 34, spendingScore: 17 },
  { id: 38, age: 30, income: 34, spendingScore: 73 },
  { id: 39, age: 36, income: 37, spendingScore: 26 },
  { id: 40, age: 20, income: 37, spendingScore: 75 },
  { id: 41, age: 65, income: 38, spendingScore: 35 },
  { id: 42, age: 24, income: 38, spendingScore: 92 },
  { id: 43, age: 48, income: 39, spendingScore: 36 },
  { id: 44, age: 31, income: 39, spendingScore: 61 },
  { id: 45, age: 49, income: 39, spendingScore: 28 },
  { id: 46, age: 24, income: 39, spendingScore: 65 },
  { id: 47, age: 50, income: 40, spendingScore: 55 },
  { id: 48, age: 27, income: 40, spendingScore: 47 },
  { id: 49, age: 29, income: 40, spendingScore: 42 },
  { id: 50, age: 31, income: 40, spendingScore: 42 },
]

// Simple K-Means clustering simulation
function simpleKMeans(data: any[], k: number, maxIterations = 10) {
  // Initialize centroids randomly
  const centroids = []
  for (let i = 0; i < k; i++) {
    const randomPoint = data[Math.floor(Math.random() * data.length)]
    centroids.push({
      income: randomPoint.income + (Math.random() - 0.5) * 5,
      spendingScore: randomPoint.spendingScore + (Math.random() - 0.5) * 10,
    })
  }

  let iterations = 0
  let converged = false

  while (iterations < maxIterations && !converged) {
    // Assign points to nearest centroid
    const clusters = Array(k)
      .fill(null)
      .map(() => [])

    data.forEach((point) => {
      let minDistance = Number.POSITIVE_INFINITY
      let clusterIndex = 0

      centroids.forEach((centroid, index) => {
        const distance = Math.sqrt(
          Math.pow(point.income - centroid.income, 2) + Math.pow(point.spendingScore - centroid.spendingScore, 2),
        )
        if (distance < minDistance) {
          minDistance = distance
          clusterIndex = index
        }
      })

      clusters[clusterIndex].push({ ...point, cluster: clusterIndex })
    })

    // Update centroids
    const newCentroids = clusters.map((cluster) => {
      if (cluster.length === 0) return centroids[clusters.indexOf(cluster)]

      const avgIncome = cluster.reduce((sum, point) => sum + point.income, 0) / cluster.length
      const avgSpending = cluster.reduce((sum, point) => sum + point.spendingScore, 0) / cluster.length

      return { income: avgIncome, spendingScore: avgSpending }
    })

    // Check for convergence
    converged = centroids.every(
      (centroid, index) =>
        Math.abs(centroid.income - newCentroids[index].income) < 0.1 &&
        Math.abs(centroid.spendingScore - newCentroids[index].spendingScore) < 0.1,
    )

    centroids.splice(0, centroids.length, ...newCentroids)
    iterations++
  }

  // Return final clustered data
  const result = []
  data.forEach((point) => {
    let minDistance = Number.POSITIVE_INFINITY
    let clusterIndex = 0

    centroids.forEach((centroid, index) => {
      const distance = Math.sqrt(
        Math.pow(point.income - centroid.income, 2) + Math.pow(point.spendingScore - centroid.spendingScore, 2),
      )
      if (distance < minDistance) {
        minDistance = distance
        clusterIndex = index
      }
    })

    result.push({ ...point, cluster: clusterIndex })
  })

  return { data: result, centroids, iterations }
}

// Calculate silhouette score (simplified)
function calculateSilhouetteScore(data: any[]) {
  if (data.length === 0) return 0

  let totalScore = 0

  data.forEach((point) => {
    const sameCluster = data.filter((p) => p.cluster === point.cluster && p.id !== point.id)
    const otherClusters = data.filter((p) => p.cluster !== point.cluster)

    if (sameCluster.length === 0) return

    // Average distance to same cluster
    const avgSameCluster =
      sameCluster.reduce((sum, p) => {
        return (
          sum + Math.sqrt(Math.pow(point.income - p.income, 2) + Math.pow(point.spendingScore - p.spendingScore, 2))
        )
      }, 0) / sameCluster.length

    // Average distance to nearest other cluster
    const clusterDistances = {}
    otherClusters.forEach((p) => {
      if (!clusterDistances[p.cluster]) clusterDistances[p.cluster] = []
      clusterDistances[p.cluster].push(
        Math.sqrt(Math.pow(point.income - p.income, 2) + Math.pow(point.spendingScore - p.spendingScore, 2)),
      )
    })

    const avgOtherCluster = Math.min(
      ...Object.values(clusterDistances).map(
        (distances: any) => distances.reduce((sum, d) => sum + d, 0) / distances.length,
      ),
    )

    const silhouette = (avgOtherCluster - avgSameCluster) / Math.max(avgSameCluster, avgOtherCluster)
    totalScore += silhouette
  })

  return totalScore / data.length
}

const clusterColors = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
]

export default function ExplorerPage() {
  const [algorithm, setAlgorithm] = useState<string>("kmeans")
  const [numClusters, setNumClusters] = useState<number[]>([3])
  const [maxIterations, setMaxIterations] = useState<number[]>([10])
  const [dataSubset, setDataSubset] = useState<number[]>([100])
  const [xAxis, setXAxis] = useState<string>("income")
  const [yAxis, setYAxis] = useState<string>("spendingScore")
  const [showCentroids, setShowCentroids] = useState<boolean>(true)
  const [autoRun, setAutoRun] = useState<boolean>(false)
  const [isRunning, setIsRunning] = useState<boolean>(false)

  const currentData = useMemo(() => {
    const subset = baseCustomerData.slice(0, Math.floor((baseCustomerData.length * dataSubset[0]) / 100))
    return subset
  }, [dataSubset])

  const clusteringResult = useMemo(() => {
    if (algorithm === "kmeans") {
      return simpleKMeans(currentData, numClusters[0], maxIterations[0])
    }
    // For other algorithms, return a simple clustering for demo
    return {
      data: currentData.map((point, index) => ({ ...point, cluster: index % numClusters[0] })),
      centroids: [],
      iterations: 1,
    }
  }, [currentData, algorithm, numClusters, maxIterations])

  const silhouetteScore = useMemo(() => {
    return calculateSilhouetteScore(clusteringResult.data)
  }, [clusteringResult])

  const performanceHistory = useMemo(() => {
    const history = []
    for (let k = 2; k <= 8; k++) {
      const result = simpleKMeans(currentData, k, maxIterations[0])
      const score = calculateSilhouetteScore(result.data)
      history.push({ clusters: k, silhouette: score, inertia: Math.random() * 100 + 50 })
    }
    return history
  }, [currentData, maxIterations])

  const runClustering = () => {
    setIsRunning(true)
    setTimeout(() => setIsRunning(false), 1000)
  }

  const resetParameters = () => {
    setNumClusters([3])
    setMaxIterations([10])
    setDataSubset([100])
    setXAxis("income")
    setYAxis("spendingScore")
    setShowCentroids(true)
  }

  useEffect(() => {
    if (autoRun) {
      runClustering()
    }
  }, [numClusters, maxIterations, dataSubset, algorithm, autoRun])

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
              <span className="font-serif font-bold text-xl">Interactive Explorer</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant={isRunning ? "default" : "secondary"}>{isRunning ? "Running..." : "Ready"}</Badge>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Control Panel */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Parameters
                </CardTitle>
                <CardDescription>Adjust clustering parameters in real-time</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-sm font-medium">Algorithm</Label>
                  <Select value={algorithm} onValueChange={setAlgorithm}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kmeans">K-Means</SelectItem>
                      <SelectItem value="hierarchical">Hierarchical</SelectItem>
                      <SelectItem value="dbscan">DBSCAN</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium">Number of Clusters: {numClusters[0]}</Label>
                  <Slider
                    value={numClusters}
                    onValueChange={setNumClusters}
                    min={2}
                    max={8}
                    step={1}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium">Max Iterations: {maxIterations[0]}</Label>
                  <Slider
                    value={maxIterations}
                    onValueChange={setMaxIterations}
                    min={5}
                    max={50}
                    step={5}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium">Data Subset: {dataSubset[0]}%</Label>
                  <Slider
                    value={dataSubset}
                    onValueChange={setDataSubset}
                    min={20}
                    max={100}
                    step={10}
                    className="mt-2"
                  />
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">X-Axis</Label>
                    <Select value={xAxis} onValueChange={setXAxis}>
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="income">Income</SelectItem>
                        <SelectItem value="age">Age</SelectItem>
                        <SelectItem value="spendingScore">Spending Score</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Y-Axis</Label>
                    <Select value={yAxis} onValueChange={setYAxis}>
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="spendingScore">Spending Score</SelectItem>
                        <SelectItem value="income">Income</SelectItem>
                        <SelectItem value="age">Age</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="centroids" checked={showCentroids} onCheckedChange={setShowCentroids} />
                  <Label htmlFor="centroids" className="text-sm">
                    Show Centroids
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="autorun" checked={autoRun} onCheckedChange={setAutoRun} />
                  <Label htmlFor="autorun" className="text-sm">
                    Auto-run
                  </Label>
                </div>

                <Separator />

                <div className="flex space-x-2">
                  <Button onClick={runClustering} disabled={isRunning} className="flex-1">
                    <Play className="h-4 w-4 mr-2" />
                    {isRunning ? "Running..." : "Run"}
                  </Button>
                  <Button variant="outline" onClick={resetParameters}>
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif text-lg">Live Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground">Silhouette Score</div>
                  <div className="text-2xl font-bold">{silhouetteScore.toFixed(3)}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Iterations</div>
                  <div className="text-2xl font-bold">{clusteringResult.iterations}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Data Points</div>
                  <div className="text-2xl font-bold">{currentData.length}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Clusters</div>
                  <div className="text-2xl font-bold">{numClusters[0]}</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Visualization Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Main Scatter Plot */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Interactive Clustering Visualization</CardTitle>
                <CardDescription>
                  Real-time clustering results with {algorithm} algorithm ({numClusters[0]} clusters)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart data={clusteringResult.data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey={xAxis}
                        name={xAxis === "income" ? "Income" : xAxis === "age" ? "Age" : "Spending Score"}
                        unit={xAxis === "income" ? "K" : ""}
                      />
                      <YAxis
                        dataKey={yAxis}
                        name={yAxis === "spendingScore" ? "Spending Score" : yAxis === "income" ? "Income" : "Age"}
                        unit={yAxis === "income" ? "K" : ""}
                      />
                      <Tooltip
                        formatter={(value, name) => [value, name]}
                        labelFormatter={(label) => `Customer ID: ${label}`}
                      />
                      {Array.from({ length: numClusters[0] }, (_, i) => (
                        <Scatter
                          key={i}
                          name={`Cluster ${i + 1}`}
                          data={clusteringResult.data.filter((d) => d.cluster === i)}
                          fill={clusterColors[i % clusterColors.length]}
                        />
                      ))}
                      {showCentroids &&
                        clusteringResult.centroids.map((centroid, index) => (
                          <Scatter
                            key={`centroid-${index}`}
                            name={`Centroid ${index + 1}`}
                            data={[
                              {
                                [xAxis]: centroid[xAxis] || centroid.income,
                                [yAxis]: centroid[yAxis] || centroid.spendingScore,
                              },
                            ]}
                            fill="#000000"
                            shape="cross"
                          />
                        ))}
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Performance Analysis */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Optimal Clusters Analysis</CardTitle>
                  <CardDescription>Silhouette score for different cluster counts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={performanceHistory}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="clusters" />
                        <YAxis />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="silhouette"
                          stroke="hsl(var(--primary))"
                          strokeWidth={2}
                          dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Cluster Statistics</CardTitle>
                  <CardDescription>Current clustering breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Array.from({ length: numClusters[0] }, (_, i) => {
                      const clusterData = clusteringResult.data.filter((d) => d.cluster === i)
                      const avgIncome =
                        clusterData.length > 0
                          ? Math.round(clusterData.reduce((sum, d) => sum + d.income, 0) / clusterData.length)
                          : 0
                      const avgSpending =
                        clusterData.length > 0
                          ? Math.round(clusterData.reduce((sum, d) => sum + d.spendingScore, 0) / clusterData.length)
                          : 0

                      return (
                        <div key={i} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: clusterColors[i % clusterColors.length] }}
                            />
                            <div>
                              <div className="font-medium">Cluster {i + 1}</div>
                              <div className="text-sm text-muted-foreground">{clusterData.length} customers</div>
                            </div>
                          </div>
                          <div className="text-right text-sm">
                            <div>Avg Income: ${avgIncome}K</div>
                            <div>Avg Spending: {avgSpending}</div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Quick Experiments</CardTitle>
                <CardDescription>Try these preset configurations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setNumClusters([2])
                      setMaxIterations([20])
                      setDataSubset([100])
                    }}
                    className="h-auto p-4 flex flex-col items-start"
                  >
                    <div className="font-medium">Simple Segmentation</div>
                    <div className="text-sm text-muted-foreground mt-1">2 clusters, high precision</div>
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => {
                      setNumClusters([5])
                      setMaxIterations([15])
                      setDataSubset([80])
                    }}
                    className="h-auto p-4 flex flex-col items-start"
                  >
                    <div className="font-medium">Detailed Analysis</div>
                    <div className="text-sm text-muted-foreground mt-1">5 clusters, subset data</div>
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => {
                      setNumClusters([3])
                      setMaxIterations([5])
                      setDataSubset([50])
                    }}
                    className="h-auto p-4 flex flex-col items-start"
                  >
                    <div className="font-medium">Fast Prototype</div>
                    <div className="text-sm text-muted-foreground mt-1">Quick clustering test</div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
