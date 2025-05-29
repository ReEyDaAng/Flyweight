package com.example.forest_naive.service;

import com.example.forest_naive.model.Tree;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.ArrayList;

@Service
public class ForestService {
    private final List<Tree> trees = new CopyOnWriteArrayList<>();

    /**
     * Створює count дерев заданого типу.
     */
    public int createTrees(int count, Tree.TreeType type) {
        for (int i = 0; i < count; i++) {
            int x = (int) (Math.random() * 101);
            int y = (int) (Math.random() * 101);
            trees.add(new Tree(x, y, type));
        }
        return count;
    }

    /**
     * Видаляє останні count дерев зі списку.
     */
    public int removeTrees(int count) {
        int available = trees.size();
        int toRemove = Math.min(count, available);
        for (int i = 0; i < toRemove; i++) {
            trees.remove(trees.size() - 1);
        }
        return toRemove;
    }

    /**
     * Повертає поточний список дерев.
     */
    public List<Tree> getTrees() {
        return new ArrayList<>(trees);
    }
}