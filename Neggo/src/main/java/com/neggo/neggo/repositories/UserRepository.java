package com.neggo.neggo.repositories;

import com.neggo.neggo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    @Query("SELECT u FROM User u WHERE u.email = :email and u.password = :password")
    User findUserByEmailAndPassword(
            @Param("email") String email,
            @Param("password") String password
    );
}
