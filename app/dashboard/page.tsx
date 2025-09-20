"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart3, Users, ArrowLeft, Filter, Download, Zap, TrendingUp } from "lucide-react"
import Link from "next/link"
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"

// Sample customer data for demonstration
const customerData = [
  { id: 1, age: 19, income: 15, spendingScore: 39, cluster: 0 },
  { id: 2, age: 21, income: 15, spendingScore: 81, cluster: 1 },
  { id: 3, age: 20, income: 16, spendingScore: 6, cluster: 2 },
  { id: 4, age: 23, income: 16, spendingScore: 77, cluster: 1 },
  { id: 5, age: 31, income: 17, spendingScore: 40, cluster: 0 },
  { id: 6, age: 22, income: 17, spendingScore: 76, cluster: 1 },
  { id: 7, age: 35, income: 18, spendingScore: 6, cluster: 2 },
  { id: 8, age: 23, income: 18, spendingScore: 94, cluster: 1 },
  { id: 9, age: 64, income: 19, spendingScore: 3, cluster: 2 },
  { id: 10, age: 30, income: 19, spendingScore: 72, cluster: 1 },
  { id: 11, age: 67, income: 19, spendingScore: 14, cluster: 2 },
  { id: 12, age: 35, income: 20, spendingScore: 99, cluster: 1 },
  { id: 13, age: 58, income: 20, spendingScore: 15, cluster: 2 },
  { id: 14, age: 24, income: 20, spendingScore: 77, cluster: 1 },
  { id: 15, age: 37, income: 20, spendingScore: 13, cluster: 2 },
  { id: 16, age: 22, income: 20, spendingScore: 79, cluster: 1 },
  { id: 17, age: 35, income: 21, spendingScore: 35, cluster: 0 },
  { id: 18, age: 20, income: 21, spendingScore: 66, cluster: 1 },
  { id: 19, age: 52, income: 23, spendingScore: 29, cluster: 0 },
  { id: 20, age: 35, income: 23, spendingScore: 98, cluster: 1 },
  { id: 21, age: 35, income: 24, spendingScore: 35, cluster: 0 },
  { id: 22, age: 25, income: 25, spendingScore: 73, cluster: 1 },
  { id: 23, age: 46, income: 25, spendingScore: 5, cluster: 2 },
  { id: 24, age: 31, income: 25, spendingScore: 73, cluster: 1 },
  { id: 25, age: 54, income: 28, spendingScore: 14, cluster: 2 },
  { id: 26, age: 29, income: 28, spendingScore: 82, cluster: 1 },
  { id: 27, age: 45, income: 28, spendingScore: 32, cluster: 0 },
  { id: 28, age: 35, income: 28, spendingScore: 61, cluster: 1 },
  { id: 29, age: 40, income: 29, spendingScore: 31, cluster: 0 },
  { id: 30, age: 23, income: 29, spendingScore: 87, cluster: 1 },
  { id: 31, age: 60, income: 30, spendingScore: 4, cluster: 2 },
  { id: 32, age: 21, income: 30, spendingScore: 73, cluster: 1 },
  { id: 33, age: 53, income: 33, spendingScore: 4, cluster: 2 },
  { id: 34, age: 18, income: 33, spendingScore: 92, cluster: 1 },
  { id: 35, age: 49, income: 33, spendingScore: 14, cluster: 2 },
  { id: 36, age: 21, income: 33, spendingScore: 81, cluster: 1 },
  { id: 37, age: 42, income: 34, spendingScore: 17, cluster: 2 },
  { id: 38, age: 30, income: 34, spendingScore: 73, cluster: 1 },
  { id: 39, age: 36, income: 37, spendingScore: 26, cluster: 0 },
  { id: 40, age: 20, income: 37, spendingScore: 75, cluster: 1 },
  { id: 41, age: 65, income: 38, spendingScore: 35, cluster: 0 },
  { id: 42, age: 24, income: 38, spendingScore: 92, cluster: 1 },
  { id: 43, age: 48, income: 39, spendingScore: 36, cluster: 0 },
  { id: 44, age: 31, income: 39, spendingScore: 61, cluster: 1 },
  { id: 45, age: 49, income: 39, spendingScore: 28, cluster: 0 },
  { id: 46, age: 24, income: 39, spendingScore: 65, cluster: 1 },
  { id: 47, age: 50, income: 40, spendingScore: 55, cluster: 0 },
  { id: 48, age: 27, income: 40, spendingScore: 47, cluster: 0 },
  { id: 49, age: 29, income: 40, spendingScore: 42, cluster: 0 },
  { id: 50, age: 31, income: 40, spendingScore: 42, cluster: 0 },
]

