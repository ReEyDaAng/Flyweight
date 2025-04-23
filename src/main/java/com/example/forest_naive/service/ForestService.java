package com.example.forest_naive.service;

import com.example.forest_naive.model.TreeNaive;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ForestService {
    private final List<TreeNaive> trees = new ArrayList<>();

    // Тепер init() викликаємо вручну, а не через @PostConstruct
    public void init() {
        for (int i = 0; i < 1000; i++) {
            trees.add(new TreeNaive(i, i, "Pine", "Green", "Rough"));
            trees.add(new TreeNaive(i+1, i, "Pine", "Yellow", "Rough"));
        }
    }

    public List<TreeNaive> getAllNaive() {
        return trees;
    }
}