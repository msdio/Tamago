package com.project.Tamago.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.Tamago.domain.LongTyping;
import com.project.Tamago.domain.Typing;
import com.project.Tamago.domain.TypingHistory;
import com.project.Tamago.domain.User;

@Repository
public interface TypingHistoryRepository extends JpaRepository<TypingHistory, Integer> {
	List<TypingHistory> findByTyping(Typing typing);

	List<TypingHistory> findByLongTyping(LongTyping longTyping);

	List<TypingHistory> findAllByUser(User user);

	List<TypingHistory> findAllByUserAndCreatedDateIsAfter(User user, LocalDateTime localDateTime);

	// @Query(
	// 	"SELECT DATE(th.createdDate) as createdDate, " +
	// 		"AVG(th.typingAccuracy) as accuracyAverage " +
	// 		"FROM TypingHistory th " +
	// 		"WHERE th.user = :user AND th.createdDate >= :startDay AND th.createdDate <= :endDay " +
	// 		"GROUP BY DATE(th.createdDate) " +
	// 		"ORDER BY th.createdDate"
	// )
	// List<AccuracyAverageByDateDto> findAccuracyAverageByUserId(@Param("user") User user,
	// 	@Param("startDay") LocalDate startDay,
	// 	@Param("endDay") LocalDate endDay);
	//
	// @Query(
	// 	"SELECT DATE(th.createdDate) as createdDate, " +
	// 		"AVG(th.wpm) as wpmAverage " +
	// 		"FROM TypingHistory th " +
	// 		"WHERE th.user = :user AND th.createdDate >= :startDay AND th.createdDate <= :endDay " +
	// 		"GROUP BY DATE(th.createdDate) " +
	// 		"ORDER BY th.createdDate"
	// )
	// List<WpmAverageByDateDto> findWpmAverageByUserId(@Param("user") User user,
	// 	@Param("startDay") LocalDate startDay,
	// 	@Param("endDay") LocalDate endDay);

}
