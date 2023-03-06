package com.project.Tamago.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.Tamago.domain.PagePosition;

@Repository
public interface PagePositionRepository extends JpaRepository<PagePosition, Integer> {
}
