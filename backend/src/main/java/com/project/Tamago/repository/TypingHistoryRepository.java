package com.project.Tamago.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project.Tamago.constants.enums.Mode;
import com.project.Tamago.domain.TypingHistory;
import com.project.Tamago.domain.User;

@Repository
public interface TypingHistoryRepository extends JpaRepository<TypingHistory, Long> {

	@Modifying
	@Query(value = "INSERT INTO TypingHistory(user_id, typing_id, wpm, accuracy, contentType, mode, startTime, endTime, beforeMmr, increasedValue) " +
		"VALUES (:userId, :typingId, :wpm, :accuracy, :contentType, :mode, :startTime, :endTime, :beforeMmr, :increasedValue)", nativeQuery = true)
	void saveTypingHistory(@Param("userId") Integer userId, @Param("typingId") Integer typingId, @Param("wpm") Integer wpm,
		@Param("accuracy") Double accuracy, @Param("contentType") Boolean contentType, @Param("mode") Mode mode,
		@Param("startTime") LocalDateTime startTime, @Param("endTime") LocalDateTime endTime,
		@Param("beforeMmr") Integer beforeMmr, @Param("increasedValue") Integer increasedValue);

	List<TypingHistory> findAllByUser(User user);
}
