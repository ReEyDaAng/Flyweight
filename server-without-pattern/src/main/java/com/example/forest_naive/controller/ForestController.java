package com.example.forest_naive.controller;

import com.example.forest_naive.entity.Tree;
import com.example.forest_naive.service.ForestService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.lang.management.ManagementFactory;
import java.lang.management.MemoryMXBean;
import java.lang.management.MemoryUsage;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/forest")
@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:5173" })
public class ForestController {
    private final ForestService service;

    public ForestController(ForestService service) {
        this.service = service;
    }

    /**
     * POST /api/forest/createTrees
     * тіло: JSON-об'єкт з полями type (TreeType) і count (int)
     */
    @PostMapping("/createTrees")
    public ResponseEntity<Void> createTrees(@RequestBody Map<String, Object> request) {
        int count = ((Number) request.getOrDefault("count", 0)).intValue();
        String type = request.get("type").toString();
        service.createTrees(count, type);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/removeTrees")
    public ResponseEntity<String> removeTrees(@RequestParam int count) {
        int removed = service.removeTrees(count);
        return ResponseEntity.ok("Removed " + removed + " trees");
    }

    @GetMapping("/getTrees")
    public Map<String, Object> getTrees() {
        List<Tree> trees = service.getTrees();
        MemoryMXBean memBean = ManagementFactory.getMemoryMXBean();
        memBean.gc();
        MemoryUsage usage = memBean.getHeapMemoryUsage();
        long totalBytes = usage.getUsed();
        return Map.of(
                "trees", trees,
                "totalBytes", totalBytes);
    }
}
