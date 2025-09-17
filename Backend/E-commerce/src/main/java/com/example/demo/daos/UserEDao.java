package com.example.demo.daos;

import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.UserE;
import com.example.demo.repos.UserERepo;
import com.example.demo.services.UserESer;

@Service
public class UserEDao implements UserESer {

	@Autowired
	UserERepo urepo;
	
	

	@Override
	public void saveUserData(@Valid UserE u) {
		urepo.save(u);
		
	}

	//registerwala
	@Override
	public UserE ckUser(String email) {
		UserE u1 = urepo.findByEmail(email);
		return u1;
	}

	
	//Loginwala
	@Override
	public UserE get(String email) {
		UserE u = urepo.findByEmail(email);
		return u;
	}

}
