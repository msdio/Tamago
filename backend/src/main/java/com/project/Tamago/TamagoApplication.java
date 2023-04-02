package com.project.Tamago;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import com.project.Tamago.common.logger.RequestStorage;

@EnableJpaAuditing
@SpringBootApplication
public class TamagoApplication {

	public static void main(String[] args) {
		SpringApplication.run(TamagoApplication.class, args);
	}

}
