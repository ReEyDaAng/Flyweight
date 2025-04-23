package com.example.forest_naive.model;

public class Tree {
    public enum TreeType { PINE, PALM, OAK }

    private final int x;
    private final int y;
    private final TreeType type;

    public Tree(int x, int y, TreeType type) {
        this.x = x;
        this.y = y;
        this.type = type;
    }

    public int getX() { return x; }
    public int getY() { return y; }
    public TreeType getType() { return type; }
}