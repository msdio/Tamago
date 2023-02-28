package com.project.Tamago.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.project.Tamago.domain.Typing;

@Repository
public interface TypingRepository extends JpaRepository<Typing, Integer> {

	@Query(value = "SELECT t FROM Typing t WHERE t.contentType = false ORDER BY RAND() LIMIT 30", nativeQuery = true)
	List<Typing> findShortTypingListLimit30();
}
