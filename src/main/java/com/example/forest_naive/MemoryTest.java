package com.example.forest_naive;

import com.example.forest_naive.model.Tree;
import com.example.forest_naive.service.ForestService;

import java.util.List;

public class MemoryTest {
    public static void main(String[] args) {
        ForestService service = new ForestService();
        int count = 1000;
        Tree.TreeType type = Tree.TreeType.PINE;

        Runtime rt = Runtime.getRuntime();
        rt.gc();
        long before = rt.totalMemory() - rt.freeMemory();

        service.createTrees(count, type);
        List<Tree> trees = service.getTrees();

        rt.gc();
        long after = rt.totalMemory() - rt.freeMemory();

        long used = after - before;
        System.out.printf("MemoryTest -> Created %,d %s trees, used = %,d bytes (≈ %.2f KB)%n",
                count, type, used, used/1024.0
        );
    }
}