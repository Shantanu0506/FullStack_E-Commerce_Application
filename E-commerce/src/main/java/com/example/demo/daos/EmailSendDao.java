package com.example.demo.daos;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.example.demo.services.EmailService;

@Service
public class EmailSendDao implements EmailService {

	@Autowired
	private JavaMailSender mailsender;
	
	@Value("${spring.mail.username}")
	private String sender;

	@Override
	public void sendEmail(String to, String subject, String message) {
		SimpleMailMessage mailmsg = new SimpleMailMessage();
		mailmsg.setFrom(sender);
		mailmsg.setTo(to);
		mailmsg.setSubject(subject);
		mailmsg.setText(message);
		mailsender.send(mailmsg);
	}
	
}
