package com.example.forest_naive.controller;

import com.example.forest_naive.flyweight.TreeType;
import com.example.forest_naive.flyweight.TreeTypeFactory;
import com.example.forest_naive.model.Tree;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

/**
 * REST controller demonstrating Flyweight with trees.
 */
@RestController
public class FlyweightController {

    @GetMapping("/flyweight-demo")
    public Map<String, Integer> getFlyweightDemo() {
        Tree.TreeType[] types = Tree.TreeType.values();
        int drawingsPerType = 200;
        Random rand = new Random();

        for (Tree.TreeType t : types) {
            String color;
            switch (t) {
                case PINE: color = "Green"; break;
                case OAK: color = "DarkGreen"; break;
                case PALM: color = "LightGreen"; break;
                default: color = "Unknown";
            }
            TreeType type = TreeTypeFactory.getTreeType(t.name(), color);
            for (int i = 0; i < drawingsPerType; i++) {
                int x = rand.nextInt(1000);
                int y = rand.nextInt(1000);
                type.draw(x, y);
            }
        }

        int totalTrees = Tree.TreeType.values().length * drawingsPerType;
        int uniqueTypes = TreeTypeFactory.getTotalTreeTypesCreated();

        Map<String, Integer> result = new HashMap<>();
        result.put("totalTreesDrawn", totalTrees);
        result.put("uniqueTreeTypesCreated", uniqueTypes);
        return result;
    }
}
