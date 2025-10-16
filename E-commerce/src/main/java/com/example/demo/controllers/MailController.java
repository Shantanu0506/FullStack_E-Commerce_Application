package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.EmailRequest;
import com.example.demo.services.EmailService;

@RestController
public class MailController {

	@Autowired
	EmailService eser;
	
	@PostMapping("/send")
	public String sendMail(@RequestBody EmailRequest e) {
		eser.sendEmail(e.getTo(), e.getSubject(), e.getMessage());
		return "Done";
	}
}
