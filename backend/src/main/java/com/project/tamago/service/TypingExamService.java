package com.project.tamago.service;

import static com.project.tamago.common.Constant.*;
import static com.project.tamago.common.enums.Mode.*;
import static com.project.tamago.common.enums.ResponseCode.*;
import static com.project.tamago.common.enums.Score.*;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.tamago.common.enums.Language;
import com.project.tamago.common.exception.CustomException;
import com.project.tamago.domain.LongTyping;
import com.project.tamago.domain.Tier;
import com.project.tamago.domain.User;
import com.project.tamago.dto.ShortTypingDto;
import com.project.tamago.dto.mapper.DataMapper;
import com.project.tamago.dto.responseDto.LongTypingDetailResDto;
import com.project.tamago.dto.responseDto.ShortTypingListResDto;
import com.project.tamago.repository.LongTypingRepository;
import com.project.tamago.repository.TierRepository;
import com.project.tamago.repository.TypingRepository;
import com.project.tamago.repository.UserRepository;
import com.project.tamago.util.TypingUtil;

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
		return new ShortTypingListResDto(0, ACTUAL.toString(), shortTypings);
	}

	public void savePenalties(Integer userId, Language language) {
		Tier tier = tierRepository.findByUserIdAndLanguage(userId, language)
			.orElseThrow(() -> new CustomException(TIER_NOT_FOUND));
		tier.applyPenalty(PENALTY.getScore(), true);
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
		tier.applyPenalty(PENALTY.getScore(), false);
	}

	private void createNewTier(Integer userId, Language language) {
		User user = userRepository.findById(userId)
			.orElseThrow(() -> new CustomException(USERS_INFO_NOT_EXISTS));
		Tier newTier = Tier.builder()
			.user(user)
			.language(language)
			.build();
		tierRepository.save(newTier);
	}

}
