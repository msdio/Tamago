package com.project.Tamago.common.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import com.project.Tamago.common.enums.AlarmLevel;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface SlackAlarm {

	AlarmLevel level() default AlarmLevel.ERROR;
}
