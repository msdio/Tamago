package com.project.tamago;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class TamagoApplication {

	public static void main(String[] args) {
		SpringApplication.run(TamagoApplication.class, args);
	}

}
