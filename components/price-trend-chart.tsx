"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface PriceTrendChartProps {
  data: Array<{
    date: string
    price: number
    lowestPrice: number
  }>
  title: string
}

export function PriceTrendChart({ data, title }: PriceTrendChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Price trends over the last 30 days</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            price: {
              label: "Current Price",
              color: "hsl(var(--chart-1))",
            },
            lowestPrice: {
              label: "Lowest Price",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis
                dataKey="date"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="price"
                strokeWidth={2}
                activeDot={{
                  r: 6,
                  style: { fill: "var(--chart-1)", opacity: 0.8 },
                }}
              />
              <Line
                type="monotone"
                dataKey="lowestPrice"
                strokeWidth={2}
                activeDot={{
                  r: 6,
                  style: { fill: "var(--chart-2)", opacity: 0.8 },
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

