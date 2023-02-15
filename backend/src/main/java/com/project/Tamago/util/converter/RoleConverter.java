package com.project.Tamago.util.converter;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

import com.project.Tamago.util.constants.Role;

@Converter
public class RoleConverter implements AttributeConverter<Role, String> {

	@Override
	public String convertToDatabaseColumn(Role attribute) {
		return attribute.getType();
	}

	@Override
	public Role convertToEntityAttribute(String dbData) {
		return Role.ofType(dbData);
	}
}
