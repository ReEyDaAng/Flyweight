import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface MemoryChartProps {
  bytes1: number;
  bytes2: number;
}

export function MemoryChart({ bytes1, bytes2 }: MemoryChartProps) {
  const mb1 = bytes1 / (1024 * 1024);
  const mb2 = bytes2 / (1024 * 1024);

  const data = [
    {
      name: "Пам'ять БЕЗ паттерна",
      value: Number(mb1.toFixed(1)),
    },
    {
      name: "Пам'ять З паттерном",
      value: Number(mb2.toFixed(1)),
    },
  ];

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-md font-medium">Розподіл пам'яті</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 5,
              }}
            >
              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
              />
              <YAxis
                tickFormatter={(value) => `${value} MB`}
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            Memory
                          </span>
                          <span className="font-bold text-xs">
                            {payload[0].value} MB
                          </span>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="value" fill="#4ade80" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 grid grid-cols-2 gap-2 text-center text-sm">
          <div className="rounded-md bg-muted p-2">
            <span className="text-muted-foreground">Пам'ять БЕЗ паттерна</span>
            <p className="text-xs font-medium">{mb1.toFixed(1)} MB</p>
          </div>
          <div className="rounded-md bg-muted p-2">
            <span className="text-muted-foreground">Пам'ять З паттерном</span>
            <p className="text-xs font-medium">{mb2.toFixed(1)} MB</p>
          </div>
          <div className="col-span-2 rounded-md bg-muted p-2">
            <span className="text-muted-foreground">Різниця в пам'яті</span>
            <p className="text-xs font-medium">{(mb1 - mb2).toFixed(1)} MB</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
