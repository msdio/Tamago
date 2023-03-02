package com.project.Tamago.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.Tamago.domain.LongTyping;
import com.project.Tamago.dto.mapper.DataMapper;
import com.project.Tamago.dto.responseDto.LongTypingResDto;
import com.project.Tamago.repository.LongTypingRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class LongTypingService {
	private final LongTypingRepository longTypingRepository;

	@Transactional(readOnly = true)
	public List<LongTypingResDto> findLongTypings() {
		List<LongTyping> longTypings = longTypingRepository.findAll();
		return longTypings.stream()
			.map(DataMapper.INSTANCE::LongTypingToLongTypingResDto)
			.collect(Collectors.toList());
	}
}
