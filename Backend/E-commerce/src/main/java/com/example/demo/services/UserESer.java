package com.example.demo.services;

import javax.validation.Valid;

import com.example.demo.entities.UserE;

public interface UserESer {

	void saveUserData(@Valid UserE u);

	UserE ckUser(String email);

	UserE get(String email);

}
