package com.example.forest_naive.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "trees_without_pattern")
public class Tree {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String type;
  private int x;
  private int y;
}