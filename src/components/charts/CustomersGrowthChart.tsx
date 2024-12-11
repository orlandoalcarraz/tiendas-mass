"use client"

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
  } from "@/components/ui/chart"

const chartData = [
    { mes: "Enero", registrados: Math.floor(Math.random() * 100)  },
    { mes: "Febrero", registrados: Math.floor(Math.random() * 100)  },
    { mes: "Marzo", registrados: Math.floor(Math.random() * 100)  },
    { mes: "Abril", registrados: Math.floor(Math.random() * 100)  },
    { mes: "Mayo", registrados: Math.floor(Math.random() * 100)  },
    { mes: "Junio", registrados: Math.floor(Math.random() * 100)  },

  ]

  const chartConfig = {
    label: {
      color: "rgb(0,0,0)",
    },
  } satisfies ChartConfig
  

export default function CustomerGrowthChart() {
  return (
    <div className="aspect-auto h-[500px] w-full">
        <ChartContainer config={chartConfig} className='aspect-auto h-[500px] w-full'>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false}  />
            <XAxis
              dataKey="mes"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot"  />}
            />
            <Area
              dataKey="registrados"
              type="linear"
              fill="hsl(var(--chart-5))"
              fillOpacity={0.6}
              stroke="hsl(var(--chart-5))"
            />
          </AreaChart>
        </ChartContainer>
    </div>
  );
}