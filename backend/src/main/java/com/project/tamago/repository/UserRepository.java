package com.project.tamago.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.tamago.domain.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
	Optional<User> findByEmailAndProvider(String email, String provider);

	Boolean existsByEmailAndProvider(String email, String provider);

	Boolean existsByNickname(String nickname);

	Optional<User> findByNickname(String nickname);

}
