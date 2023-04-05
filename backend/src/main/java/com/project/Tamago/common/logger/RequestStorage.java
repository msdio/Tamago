package com.project.Tamago.common.logger;

import org.springframework.context.annotation.Lazy;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Component;
import org.springframework.web.util.ContentCachingRequestWrapper;

@Component
@Scope(value = "request", proxyMode = ScopedProxyMode.TARGET_CLASS)
public class RequestStorage {

	private  ContentCachingRequestWrapper request;

	public void set(ContentCachingRequestWrapper request) {
		this.request = request;
	}

	public ContentCachingRequestWrapper get() {
		return request;
	}
}
