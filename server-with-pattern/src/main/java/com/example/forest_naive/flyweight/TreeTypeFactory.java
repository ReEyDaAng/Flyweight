package com.example.forest_naive.flyweight;

import java.util.HashMap;
import java.util.Map;

/**
 * Flyweight factory for TreeType objects.
 */
public class TreeTypeFactory {
    private static final Map<String, TreeType> treeTypeMap = new HashMap<>();

    public static TreeType getTreeType(String name, String color) {
        String key = name + "|" + color;
        TreeType type = treeTypeMap.get(key);
        if (type == null) {
            type = new TreeType(name, color);
            treeTypeMap.put(key, type);
            System.out.println("Creating new TreeType: " + key);
        }
        return type;
    }

    public static int getTotalTreeTypesCreated() {
        return treeTypeMap.size();
    }
}
