import type { ReactNode } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface StatCardProps {
  title: string
  value: string | number
  icon: ReactNode
  description?: string
  trend?: number
  trendLabel?: string
  className?: string
}

export default function StatCard({
  title,
  value,
  icon,
  description,
  trend,
  trendLabel,
  className,
}: StatCardProps) {
  const showTrend = trend !== undefined
  const isPositive = trend && trend > 0
  const isNegative = trend && trend < 0
  
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {showTrend && (
          <div className="flex items\
