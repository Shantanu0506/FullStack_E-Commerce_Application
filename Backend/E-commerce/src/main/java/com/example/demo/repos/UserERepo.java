package com.example.demo.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.UserE;

@Repository
public interface UserERepo extends JpaRepository<UserE, Integer>  {

	UserE findByEmail(String email);
	

	
}
