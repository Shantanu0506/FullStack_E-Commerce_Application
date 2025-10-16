package com.example.demo.daos;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Cart;
import com.example.demo.entities.ProductE;
import com.example.demo.entities.UserE;
import com.example.demo.repos.CartRepo;
import com.example.demo.repos.ProductERepo;
import com.example.demo.repos.UserERepo;
import com.example.demo.services.ProductESer;

@Service
public class ProductEDaos implements ProductESer {

	@Autowired
	ProductERepo prepo;
	@Autowired
	UserERepo urepo;
	
	@Autowired 
	CartRepo crepo;
	
	

	
	@Override
	public ProductE saveItems(ProductE p) {
		return prepo.save(p);		
	}

	@Override
	public List<ProductE> getItems() {
		return (List<ProductE>) prepo.findAll();
	}


	@Override
	public List<ProductE> getProductEByCatogory(String cat) {
		return prepo.findByCategory(cat);
	}

	@Override
	public Optional<ProductE> getItemById(int id) {
		return prepo.findById(id);
	}

	@Override
	public void deleteItem(int id) {
		prepo.deleteById(id);		
	}

	@Override
	public List<ProductE> getAllpriceless(double price) {
		List<ProductE> li = (List<ProductE>) prepo.findByPriceLessThan(price);
		return li;
	}

	@Override
	public List<ProductE> getAllpricegreat(double price) {
		List<ProductE> li = (List<ProductE>) prepo.findByPriceGreaterThan(price);
		return li;
	}

	@Override
	public List<ProductE> getAllByName(String title) {
		List<ProductE> li = (List<ProductE>) prepo.findByTitleContainingIgnoreCase(title);
		return li;
	}

	@Override
	public void addCart(int uid, int pid, int q) {
		UserE user = urepo.findById(uid).orElseThrow();
		ProductE product = prepo.findById(pid).orElseThrow();
		
		Cart cartItem = new Cart();
		cartItem.setUser(user);
		cartItem.setProduct(product);
		cartItem.setQuantity(q);
		
		crepo.save(cartItem);
		
	}

	@Override
	public List<Cart> getAllc(int id) {
		List<Cart> c = crepo.findAllByUserId(id);
		return c;
		
	}

	@Override
	public void deleteCartItem(int id) {
		crepo.deleteById(id);
		
	}

	@Override
	public double getTotal(int id) {
		List<Cart> cartItems = crepo.findAllByUserId(id);
		return cartItems.stream().mapToDouble(item -> item.getProduct().getPrice() * item.getQuantity()).sum();
				
	}
	


}
