package com.project.Tamago.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.Tamago.domain.PagePosition;
import com.project.Tamago.domain.Register;

@Repository
public interface RegisterRepository extends JpaRepository<Register, Integer> {
}
