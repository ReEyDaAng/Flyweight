package com.example.forest_naive.controller;

import com.example.forest_naive.model.TreeNaive;
import com.example.forest_naive.service.ForestService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
// Дозволяємо запити з React‑девсерверу
@CrossOrigin(origins = "http://localhost:3000")
public class ForestController {

    private final ForestService forestService;

    public ForestController(ForestService forestService) {
        this.forestService = forestService;
    }

    @GetMapping("/api/forest/naive")
    public List<TreeNaive> getNaiveForest() {
        return forestService.getAllNaive();
    }
}
