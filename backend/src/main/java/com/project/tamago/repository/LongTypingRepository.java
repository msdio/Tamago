package com.project.tamago.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project.tamago.domain.LongTyping;

@Repository
public interface LongTypingRepository extends JpaRepository<LongTyping, Integer> {
	@Query(value = "SELECT * FROM long_typing WHERE language = :language ORDER BY RAND() LIMIT 1", nativeQuery = true)
	Optional<LongTyping> findRandomByLanguage(@Param("language") String language);
	Optional<LongTyping> findByIdAndTotalPageGreaterThanEqual(Integer typingId, Integer page);
}
