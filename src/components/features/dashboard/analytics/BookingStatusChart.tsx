"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  count: {
    label: "Bookings",
  },
  confirmed: {
    label: "Confirmed",
    color: "var(--chart-1)",
  },
  pending: {
    label: "Pending",
    color: "var(--chart-2)",
  },
  completed: {
    label: "Completed",
    color: "var(--chart-3)",
  },
  cancelled: {
    label: "Cancelled",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig;

interface BookingStatusChartProps {
  data: { status: string; count: number }[];
}

export function BookingStatusChart({ data = [] }: BookingStatusChartProps) {
  const chartData = React.useMemo(() => {
    return data.map((item) => {
      const statusKey = item.status.toLowerCase();
      return {
        status: statusKey,
        count: item.count,
        fill: `var(--color-${statusKey})`,
      };
    });
  }, [data]);

  const totalBookings = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.count, 0);
  }, [chartData]);

  if (totalBookings === 0) {
    return (
      <Card className="col-span-4 lg:col-span-1 flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Booking Status</CardTitle>
          <CardDescription>Distribution by Status</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0 flex items-center justify-center min-h-[250px] text-muted-foreground">
          No bookings found
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="col-span-4 lg:col-span-1 flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Booking Status</CardTitle>
        <CardDescription>Distribution by Status</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="status"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalBookings.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground text-xs"
                        >
                          Total Bookings
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
