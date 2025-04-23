import "./App.css";
import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Tree, type TreeType } from "@/components/Tree";
import { MemoryChart } from "@/components/MemoryChart";
import { TreeCounter } from "@/components/TreeCounter";
import { v4 as uuidv4 } from "uuid";
import { TreePine, Palmtree, TreeDeciduous } from "lucide-react";

interface TreeData {
  id: string;
  x: number;
  y: number;
  type: TreeType;
}

export default function App() {
  const [leftTrees, setLeftTrees] = useState<TreeData[]>([]);
  const [rightTrees, setRightTrees] = useState<TreeData[]>([]);

  const getTreeCounts = (trees: TreeData[]) => {
    return {
      pine: trees.filter((tree) => tree.type === "pine").length,
      palm: trees.filter((tree) => tree.type === "palm").length,
      oak: trees.filter((tree) => tree.type === "oak").length,
    };
  };

  const leftTreeCounts = getTreeCounts(leftTrees);
  const rightTreeCounts = getTreeCounts(rightTrees);

  const plantTree = (side: "left" | "right", type: TreeType) => {
    const newTree = {
      id: uuidv4(),
      x: Math.random() * 80 + 10, // 10-90% of container width
      y: Math.random() * 70 + 15, // 15-85% of container height
      type,
    };

    if (side === "left") {
      setLeftTrees([...leftTrees, newTree]);
    } else {
      setRightTrees([...rightTrees, newTree]);
    }
  };

  const removeTree = (side: "left" | "right", id: string) => {
    if (side === "left") {
      setLeftTrees(leftTrees.filter((tree) => tree.id !== id));
    } else {
      setRightTrees(rightTrees.filter((tree) => tree.id !== id));
    }
  };

  return (
    <main className="container mx-auto p-4 min-h-screen">
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Card className="flex-1 p-4 min-h-[500px] relative overflow-hidden">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">БЕЗ використання паттерна</h2>
            <div className="flex gap-2">
              <Button
                onClick={() => plantTree("left", "pine")}
                size="sm"
                className="flex items-center gap-1"
              >
                <TreePine className="h-4 w-4" />
                <span>Сосна</span>
              </Button>
              <Button
                onClick={() => plantTree("left", "palm")}
                size="sm"
                className="flex items-center gap-1"
              >
                <Palmtree className="h-4 w-4" />
                <span>Пальма</span>
              </Button>
              <Button
                onClick={() => plantTree("left", "oak")}
                size="sm"
                className="flex items-center gap-1"
              >
                <TreeDeciduous className="h-4 w-4" />
                <span>Дуб</span>
              </Button>
            </div>
          </div>
          <div className="bg-green-50 rounded-md h-[400px] relative">
            {leftTrees.map((tree) => (
              <Tree
                key={tree.id}
                id={tree.id}
                x={tree.x}
                y={tree.y}
                type={tree.type}
                onDelete={() => removeTree("left", tree.id)}
              />
            ))}
          </div>
        </Card>

        <Card className="flex-1 p-4 min-h-[500px] relative overflow-hidden">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">З використанням паттерну</h2>
            <div className="flex gap-2">
              <Button
                onClick={() => plantTree("right", "pine")}
                size="sm"
                className="flex items-center gap-1"
              >
                <TreePine className="h-4 w-4" />
                <span>Сосна</span>
              </Button>
              <Button
                onClick={() => plantTree("right", "palm")}
                size="sm"
                className="flex items-center gap-1"
              >
                <Palmtree className="h-4 w-4" />
                <span>Пальма</span>
              </Button>
              <Button
                onClick={() => plantTree("right", "oak")}
                size="sm"
                className="flex items-center gap-1"
              >
                <TreeDeciduous className="h-4 w-4" />
                <span>Дуб</span>
              </Button>
            </div>
          </div>
          <div className="bg-green-50 rounded-md h-[400px] relative">
            {rightTrees.map((tree) => (
              <Tree
                key={tree.id}
                id={tree.id}
                x={tree.x}
                y={tree.y}
                type={tree.type}
                onDelete={() => removeTree("right", tree.id)}
              />
            ))}
          </div>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 space-y-4">
          <MemoryChart
            treeCount={leftTrees.length}
            forestName="БЕЗ використання паттерна"
          />
          <TreeCounter
            counts={leftTreeCounts}
            forestName="БЕЗ використання паттерна"
          />
        </div>

        <div className="flex-1 space-y-4">
          <MemoryChart
            treeCount={rightTrees.length}
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
