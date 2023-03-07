package com.project.Tamago.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.Tamago.domain.LongTyping;

@Repository
public interface LongTypingRepository extends JpaRepository<LongTyping, Integer> {
}
