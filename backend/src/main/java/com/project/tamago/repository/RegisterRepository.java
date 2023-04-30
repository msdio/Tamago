package com.project.tamago.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.tamago.domain.Register;

@Repository
public interface RegisterRepository extends JpaRepository<Register, Integer> {
}
