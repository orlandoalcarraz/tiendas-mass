"use client";

import { use, useMemo } from "react";
import {
    CartesianGrid,
    Line,
    LineChart,
    XAxis,
    YAxis,
    ResponsiveContainer,
} from "recharts";

import { StockData } from "@/lib/get-stock-data";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useMediaQuery } from "@/hooks/useMediaQuery"

interface InteractiveStockChartProps {
    chartData: Promise<StockData[]>;
    ticker: string;
    showYAxis?: boolean
}

const chartConfig: ChartConfig = {
    ventas: {
        label: "Ventas",
        color: "hsl(var(--chart-4))"
    },
};

export function InteractiveStockChart({ chartData, showYAxis }: InteractiveStockChartProps) {
    const data = use(chartData);

    const formattedData = useMemo(
        () =>
            data
                .map((item) => ({
                    ...item,
                    dateTime: new Date(item.date).getTime(),
                }))
                .filter((item) => !isNaN(item.dateTime))
                .sort((a, b) => a.dateTime - b.dateTime),
        [data]
    );

    const minValue = useMemo(
        () =>
            Math.min(...formattedData.map((item) => Math.min(item.open, item.close))),
        [formattedData]
    );

    const maxValue = useMemo(
        () =>
            Math.max(...formattedData.map((item) => Math.max(item.open, item.close))),
        [formattedData]
    );

    return (

        <ChartContainer config={chartConfig} className="h-full w-full">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={formattedData}
                    margin={{
                        top: 0,
                        right: 0,
                        left: 10,
                        bottom: 0,
                    }}
                    
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="date"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        minTickGap={21}
                        tickFormatter={(value) => {
                            const date = new Date(value);
                            return date.toLocaleDateString("es", {
                                month: "short",
                                day: "numeric",
                            });
                        }}
                    />
                    {
                        showYAxis && (
                            <YAxis
                                domain={[minValue * 0.9, maxValue * 1.1]}
                                tickFormatter={(value) => `$${value.toFixed(2)}`}
                            />
                        )
                    }

                    <ChartTooltip
                        content={
                            <ChartTooltipContent
                                className="w-[150px]"
                                labelFormatter={(value) => {
                                    console.log(value)
                                    const date = new Date(value);
                                    return date.toLocaleDateString("es", {
                                        month: "short",
                                        day: "numeric",
                                    });
                                }}
                            />
                        }
                    />
                    <Line
                        type="monotone"
                        dataKey="ventas"
                        stroke={chartConfig.ventas.color}
                        strokeWidth={3}
                        dot={false}
                    />

                </LineChart>
            </ResponsiveContainer>
        </ChartContainer>

    );
}


export default function LinearChart({ chartData, ticker }: InteractiveStockChartProps) {

    const isMobile = useMediaQuery("(max-width: 768px)");
    const classNameChart = isMobile ?
        "absolute w-[85vh] h-[85vw] top-1/2 -translate-y-[50%] left-1/2 -translate-x-[55%] rotate-90"
        :
        "aspect-auto h-[500px] w-full "

    return (
        <>
            {isMobile ? (
                <Dialog>
                    <DialogTrigger className=" w-full bg-black dark:bg-primary dark:hover:bg-primary/80 hover:bg-black/80 py-2 px-4 rounded text-white dark:text-primary-foreground flex-center gap-2 duration-200 focus:ring ring-ring ring-offset-2">Ver Gráfica linear</DialogTrigger>
                    <DialogContent className="left-0 top-0 translate-x-0 translate-y-0  w-full max-w-[100vw] max-h-[100vh] h-full place-items-stretch border-none p-0">


                        <div className={classNameChart}>
                            <InteractiveStockChart ticker={ticker} chartData={chartData} showYAxis={false} />
                        </div>

                    </DialogContent>
                </Dialog>

            ) : (

                <div className={classNameChart}>
                    <InteractiveStockChart ticker={ticker} chartData={chartData} showYAxis />
                </div>

            )}
        </>
    );
}