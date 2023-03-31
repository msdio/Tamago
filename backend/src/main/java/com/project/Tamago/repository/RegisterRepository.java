package com.project.Tamago.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.Tamago.domain.PagePosition;
import com.project.Tamago.domain.Register;

public interface RegisterRepository extends JpaRepository<Register, Integer> {
}
