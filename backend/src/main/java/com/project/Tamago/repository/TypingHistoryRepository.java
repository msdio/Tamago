package com.project.Tamago.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.Tamago.domain.TypingHistory;
import com.project.Tamago.domain.User;

@Repository
public interface TypingHistoryRepository extends JpaRepository<TypingHistory, Long> {

	List<TypingHistory> findAllByUser(User user);
	List<TypingHistory> findAllByUserAndCreatedDateIsAfter(User user, LocalDateTime localDateTime);
}
