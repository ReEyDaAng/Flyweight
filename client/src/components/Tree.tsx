import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { TreePine, Palmtree, TreeDeciduous } from "lucide-react";
import { TreeType } from "@/lib/types";

interface TreeProps {
  x: number;
  y: number;
  type: TreeType;
}

export function Tree({ x, y, type }: TreeProps) {
  const [size, setSize] = useState(0);
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

  const TreeComponent = () => {
    switch (type) {
      case TreeType.PINE:
        return (
          <TreePine
            className="text-green-700"
            size={maxSize.current}
            strokeWidth={1.5}
          />
        );
      case TreeType.PALM:
        return (
          <Palmtree
            className="text-green-500"
            size={maxSize.current}
            strokeWidth={1.5}
          />
        );
      case TreeType.OAK:
        return (
          <TreeDeciduous
            className="text-green-600"
            size={maxSize.current}
            strokeWidth={1.5}
          />
        );
      default:
        return null;
    }
  };

  const getTrunkColor = () => {
    switch (type) {
      case TreeType.PINE:
        return "#5D4037";
      case TreeType.PALM:
        return "#8D6E63";
      case TreeType.OAK:
        return "#795548";
      default:
        return "#8B4513";
    }
  };

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: size / maxSize.current }}
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        zIndex: 1,
        cursor: "pointer",
      }}
    >
      <svg width={maxSize.current} height={maxSize.current}>
        <rect
          x={maxSize.current / 2 - 3}
          y={maxSize.current - 15}
          width={6}
          height={15}
          fill={getTrunkColor()}
        />
      </svg>
      <TreeComponent />
    </motion.div>
  );
}
