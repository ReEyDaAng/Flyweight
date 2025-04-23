import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { TreePine, Palmtree, TreeDeciduous } from "lucide-react";

interface TreeCounterProps {
  counts: {
    pine: number;
    palm: number;
    oak: number;
  };
  forestName: string;
}

export function TreeCounter({ counts, forestName }: TreeCounterProps) {
  const totalTrees = counts.pine + counts.palm + counts.oak;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-md font-medium">
          Кількість дерев - {forestName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center">
            <TreePine className="h-8 w-8 text-green-700 mb-1" />
            <span className="text-sm font-medium">{counts.pine}</span>
            <span className="text-xs text-muted-foreground">Сосна</span>
          </div>
          <div className="flex flex-col items-center">
            <Palmtree className="h-8 w-8 text-green-500 mb-1" />
            <span className="text-sm font-medium">{counts.palm}</span>
            <span className="text-xs text-muted-foreground">Пальма</span>
          </div>
          <div className="flex flex-col items-center">
            <TreeDeciduous className="h-8 w-8 text-green-600 mb-1" />
            <span className="text-sm font-medium">{counts.oak}</span>
            <span className="text-xs text-muted-foreground">Дуб</span>
          </div>
        </div>
        <div className="mt-4 text-center">
          <span className="text-sm font-medium">
            Всього дерев: {totalTrees}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
