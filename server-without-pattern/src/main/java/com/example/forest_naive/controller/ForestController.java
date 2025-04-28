package com.example.forest_naive.controller;

import com.example.forest_naive.model.Tree;
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
@CrossOrigin(origins = "http://localhost:3000")
public class ForestController {
    private final ForestService service;

    public ForestController(ForestService service) {
        this.service = service;
    }

    /**
     * POST /api/forest/createTrees
     * тіло: JSON-об'єкт з полями type (TreeType) і count (int)
     * повертає:
     *   totalAdded – кількість доданих
     *   deltaBytes – скільки додалося пам’яті
     *   totalBytes – скільки зараз займає весь heap
     */
    @PostMapping("/createTrees")
    public ResponseEntity<Map<String, Object>> createTrees(@RequestBody Map<String, Object> request) {
        MemoryMXBean memBean = ManagementFactory.getMemoryMXBean();
        memBean.gc();
        MemoryUsage beforeUsage = memBean.getHeapMemoryUsage();
        long before = beforeUsage.getUsed();

        // Parse and validate input
        int count = ((Number) request.getOrDefault("count", 0)).intValue();
        Tree.TreeType type;
        try {
            type = Tree.TreeType.valueOf(request.get("type").toString());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", "Invalid tree type"));
        }

        int totalAdded = service.createTrees(count, type);

        memBean.gc();
        MemoryUsage afterUsage = memBean.getHeapMemoryUsage();
        long after = afterUsage.getUsed();
        long delta = after - before;
        if (delta < 0) delta = 0;

        return ResponseEntity.ok(Map.of(
                "totalAdded", totalAdded,
                "deltaBytes", delta,
                "totalBytes", after
        ));
    }

    @DeleteMapping("/removeTrees")
    public ResponseEntity<String> removeTrees(@RequestParam int count) {
        int removed = service.removeTrees(count);
        return ResponseEntity.ok("Removed " + removed + " trees");
    }

    @GetMapping("/getTrees")
    public List<Tree> getTrees() {
        return service.getTrees();
    }
}
