package com.project.Tamago.service;

import static com.project.Tamago.common.Constant.*;
import static com.project.Tamago.common.enums.ResponseCode.*;
import static com.project.Tamago.common.enums.Score.*;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.Tamago.common.enums.Language;
import com.project.Tamago.common.exception.CustomException;
import com.project.Tamago.domain.LongTyping;
import com.project.Tamago.domain.Tier;
import com.project.Tamago.domain.User;
import com.project.Tamago.dto.ShortTypingDto;
import com.project.Tamago.dto.mapper.DataMapper;
import com.project.Tamago.dto.responseDto.LongTypingDetailResDto;
import com.project.Tamago.dto.responseDto.ShortTypingListResDto;
import com.project.Tamago.repository.LongTypingRepository;
import com.project.Tamago.repository.TierRepository;
import com.project.Tamago.repository.TypingRepository;
import com.project.Tamago.repository.UserRepository;
import com.project.Tamago.util.TypingUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class TypingExamService {

	private final LongTypingRepository longTypingRepository;
	private final TypingRepository typingRepository;
	private final TierRepository tierRepository;
	private final UserRepository userRepository;

	public LongTypingDetailResDto findLongExam(Integer userId, Language language) {
		modifyTier(userId, language);
		LongTyping longTyping = longTypingRepository.findRandomByLanguage(language.toString())
			.orElseThrow(() -> new CustomException(LONG_TYPING_INFO_NOT_EXISTS));
		return DataMapper.INSTANCE.LongTypingToLongTypingDetailResDto(longTyping,
			TypingUtil.getPageContent(longTyping.getContent()));
	}

	public ShortTypingListResDto findShortExam(Integer userId, Language language) {
		modifyTier(userId, language);
		List<ShortTypingDto> shortTypings = TypingUtil.getRandomShortTypings(
			typingRepository.findByContentTypeIsFalseAndLanguageIs(language.toString()), EXAM_SHORT_TYPING_SIZE);
		return new ShortTypingListResDto(0, "practice", shortTypings);
	}

	private void modifyTier(Integer userId, Language language) {
		Tier tier = tierRepository.findByUserIdAndLanguage(userId, language).orElse(null);
		if (tier != null) {
			modifyExistingTier(tier);
			return;
		}
		createNewTier(userId, language);
	}

	private void modifyExistingTier(Tier tier) {
		if (tier.getStatus()) {
			tier.initStatus();
			return;
		}
		tier.applyPenalty(PENALTY.getScore());
	}

	private void createNewTier(Integer userId, Language language) {
		User user = userRepository.findById(userId)
			.orElseThrow(() -> new CustomException(USERS_INFO_NOT_EXISTS));
		Tier newTier = Tier.builder()
			.user(user)
			.language(language)
			.level(1)
			.mmr(0)
			.build();
		tierRepository.save(newTier);
	}

}
