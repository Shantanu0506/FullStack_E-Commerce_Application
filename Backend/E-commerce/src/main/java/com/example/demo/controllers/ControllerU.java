package com.example.demo.controllers;

import java.util.Map;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Login;
import com.example.demo.entities.UserE;
import com.example.demo.services.UserESer;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class ControllerU {

	@Autowired
	UserESer uservice;

	@PostMapping("/save")
	public ResponseEntity<?> saveUser(@RequestBody @Valid UserE u) {
		UserE u1 = uservice.ckUser(u.getEmail());
		if(u1 !=null) {
			System.out.println("Already Present!");
			return new ResponseEntity<>("User Exist!", HttpStatus.OK);
		}
		else {
			if(u.getPassword().equals(u.getCfnpassword())) {
				System.out.println(u);
				uservice.saveUserData(u);
				return new ResponseEntity<>(u.getEmail(), HttpStatus.OK);
			}
			else {
				System.out.println("Enter password correctly");
				return new ResponseEntity<>("incorrect", HttpStatus.BAD_GATEWAY);
			}
		}
		
	}
	
	
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody Login request, HttpSession session) {
		UserE user = uservice.get(request.getEmail());
		
		if(user != null && user.getPassword().equals(request.getPassword())) {
			session.setAttribute("user", user.getEmail());
			return ResponseEntity.ok(user);

		} 
		else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Credential ");
		}
	}
	
	
	@GetMapping("/logout")
	public ResponseEntity<String> logout (HttpSession session) {
		session.invalidate();
		return ResponseEntity.ok("Logout Succes");
	}
	
}
