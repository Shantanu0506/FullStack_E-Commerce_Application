package com.example.demo.repos;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Cart;

@Repository
public interface CartRepo extends JpaRepository<Cart, Integer>  {

	List<Cart> findAllByUserId(int id);

	
	 @Modifying
	    @Transactional
	    @Query("DELETE FROM Cart c WHERE c.user.id = :userId")
	    void deleteByUserId(int userId);

}
