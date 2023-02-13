package com.project.Tamago.service;

import static com.project.Tamago.exception.exceptionHandler.ErrorCode.*;
import static com.project.Tamago.util.constants.Constant.*;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.Tamago.domain.PrincipalDetails;
import com.project.Tamago.domain.User;
import com.project.Tamago.exception.CustomException;
import com.project.Tamago.repository.UserRepository;

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