package com.neggo.neggo.repositories;

import com.neggo.neggo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, Long> {
    @Query("SELECT t FROM User t WHERE t.email = ?1 AND t.password = ?2")
    User findByEmailAndPassword(String email, String password);
    @Query("select count(u)>0 from User u where u.email = :email")
    public boolean existsEmail(@Param("email") String email);
}
