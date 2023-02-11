package com.project.Tamago.service;

import static com.project.Tamago.exception.exceptionHandler.ErrorCode.*;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

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

	private static final String PROVIDER_NONE = "none";
	private final UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		log.info("LOGIN");
		User user = userRepository.findByEmailAndProvider(email, PROVIDER_NONE)
			.orElseThrow(() -> new CustomException(USERS_EMPTY_USER_EMAIL));
		return PrincipalDetails.of(user);
	}

}