import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "@/components/ui/Chart";

interface MemoryChartProps {
  bytes: number;
  forestName: string;
}

export function MemoryChart({ bytes, forestName }: MemoryChartProps) {
  const totalMemory = bytes / (1024 * 1024);
  const memoryData = useMemo(() => {
    const baseMemory = 50;
    return Array.from({ length: 10 }, (_, i) => {
      const minutesAgo = 9 - i;
      const memory = Math.max(
        baseMemory,
        totalMemory - Math.random() * 5 * minutesAgo
      );
      return {
        time: `${minutesAgo} хв тому`,
        memory: memory.toFixed(1),
      };
    }).concat({
      time: "зараз",
      memory: totalMemory.toFixed(1),
    });
  }, [bytes, totalMemory]);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-md font-medium">
          Розподіл пам'яті - {forestName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[150px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={memoryData}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 5,
              }}
            >
              <XAxis
                dataKey="time"
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
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Час
                            </span>
                            <span className="font-bold text-xs">
                              {payload[0].payload.time}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Пам'ять
                            </span>
                            <span className="font-bold text-xs">
                              {payload[0].value} MB
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="memory"
                stroke="#6366f1"
                fill="url(#colorMemory)"
                strokeWidth={2}
              />
              <defs>
                <linearGradient id="colorMemory" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 grid grid-cols-3 gap-2 text-center text-sm">
          <div className="rounded-md bg-muted p-2">
            <span className="text-muted-foreground">Поточна</span>
            <p className="text-xs font-medium">
              {memoryData[memoryData.length - 1].memory} MB
            </p>
          </div>
          <div className="rounded-md bg-muted p-2">
            <span className="text-muted-foreground">Всього</span>
            <p className="text-xs font-medium">{bytes.toLocaleString()} Б</p>
          </div>
          <div className="rounded-md bg-muted p-2">
            <span className="text-muted-foreground">Всього (МБ)</span>
            <p className="text-xs font-medium">{totalMemory.toFixed(1)} МБ</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
