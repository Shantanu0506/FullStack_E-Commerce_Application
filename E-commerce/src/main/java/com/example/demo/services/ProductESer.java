package com.example.demo.services;

import java.util.List;
import java.util.Optional;

import com.example.demo.entities.Cart;
import com.example.demo.entities.ProductE;

public interface ProductESer {

	ProductE saveItems(ProductE p);

	List<ProductE> getItems();

	List<ProductE> getProductEByCatogory(String cat);

	Optional<ProductE> getItemById(int id);

	void deleteItem(int id);

	List<ProductE> getAllpriceless(double price);

	List<ProductE> getAllpricegreat(double price);

	List<ProductE> getAllByName(String title);

	void addCart(int uid, int pid, int q);

	List<Cart> getAllc(int id);

	void deleteCartItem(int id);

	double getTotal(int id);


}
