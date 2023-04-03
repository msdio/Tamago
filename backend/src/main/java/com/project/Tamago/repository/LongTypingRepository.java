package com.project.Tamago.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.project.Tamago.domain.LongTyping;

@Repository
public interface LongTypingRepository extends JpaRepository<LongTyping, Integer> {
	@Query(value = "SELECT * FROM long_typing ORDER BY RAND() LIMIT 1", nativeQuery = true)
	Optional<LongTyping> findRandom();
	Optional<LongTyping> findByIdAndTotalPageGreaterThanEqual(Integer typingId, Integer page);
}
