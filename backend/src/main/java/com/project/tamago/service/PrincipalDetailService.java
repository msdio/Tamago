package com.project.tamago.service;

import static com.project.tamago.common.Constant.*;
import static com.project.tamago.common.enums.ResponseCode.*;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.tamago.security.PrincipalDetails;
import com.project.tamago.domain.User;
import com.project.tamago.common.exception.CustomException;
import com.project.tamago.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class PrincipalDetailService implements UserDetailsService {
	private final UserRepository userRepository;

	@Override
	@Transactional
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		log.info("LOGIN");
		User user = userRepository.findByEmailAndProvider(email, PROVIDER_NONE)
			.orElseThrow(() -> new CustomException(USERS_EMPTY_USER_EMAIL));
		return PrincipalDetails.of(user);
	}

}