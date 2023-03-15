package com.project.Tamago.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.Tamago.domain.StatisticsAll;
import com.project.Tamago.domain.User;

public interface StatisticAllRepository extends JpaRepository<StatisticsAll, Integer> {

	Optional<StatisticsAll> findByUser(User user);
}
