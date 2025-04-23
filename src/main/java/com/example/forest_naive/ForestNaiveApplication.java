package com.example.forest_naive;

import com.example.forest_naive.service.ForestService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.context.ConfigurableApplicationContext;

@SpringBootApplication(
		exclude = DataSourceAutoConfiguration.class
)
public class ForestNaiveApplication {
	public static void main(String[] args) {
		// 1. Запускаємо Spring-контекст
		ConfigurableApplicationContext ctx = SpringApplication.run(ForestNaiveApplication.class, args);
		ForestService service = ctx.getBean(ForestService.class);

		// 2. Заміряємо пам'ять до ініціалізації
		Runtime rt = Runtime.getRuntime();
		rt.gc();
		long before = rt.totalMemory() - rt.freeMemory();

		// 3. Ініціалізуємо список дерев
		service.init();

		// 4. Заміряємо пам'ять після створення
		rt.gc();
		long after = rt.totalMemory() - rt.freeMemory();

		long usedBytes = after - before;
		System.out.printf("Trees: %d, memory used = %,d bytes (≈ %.2f KB)%n",
				service.getAllNaive().size(), usedBytes, usedBytes / 1024.0);
	}
}