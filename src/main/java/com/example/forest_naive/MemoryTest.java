package com.example.forest_naive;

import com.example.forest_naive.model.TreeNaive;
import com.example.forest_naive.service.ForestService;

import java.util.List;

public class MemoryTest {
    public static void main(String[] args) {
        ForestService forest = new ForestService();

        // Вимірюємо пам'ять до ініціалізації
        Runtime rt = Runtime.getRuntime();
        rt.gc();
        long before = rt.totalMemory() - rt.freeMemory();

        // Створюємо дерева
        forest.init();
        List<TreeNaive> trees = forest.getAllNaive();

        // Вимірюємо пам'ять після
        rt.gc();
        long after = rt.totalMemory() - rt.freeMemory();

        long usedBytes = after - before;
        System.out.printf("MemoryTest -> Trees: %d, used = %,d bytes (≈ %.2f KB)%n",
                trees.size(), usedBytes, usedBytes / 1024.0);
    }
}