package com.example.forest_naive;

import com.example.forest_naive.model.Tree;
import com.example.forest_naive.service.ForestService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.context.ConfigurableApplicationContext;

@SpringBootApplication(exclude = DataSourceAutoConfiguration.class)
public class ForestNaiveApplication {
	public static void main(String[] args) {
		ConfigurableApplicationContext ctx = SpringApplication.run(ForestNaiveApplication.class, args);
		ForestService service = ctx.getBean(ForestService.class);

		int total = service.createTrees(10, Tree.TreeType.PINE);

		Runtime rt = Runtime.getRuntime();
		rt.gc();
		long before = rt.totalMemory() - rt.freeMemory();

		rt.gc();
		long after = rt.totalMemory() - rt.freeMemory();

		System.out.printf(
				"Demo added %,d trees, memory used = %,d bytes (≈ %.2f KB)%n",
				total,
				(after - before),
				(after - before) / 1024.0);
	}
}