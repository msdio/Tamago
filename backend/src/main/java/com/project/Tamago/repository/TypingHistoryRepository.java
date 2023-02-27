package com.project.Tamago.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.Tamago.domain.TypingHistory;

@Repository
public interface TypingHistoryRepository extends JpaRepository<TypingHistory, Long> {

}
