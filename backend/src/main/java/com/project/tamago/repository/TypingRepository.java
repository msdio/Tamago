package com.project.tamago.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.tamago.domain.Typing;

@Repository
public interface TypingRepository extends JpaRepository<Typing, Integer> {

	List<Typing> findByContentTypeIsFalseAndLanguageIs(String language);
}
