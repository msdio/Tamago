package com.project.tamago.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.tamago.common.enums.Language;
import com.project.tamago.domain.Tier;

@Repository
public interface TierRepository extends JpaRepository<Tier, Integer> {
	boolean existsByUserIdAndLanguage(Integer userId, Language language);

	Optional<Tier> findByUserIdAndLanguage(Integer userId, Language language);
}
