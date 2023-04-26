package com.project.Tamago.service;

import static com.project.Tamago.common.Constant.*;
import static com.project.Tamago.common.enums.ResponseCode.*;

import java.time.Duration;
import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.Tamago.domain.LongTyping;
import com.project.Tamago.domain.User;
import com.project.Tamago.dto.mapper.DataMapper;
import com.project.Tamago.dto.requestDto.LongTypingReqDto;
import com.project.Tamago.dto.responseDto.LongTypingDetailResDto;
import com.project.Tamago.dto.LongTypingDto;
import com.project.Tamago.common.exception.CustomException;
import com.project.Tamago.dto.responseDto.LongTypingResDto;
import com.project.Tamago.repository.LongTypingRepository;
import com.project.Tamago.repository.RegisterRepository;
import com.project.Tamago.repository.UserRepository;
import com.project.Tamago.util.TypingUtil;

import io.hypersistence.utils.hibernate.util.StringUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class LongTypingService {
	private final UserRepository userRepository;
	private final LongTypingRepository longTypingRepository;
	private final RegisterRepository registerRepository;
	private final RedisTemplate<String, Object> redisTemplate;

	@Transactional(readOnly = true)
	public LongTypingResDto findLongTypings(int page) {
		PageRequest pageRequest = PageRequest.of(page - 1, 20);
		Page<LongTyping> longTypingPage = longTypingRepository.findAll(pageRequest);
		List<LongTypingDto> longTypings = longTypingPage.stream()
			.map(DataMapper.INSTANCE::LongTypingToLongTypingResDto)
			.collect(Collectors.toList());
		int totalPage = longTypingPage.getTotalPages();

		return new LongTypingResDto(totalPage, longTypings);
	}

	public LongTypingDetailResDto findLongTypingDetail(String ip, Integer longTypingId, int page) {
		LongTyping longTyping = longTypingRepository.findByIdAndTotalPageGreaterThanEqual(longTypingId, page)
			.orElseThrow(() -> new CustomException(LONG_TYPING_INFO_NOT_EXISTS));
		modifyViewCount(ip, longTyping);
		return DataMapper.INSTANCE.LongTypingToLongTypingDetailResDto(longTyping,
			TypingUtil.getPageContent(longTyping.getContent(), page));
	}

	public void saveLongTyping(Integer userId, LongTypingReqDto longTypingReqDto) {
		User user = userRepository.findById(userId).orElseThrow(() -> new CustomException(USERS_INFO_NOT_EXISTS));
		LongTyping longTyping = DataMapper.INSTANCE.toLongTyping(longTypingReqDto);
		longTypingRepository.save(longTyping);
		registerRepository.save(
			DataMapper.INSTANCE.toRegister(longTyping, null, user));
	}

	private void modifyViewCount(String ip, LongTyping longTyping) {
		String viewCountKey = ip + "-" + longTyping.getId();
		String viewCountValue = (String)(redisTemplate.opsForValue().get(viewCountKey));
		if (StringUtils.isBlank(viewCountValue)) {
			longTyping.updateViewCount();
			redisTemplate.opsForValue().set(viewCountKey, "ON", Duration.ofDays(1));
		}
	}
}
