package com.example.forest_naive;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = DataSourceAutoConfiguration.class)
public class ForestNaiveApplication {
	public static void main(String[] args) {
		SpringApplication.run(ForestNaiveApplication.class, args);
	}
}