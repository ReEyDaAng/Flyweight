package com.example.forest_naive.controller;

import com.example.forest_naive.model.Tree;
import com.example.forest_naive.service.ForestService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/forest")
@CrossOrigin(origins = "http://localhost:3000")
public class ForestController {
    private final ForestService service;

    public ForestController(ForestService service) {
        this.service = service;
    }

    /**
     * POST /api/forest/createTreesBatch
     * Тіло запиту: JSON-об'єкт, де ключі — типи (PINE, PALM, OAK), значення — кількість.
     */
    @PostMapping("/createTreesBatch")
    public ResponseEntity<String> createTreesBatch(
            @RequestBody Map<Tree.TreeType, Integer> request) {
        int totalAdded = service.createTreesBatch(request);
        return ResponseEntity.ok("Added total " + totalAdded + " trees");
    }

    /**
     * DELETE /api/forest/removeTrees?count={count}
     * Видаляє останні count дерев.
     */
    @DeleteMapping("/removeTrees")
    public ResponseEntity<String> removeTrees(@RequestParam int count) {
        int removed = service.removeTrees(count);
        return ResponseEntity.ok("Removed " + removed + " trees");
    }

    /**
     * GET /api/forest/getTrees
     * Повертає список усіх дерев.
     */
    @GetMapping("/getTrees")
    public List<Tree> getTrees() {
        return service.getTrees();
    }
}