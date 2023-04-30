package com.project.tamago.common.logger;

import static com.project.tamago.common.Constant.*;
import static com.project.tamago.common.enums.AlarmLevel.*;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.stereotype.Component;

import com.project.tamago.common.annotation.SlackAlarm;
import com.project.tamago.common.enums.AlarmLevel;
import com.project.tamago.common.exception.CustomException;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Aspect
@Component
public class SlackAppender {
	private final RequestStorage requestStorage;
	private final SlackMessageGenerator slackMessageGenerator;
	private final TamagoSlack tamagoSlack;

	public SlackAppender(RequestStorage requestStorage, SlackMessageGenerator slackMessageGenerator,
		TamagoSlack tamagoSlack) {
		this.requestStorage = requestStorage;
		this.slackMessageGenerator = slackMessageGenerator;
		this.tamagoSlack = tamagoSlack;
	}

	public void appendExceptionToSlack(CustomException exception) {
		String message = slackMessageGenerator.generateSlackErrorMessage(requestStorage.get(), exception, ERROR);
		tamagoSlack.send(message);
	}


	@Before("@annotation(com.project.tamago.common.annotation.SlackAlarm)")
	public void appendExceptionToResponseBody(JoinPoint joinPoint) {
		Object[] args = joinPoint.getArgs();
		if (!validateHasOneArgument(args)) {
			return;
		}

		if (!validateIsException(args)) {
			return;
		}

		MethodSignature signature = (MethodSignature)joinPoint.getSignature();
		SlackAlarm slackAlarm = signature.getMethod().getAnnotation(SlackAlarm.class);
		AlarmLevel alarmLevel = slackAlarm.level();

		String message = slackMessageGenerator
			.generateSlackErrorMessage(requestStorage.get(), (Exception)args[0], alarmLevel);
		tamagoSlack.send(message);
	}

	private boolean validateIsException(Object[] args) {
		if (!(args[0] instanceof Exception)) {
			log.warn("[SlackAlarm] argument is not Exception");
			return false;
		}

		return true;
	}

	private boolean validateHasOneArgument(Object[] args) {
		if (args.length != 1) {
			log.warn(String
				.format(SLACK_ALARM_FORMAT, "ambiguous exceptions! require just only one Exception"));
			return false;
		}

		return true;
	}
}
