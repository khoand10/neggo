package com.neggo.neggo.repositories;

import com.neggo.neggo.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface RoleRepository extends JpaRepository<Role, Long> {
    @Query("SELECT t FROM Role t WHERE t.role = ?1")
    Role findByRole(String role);
}
