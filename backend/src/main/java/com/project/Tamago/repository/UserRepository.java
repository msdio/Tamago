package com.project.Tamago.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.Tamago.domain.User;

public interface UserRepository extends JpaRepository<User, Integer> {
	Optional<User> findByEmailAndProvider(String email, String provider);

	Boolean existsByEmailAndProvider(String email, String provider);

	Boolean existsByNickname(String nickname);

}
