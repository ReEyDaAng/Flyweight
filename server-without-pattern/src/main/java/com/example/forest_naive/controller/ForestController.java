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
     * POST /api/forest/createTreesBatch
     * тіло: JSON-мапа тип→кількість
     * повертає:
     *   totalAdded – кількість доданих
     *   deltaBytes – скільки додалося пам’яті
     *   totalBytes – скільки зараз займає весь heap
     */
    @PostMapping("/createTreesBatch")
    public ResponseEntity<Map<String, Object>> createTreesBatch(
            @RequestBody Map<Tree.TreeType, Integer> request
    ) {
        MemoryMXBean memBean = ManagementFactory.getMemoryMXBean();

        // 1. замір до
        memBean.gc();
        MemoryUsage beforeUsage = memBean.getHeapMemoryUsage();
        long before = beforeUsage.getUsed();

        // 2. batch-додавання (не очищає попередні)
        int totalAdded = service.createTreesBatch(request);

        // 3. замір після
        memBean.gc();
        MemoryUsage afterUsage = memBean.getHeapMemoryUsage();
        long after = afterUsage.getUsed();

        // 4. різниця (клап на нуль — не від’ємне)
        long delta = after - before;
        if (delta < 0) delta = 0;

        Map<String, Object> resp = Map.of(
                "totalAdded",  totalAdded,
                "deltaBytes",  delta,
                "totalBytes",  after,
                "totalKB",     after / 1024.0
        );
        return ResponseEntity.ok(resp);
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
