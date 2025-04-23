package com.example.forest_naive.model;

public class TreeNaive {
    private int x;
    private int y;
    private String type;
    private String color;
    private String texture;

    public TreeNaive(int x, int y, String type, String color, String texture) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.color = color;
        this.texture = texture;
    }

    // Геттери (JS–on‑friendly)
    public int getX() { return x; }
    public int getY() { return y; }
    public String getType() { return type; }
    public String getColor() { return color; }
    public String getTexture() { return texture; }
}
