package com.project.Tamago;

import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
@AutoConfigureMockMvc
class TamagoApplicationTests {

	@Autowired
	private MockMvc mockMvc;

	@Test
	void testTestMvc1() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.get("/test?str=1")
				.contentType(MediaType.APPLICATION_JSON)
			)
			.andExpect(status().isOk())
			.andExpect(content().string("Success"))
			.andDo(print());
	}


	// @Test
	// void testTestMvc2() throws Exception {
	// 	mockMvc.perform(MockMvcRequestBuilders.get("/test?str=user")
	// 			.contentType(MediaType.APPLICATION_JSON)
	// 		)
	// 		.andExpect(status().is4xxClientError())
	// 		.andExpect(jsonPath("$.status", notNullValue()))
	// 		.andExpect(jsonPath("$.description", notNullValue()))
	// 		.andDo(print());
	// }
	//
	// @Test
	// void testTestMvc3() throws Exception {
	// 	mockMvc.perform(MockMvcRequestBuilders.get("/test?str=error")
	// 			.contentType(MediaType.APPLICATION_JSON)
	// 		)
	// 		.andExpect(status().is5xxServerError())
	// 		.andExpect(jsonPath("$.status", notNullValue()))
	// 		.andExpect(jsonPath("$.description", notNullValue()))
	// 		.andDo(print());
	// }

}
