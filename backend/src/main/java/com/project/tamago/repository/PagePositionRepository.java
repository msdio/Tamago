package com.project.tamago.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project.tamago.domain.PagePosition;

@Repository
public interface PagePositionRepository extends JpaRepository<PagePosition, Integer> {
	@Query("select p.currentPage from PagePosition p where p.user.id = :userId and p.longTyping.id = :longTypingId")
	Optional<Integer> findCurrentPageByUserAndTypingId(@Param("userId") Integer userId, @Param("longTypingId") Integer longTypingId);
}
