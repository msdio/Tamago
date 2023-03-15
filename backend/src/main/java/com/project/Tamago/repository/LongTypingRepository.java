package com.project.Tamago.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.Tamago.domain.LongTyping;

@Repository
public interface LongTypingRepository extends JpaRepository<LongTyping, Integer> {
	Optional<LongTyping> findByIdAndTotalPageGreaterThanEqual(Integer typingId, Integer page);
}
