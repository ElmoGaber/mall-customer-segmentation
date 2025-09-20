import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Users, TrendingUp, Target, Database, Brain } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <BarChart3 className="h-6 w-6 text-primary" />
            <span className="font-serif font-bold text-xl">Mall Analytics</span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <a href="#overview" className="text-sm font-medium hover:text-primary transition-colors">
              Overview
            </a>
            <a href="#models" className="text-sm font-medium hover:text-primary transition-colors">
              Models
            </a>
            <a href="#visualization" className="text-sm font-medium hover:text-primary transition-colors">
              Visualization
            </a>
            <a href="#performance" className="text-sm font-medium hover:text-primary transition-colors">
              Performance
            </a>
          </div>
          <Button>Get Started</Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container max-w-6xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            Machine Learning • Data Science • Customer Analytics
          </Badge>
          <h1 className="font-serif font-black text-4xl md:text-6xl lg:text-7xl mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Mall Customer Segmentation
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Advanced clustering algorithms to segment mall customers with comprehensive model performance analysis and
            interactive data visualization.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8" asChild>
              <Link href="/dashboard">Explore Models</Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
              View Documentation
            </Button>
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section id="overview" className="py-16 px-4 bg-muted/30">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif font-bold text-3xl md:text-4xl mb-4">Comprehensive ML Analysis</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Multiple clustering algorithms evaluated and compared for optimal customer segmentation insights.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="font-serif">Customer Segmentation</CardTitle>
                <CardDescription>
                  Advanced clustering techniques to identify distinct customer groups based on purchasing behavior and
                  demographics.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-accent" />
                </div>
                <CardTitle className="font-serif">Multiple Algorithms</CardTitle>
                <CardDescription>
                  K-Means, Hierarchical, DBSCAN, and Gaussian Mixture Models compared for optimal performance and
                  accuracy.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-chart-1/10 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-chart-1" />
                </div>
                <CardTitle className="font-serif">Performance Metrics</CardTitle>
                <CardDescription>
                  Comprehensive evaluation using silhouette score, inertia, and cluster validation metrics.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-chart-2/10 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-chart-2" />
                </div>
                <CardTitle className="font-serif">Interactive Visualization</CardTitle>
                <CardDescription>
                  Dynamic charts and plots to explore customer segments and model performance in real-time.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-chart-3/10 rounded-lg flex items-center justify-center mb-4">
                  <Database className="h-6 w-6 text-chart-3" />
                </div>
                <CardTitle className="font-serif">Data Analysis</CardTitle>
                <CardDescription>
                  Comprehensive analysis of customer spending patterns, age demographics, and income distributions.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-chart-4/10 rounded-lg flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-chart-4" />
                </div>
                <CardTitle className="font-serif">Business Insights</CardTitle>
                <CardDescription>
                  Actionable insights for targeted marketing strategies and customer relationship management.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="font-serif font-bold text-3xl md:text-4xl mb-6">Ready to Explore Customer Segments?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Dive into the interactive dashboard to explore clustering results, compare model performance, and discover
            actionable business insights.
          </p>
          <Button size="lg" className="text-lg px-8" asChild>
            <Link href="/dashboard">Launch Dashboard</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <BarChart3 className="h-5 w-5 text-primary" />
              <span className="font-serif font-bold">Mall Analytics</span>
            </div>
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">
                Documentation
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                GitHub
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Contact
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>© 2024 Mall Customer Segmentation Analysis. Built with advanced machine learning techniques.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
