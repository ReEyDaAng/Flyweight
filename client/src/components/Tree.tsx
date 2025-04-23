import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { TreePine, Palmtree, TreeDeciduous } from "lucide-react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/ContextMenu";

export type TreeType = "pine" | "palm" | "oak";

interface TreeProps {
  id: string;
  x: number;
  y: number;
  type: TreeType;
  onDelete: () => void;
}

export function Tree({ id, x, y, type, onDelete }: TreeProps) {
  const [size, setSize] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const maxSize = useRef(Math.random() * 20 + 30); // Random size between 30-50

  useEffect(() => {
    // Grow the tree
    const growInterval = setInterval(() => {
      setSize((prevSize) => {
        if (prevSize < maxSize.current) {
          return prevSize + 1;
        }
        clearInterval(growInterval);
        return prevSize;
      });
    }, 50);

    return () => clearInterval(growInterval);
  }, []);

  const handleDelete = () => {
    // Shrink animation before removal
    setSize(0);

    // Remove from DOM after animation completes
    setTimeout(() => {
      setIsVisible(false);
      onDelete();
    }, 500);
  };

  if (!isVisible) return null;

  const TreeComponent = () => {
    switch (type) {
      case "pine":
        return (
          <TreePine
            className="text-green-700"
            size={maxSize.current}
            strokeWidth={1.5}
          />
        );
      case "palm":
        return (
          <Palmtree
            className="text-green-500"
            size={maxSize.current}
            strokeWidth={1.5}
          />
        );
      case "oak":
        return (
          <TreeDeciduous
            className="text-green-600"
            size={maxSize.current}
            strokeWidth={1.5}
          />
        );
      default:
        return (
          <TreePine
            className="text-green-700"
            size={maxSize.current}
            strokeWidth={1.5}
          />
        );
    }
  };

  const getTrunkColor = () => {
    switch (type) {
      case "pine":
        return "#5D4037";
      case "palm":
        return "#8D6E63";
      case "oak":
        return "#795548";
      default:
        return "#8B4513";
    }
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <motion.div
          className="absolute cursor-pointer"
          style={{
            left: `${x}%`,
            top: `${y}%`,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: size / maxSize.current, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <TreeComponent />
          <motion.div
            className="rounded-sm absolute left-1/2 bottom-0 -translate-x-1/2"
            style={{
              backgroundColor: getTrunkColor(),
              height: maxSize.current * 0.3,
              width: maxSize.current * 0.15,
              bottom: -maxSize.current * 0.2,
            }}
          />
        </motion.div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={handleDelete} className="text-red-500">
          Видалити дерево
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
