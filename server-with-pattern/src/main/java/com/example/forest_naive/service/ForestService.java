package com.example.forest_naive.service;

import com.example.forest_naive.entity.Tree;
import com.example.forest_naive.repository.TreeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ForestService {
    private final TreeRepository treeRepository;

    public ForestService(TreeRepository treeRepository) {
        this.treeRepository = treeRepository;
    }

    /**
     * Створює count дерев заданого типу.
     */
    public int createTrees(int count, Tree.TreeType type) {
        for (int i = 0; i < count; i++) {
            int x = (int) (Math.random() * 101);
            int y = (int) (Math.random() * 101);
            Tree tree = new Tree();
            tree.setType(type);
            tree.setX(x);
            tree.setY(y);
            treeRepository.save(tree);
        }
        return count;
    }

    /**
     * Видаляє останні count дерев зі списку (за id, від найбільшого).
     */
    public int removeTrees(int count) {
        List<Tree> allTrees = treeRepository.findAll();
        allTrees.sort((a, b) -> Long.compare(b.getId(), a.getId()));
        int toRemove = Math.min(count, allTrees.size());
        for (int i = 0; i < toRemove; i++) {
            treeRepository.deleteById(allTrees.get(i).getId());
        }
        return toRemove;
    }

    /**
     * Повертає поточний список дерев.
     */
    public List<Tree> getTrees() {
        return treeRepository.findAll();
    }
}