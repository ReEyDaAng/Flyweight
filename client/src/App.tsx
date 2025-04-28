import "./App.css";
import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Tree } from "@/components/Tree";
import { MemoryChart } from "@/components/MemoryChart";
import { TreeCounter } from "@/components/TreeCounter";
import { TreePine, Palmtree, TreeDeciduous, TrashIcon } from "lucide-react";
import { TreeType } from "./lib/types";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { useForestQuery } from "./lib/useForestQuery";
import { useForestMutation } from "./lib/useForestMutation";

export interface TreeData {
  x: number;
  y: number;
  type: TreeType;
}

export default function App() {
  const [rightTrees, setRightTrees] = useState<TreeData[]>([]);

  const [leftCountToMutate, setLeftCountToMutate] = useState(1);
  const [rightCountToMutate, setRightCountToMutate] = useState(1);

  const { data: leftTrees, error } = useForestQuery();
  const { createMutation: createLeft, removeMutation: removeLeft } =
    useForestMutation();

  const getTreeCounts = (trees: TreeData[]) => {
    const pine = trees.filter((tree) => tree.type === TreeType.PINE).length;
    const palm = trees.filter((tree) => tree.type === TreeType.PALM).length;
    const oak = trees.filter((tree) => tree.type === TreeType.OAK).length;

    return { pine, palm, oak };
  };

  const leftTreeCounts = getTreeCounts(leftTrees?.trees || []);
  const rightTreeCounts = getTreeCounts(rightTrees);

  const plantTree = (side: "left" | "right", count: number, type: TreeType) => {
    if (side === "left") {
      createLeft.mutate({ count, type });
    } else {
      setRightTrees([...rightTrees, ...Array(count).fill({ type })]);
    }
  };

  if (error) return null;

  return (
    <main className="container mx-auto p-4 min-h-screen">
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Card className="flex-1 p-4 min-h-[500px] relative overflow-hidden">
          <h2 className="text-xl font-semibold">БЕЗ використання паттерна</h2>
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-2 items-center">
              <Label htmlFor="left-count" className="text-sm">
                Кількість:
              </Label>
              <Input
                id="left-count"
                type="number"
                min={1}
                value={leftCountToMutate}
                onChange={(e) => setLeftCountToMutate(Number(e.target.value))}
                className="border rounded px-2 py-1 w-20"
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() =>
                  plantTree("left", leftCountToMutate, TreeType.PINE)
                }
                size="sm"
                className="flex items-center gap-1"
              >
                <TreePine className="h-4 w-4" />
                <span>Сосна</span>
              </Button>
              <Button
                onClick={() =>
                  plantTree("left", leftCountToMutate, TreeType.PALM)
                }
                size="sm"
                className="flex items-center gap-1"
              >
                <Palmtree className="h-4 w-4" />
                <span>Пальма</span>
              </Button>
              <Button
                onClick={() =>
                  plantTree("left", leftCountToMutate, TreeType.OAK)
                }
                size="sm"
                className="flex items-center gap-1"
              >
                <TreeDeciduous className="h-4 w-4" />
                <span>Дуб</span>
              </Button>
              <Button
                variant="destructive"
                onClick={() => removeLeft.mutate(leftCountToMutate)}
                size="sm"
                className="flex items-center gap-1"
              >
                <TrashIcon />
                Видалити
              </Button>
            </div>
          </div>
          <div className="bg-green-50 rounded-md h-[400px] relative">
            {leftTrees?.trees.map((tree) => (
              <Tree
                key={tree.x + tree.y + tree.type}
                x={tree.x}
                y={tree.y}
                type={tree.type}
              />
            ))}
          </div>
        </Card>

        <Card className="flex-1 p-4 min-h-[500px] relative overflow-hidden">
          <h2 className="text-xl font-semibold">З використанням паттерну</h2>
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-2 items-center">
              <Label htmlFor="right-count" className="text-sm">
                Кількість:
              </Label>
              <input
                id="right-count"
                type="number"
                min={1}
                value={rightCountToMutate}
                onChange={(e) => setRightCountToMutate(Number(e.target.value))}
                className="border rounded px-2 py-1 w-20"
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() =>
                  plantTree("right", rightCountToMutate, TreeType.PINE)
                }
                size="sm"
                className="flex items-center gap-1"
              >
                <TreePine className="h-4 w-4" />
                <span>Сосна</span>
              </Button>
              <Button
                onClick={() =>
                  plantTree("right", rightCountToMutate, TreeType.PALM)
                }
                size="sm"
                className="flex items-center gap-1"
              >
                <Palmtree className="h-4 w-4" />
                <span>Пальма</span>
              </Button>
              <Button
                onClick={() =>
                  plantTree("right", rightCountToMutate, TreeType.OAK)
                }
                size="sm"
                className="flex items-center gap-1"
              >
                <TreeDeciduous className="h-4 w-4" />
                <span>Дуб</span>
              </Button>
              <Button
                variant="destructive"
                onClick={() => console.log(123)}
                size="sm"
                className="flex items-center gap-1"
              >
                <TrashIcon />
                Видалити
              </Button>
            </div>
          </div>
          <div className="bg-green-50 rounded-md h-[400px] relative">
            {rightTrees.map((tree) => (
              <Tree
                key={tree.x + tree.y + tree.type}
                x={tree.x}
                y={tree.y}
                type={tree.type}
              />
            ))}
          </div>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 space-y-4">
          <MemoryChart
            bytes={leftTrees?.totalBytes || 0}
            forestName="БЕЗ використання паттерна"
          />
          <TreeCounter
            counts={leftTreeCounts}
            forestName="БЕЗ використання паттерна"
          />
        </div>

        <div className="flex-1 space-y-4">
          <MemoryChart
            bytes={rightTrees.length}
            forestName="З використанням паттерну"
          />
          <TreeCounter
            counts={rightTreeCounts}
            forestName="З використанням паттерну"
          />
        </div>
      </div>
    </main>
  );
}
