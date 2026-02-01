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

// config for chart
const chartConfig = {
  visitors: {
    label: "Users",
  },
  students: {
    label: "Students",
    color: "var(--chart-1)",
  },
  tutors: {
    label: "Tutors",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function UserDistributionChart({
  students = 0,
  tutors = 0,
}: {
  students: number;
  tutors: number;
}) {
  const data = React.useMemo(
    () => [
      {
        browser: "students",
        visitors: students,
        fill: "var(--color-students)",
      },
      { browser: "tutors", visitors: tutors, fill: "var(--color-tutors)" },
    ],
    [students, tutors],
  );

  const totalVisitors = React.useMemo(() => {
    return data.reduce((acc, curr) => acc + curr.visitors, 0);
  }, [data]);

  return (
    <Card className="col-span-4 lg:col-span-1 flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>User Distribution</CardTitle>
        <CardDescription>Students vs Tutors</CardDescription>
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
              data={data}
              dataKey="visitors"
              nameKey="browser"
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
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground text-xs"
                        >
                          Total Users
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
