package com.example.forest_naive.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "trees_with_pattern")
public class Tree {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Enumerated(EnumType.STRING)
  private TreeType type;
  private int x;
  private int y;

  public enum TreeType {
    PINE, OAK, PALM
  }
}