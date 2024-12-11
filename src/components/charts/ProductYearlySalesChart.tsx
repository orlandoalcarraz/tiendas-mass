"use client"

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
  } from "@/components/ui/chart"

const chartData = [
    { mes: "Enero", ventas: Math.floor(Math.random() * 100)  },
    { mes: "Febrero", ventas: Math.floor(Math.random() * 100)  },
    { mes: "Marzo", ventas: Math.floor(Math.random() * 100)  },
    { mes: "Abril", ventas: Math.floor(Math.random() * 100)  },
    { mes: "Mayo", ventas: Math.floor(Math.random() * 100)  },
    { mes: "Junio", ventas: Math.floor(Math.random() * 100)  },
    { mes: "Julio", ventas: Math.floor(Math.random() * 100)  },
    { mes: "Agosto", ventas: Math.floor(Math.random() * 100)  },
    { mes: "Setiembre", ventas: Math.floor(Math.random() * 100)  },
    { mes: "Octubre", ventas: Math.floor(Math.random() * 100)  },
    { mes: "Noviembre", ventas: Math.floor(Math.random() * 100)  },
    { mes: "Diciembre", ventas: Math.floor(Math.random() * 100)  },

  ]

  const chartConfig = {
    label: {
      color: "rgb(0,0,0)",
    },
  } satisfies ChartConfig
  

export default function ProductYearlySalesChart() {
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
              dataKey="ventas"
              type="natural"
              fill="hsl(var(--chart-3))"
              fillOpacity={0.5}
              stroke="hsl(var(--chart-3))"
            />
          </AreaChart>
        </ChartContainer>
    </div>
  );
}