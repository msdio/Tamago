package com.project.Tamago.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project.Tamago.domain.LongTyping;
import com.project.Tamago.domain.Typing;
import com.project.Tamago.domain.TypingHistory;
import com.project.Tamago.domain.User;
import com.project.Tamago.dto.AccuracyAverageByDateDto;
import com.project.Tamago.dto.WpmAverageByDateDto;

@Repository
public interface TypingHistoryRepository extends JpaRepository<TypingHistory, Integer> {
	List<TypingHistory> findByTyping(Typing typing);

	List<TypingHistory> findByLongTyping(LongTyping longTyping);

	List<TypingHistory> findAllByUser(User user);

	List<TypingHistory> findAllByUserAndCreatedDateIsAfter(User user, LocalDateTime localDateTime);

	@Query(
		value = "SELECT DATE(th.created_Date) as created_Date, " +
			"AVG(th.typing_Accuracy) as accuracy_Average " +
			"FROM Typing_History th " +
			"WHERE th.user_id = :user AND th.created_Date >= :startDay AND th.created_Date <= :endDay " +
			"GROUP BY DATE(th.created_Date) " +
			"ORDER BY th.created_Date", nativeQuery = true
	)
	List<AccuracyAverageByDateDto> findAccuracyAverageByUserId(@Param("user") long user,
		@Param("startDay") LocalDateTime startDay,
		@Param("endDay") LocalDateTime endDay);

	@Query(
		value = "SELECT DATE(th.created_Date) as created_Date, " +
			"AVG(th.wpm) as wpm_Average " +
			"FROM Typing_History th " +
			"WHERE th.user_id = :user AND th.created_Date >= :startDay AND th.created_Date <= :endDay " +
			"GROUP BY DATE(th.created_Date) " +
			"ORDER BY th.created_Date", nativeQuery = true
	)
	List<WpmAverageByDateDto> findWpmAverageByUserId(@Param("user") long user,
		@Param("startDay") LocalDateTime startDay,
		@Param("endDay") LocalDateTime endDay);

}
