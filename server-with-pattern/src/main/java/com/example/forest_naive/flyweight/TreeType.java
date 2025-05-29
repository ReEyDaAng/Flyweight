package com.example.forest_naive.flyweight;

public class TreeType {
    private final String name;
    private final String color;

    public TreeType(String name, String color) {
        this.name = name;
        this.color = color;
    }

    public void draw(int x, int y) {
        System.out.println("Drawing a " + name + " tree with color " + color + " at (" + x + ", " + y + ")");
    }

    public String getName() { return name; }
    public String getColor() { return color; }
}