const clusterColors = {
  0: "hsl(var(--chart-1))",
  1: "hsl(var(--chart-2))",
  2: "hsl(var(--chart-3))",
}

const clusterNames = {
  0: "Moderate Spenders",
  1: "High Spenders",
  2: "Low Spenders",
}

export default function DashboardPage() {
  const [selectedCluster, setSelectedCluster] = useState<string>("all")
  const [viewMode, setViewMode] = useState<string>("income-spending")

  const filteredData =
    selectedCluster === "all"
      ? customerData
      : customerData.filter((d) => d.cluster === Number.parseInt(selectedCluster))

  const clusterDistribution = [
    { name: "Moderate Spenders", value: customerData.filter((d) => d.cluster === 0).length, color: clusterColors[0] },
    { name: "High Spenders", value: customerData.filter((d) => d.cluster === 1).length, color: clusterColors[1] },
    { name: "Low Spenders", value: customerData.filter((d) => d.cluster === 2).length, color: clusterColors[2] },
  ]

  const ageDistribution = [
    { ageGroup: "18-25", count: customerData.filter((d) => d.age >= 18 && d.age <= 25).length },
    { ageGroup: "26-35", count: customerData.filter((d) => d.age >= 26 && d.age <= 35).length },
    { ageGroup: "36-45", count: customerData.filter((d) => d.age >= 36 && d.age <= 45).length },
    { ageGroup: "46-55", count: customerData.filter((d) => d.age >= 46 && d.age <= 55).length },
    { ageGroup: "56+", count: customerData.filter((d) => d.age >= 56).length },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-6 w-6 text-primary" />
              <span className="font-serif font-bold text-xl">Data Visualization</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/performance">
                <TrendingUp className="h-4 w-4 mr-2" />
                Performance Metrics
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/explorer">
                <Zap className="h-4 w-4 mr-2" />
                Interactive Explorer
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/models">
                <BarChart3 className="h-4 w-4 mr-2" />
                Compare Models
              </Link>
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>
      </div>

      <div className="container py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{customerData.length}</div>
              <p className="text-xs text-muted-foreground">Analyzed customers</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Clusters Identified</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Distinct segments</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Income</CardTitle>
              <span className="text-xs text-muted-foreground">$K</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(customerData.reduce((sum, d) => sum + d.income, 0) / customerData.length)}K
              </div>
              <p className="text-xs text-muted-foreground">Annual income</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Spending Score</CardTitle>
              <span className="text-xs text-muted-foreground">/100</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(customerData.reduce((sum, d) => sum + d.spendingScore, 0) / customerData.length)}
              </div>
              <p className="text-xs text-muted-foreground">Out of 100</p>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium">Cluster Filter:</label>
            <Select value={selectedCluster} onValueChange={setSelectedCluster}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Clusters</SelectItem>
                <SelectItem value="0">Moderate Spenders</SelectItem>
                <SelectItem value="1">High Spenders</SelectItem>
                <SelectItem value="2">Low Spenders</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium">View Mode:</label>
            <Select value={viewMode} onValueChange={setViewMode}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="income-spending">Income vs Spending</SelectItem>
                <SelectItem value="age-spending">Age vs Spending</SelectItem>
                <SelectItem value="age-income">Age vs Income</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="scatter" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="scatter">Scatter Plot</TabsTrigger>
            <TabsTrigger value="distribution">Distribution</TabsTrigger>
            <TabsTrigger value="demographics">Demographics</TabsTrigger>
            <TabsTrigger value="clusters">Cluster Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="scatter" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Customer Segmentation Scatter Plot</CardTitle>
                <CardDescription>
                  Interactive visualization showing customer clusters based on {viewMode.replace("-", " and ")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart data={filteredData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey={
                          viewMode === "income-spending" ? "income" : viewMode === "age-spending" ? "age" : "age"
                        }
                        name={viewMode === "income-spending" ? "Income" : "Age"}
                        unit={viewMode === "income-spending" ? "K" : ""}
                      />
                      <YAxis
                        dataKey={
                          viewMode === "income-spending"
                            ? "spendingScore"
                            : viewMode === "age-spending"
                              ? "spendingScore"
                              : "income"
                        }
                        name={
                          viewMode === "income-spending"
                            ? "Spending Score"
                            : viewMode === "age-spending"
                              ? "Spending Score"
                              : "Income"
                        }
                        unit={viewMode === "age-income" ? "K" : ""}
                      />
                      <Tooltip
                        formatter={(value, name) => [value, name]}
                        labelFormatter={(label) => `Customer ID: ${label}`}
                      />
                      {[0, 1, 2].map((cluster) => (
                        <Scatter
                          key={cluster}
                          name={clusterNames[cluster]}
                          data={filteredData.filter((d) => d.cluster === cluster)}
                          fill={clusterColors[cluster]}
                        />
                      ))}
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-wrap gap-4 mt-4">
                  {Object.entries(clusterNames).map(([cluster, name]) => (
                    <div key={cluster} className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: clusterColors[cluster] }} />
                      <span className="text-sm">{name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {customerData.filter((d) => d.cluster === Number.parseInt(cluster)).length}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="distribution" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Cluster Distribution</CardTitle>
                  <CardDescription>Number of customers in each segment</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={clusterDistribution}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}`}
                        >
                          {clusterDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Age Distribution</CardTitle>
                  <CardDescription>Customer count by age groups</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={ageDistribution}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="ageGroup" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="hsl(var(--primary))" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="demographics" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              {Object.entries(clusterNames).map(([cluster, name]) => {
                const clusterData = customerData.filter((d) => d.cluster === Number.parseInt(cluster))
                const avgAge = Math.round(clusterData.reduce((sum, d) => sum + d.age, 0) / clusterData.length)
                const avgIncome = Math.round(clusterData.reduce((sum, d) => sum + d.income, 0) / clusterData.length)
                const avgSpending = Math.round(
                  clusterData.reduce((sum, d) => sum + d.spendingScore, 0) / clusterData.length,
                )

                return (
                  <Card key={cluster}>
                    <CardHeader>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: clusterColors[cluster] }} />
                        <CardTitle className="font-serif text-lg">{name}</CardTitle>
                      </div>
                      <CardDescription>{clusterData.length} customers</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Average Age</div>
                        <div className="text-2xl font-bold">{avgAge}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Average Income</div>
                        <div className="text-2xl font-bold">${avgIncome}K</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Average Spending Score</div>
                        <div className="text-2xl font-bold">{avgSpending}/100</div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="clusters" className="space-y-6">
            <div className="grid gap-6">
              {Object.entries(clusterNames).map(([cluster, name]) => {
                const clusterData = customerData.filter((d) => d.cluster === Number.parseInt(cluster))

                return (
                  <Card key={cluster}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: clusterColors[cluster] }} />
                          <CardTitle className="font-serif">{name}</CardTitle>
                          <Badge variant="secondary">{clusterData.length} customers</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                          <ScatterChart data={clusterData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="income" name="Income" unit="K" />
                            <YAxis dataKey="spendingScore" name="Spending Score" />
                            <Tooltip />
                            <Scatter data={clusterData} fill={clusterColors[cluster]} />
                          </ScatterChart>
                        </ResponsiveContainer>
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
