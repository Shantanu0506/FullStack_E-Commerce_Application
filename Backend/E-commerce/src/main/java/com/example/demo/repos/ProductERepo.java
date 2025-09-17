package com.example.demo.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import com.example.demo.entities.ProductE;

@Repository
public interface ProductERepo extends JpaRepository<ProductE, Integer> {

	List<ProductE> findByCategory(String category);

	List<ProductE> findByPriceLessThan(double price);

	List<ProductE> findByPriceGreaterThan(double price);


	List<ProductE> findByTitleContainingIgnoreCase(String title);

}
