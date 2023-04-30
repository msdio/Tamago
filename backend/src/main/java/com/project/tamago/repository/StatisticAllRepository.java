package com.project.tamago.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.tamago.domain.StatisticsAll;
import com.project.tamago.domain.User;

@Repository
public interface StatisticAllRepository extends JpaRepository<StatisticsAll, Integer> {

	Optional<StatisticsAll> findByUser(User user);
}
