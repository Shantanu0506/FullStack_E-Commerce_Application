package com.example.demo.daos;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.repos.CartRepo;
import com.example.demo.services.CartSer;


@Service
public class CartDao implements CartSer{

	@Autowired
	CartRepo cartRepo;
	
	@Override
	@Transactional
	public void clearCartByUserId(int userId) {
		 cartRepo.deleteByUserId(userId);
		
	}

}
