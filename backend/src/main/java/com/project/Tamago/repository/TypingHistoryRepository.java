package com.project.Tamago.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.Tamago.domain.LongTyping;
import com.project.Tamago.domain.Typing;
import com.project.Tamago.domain.TypingHistory;

@Repository
public interface TypingHistoryRepository extends JpaRepository<TypingHistory, Integer> {
	List<TypingHistory> findByTyping(Typing typing);
	List<TypingHistory> findByLongTyping(LongTyping longTyping);

}
