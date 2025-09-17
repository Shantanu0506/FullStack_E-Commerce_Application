package com.example.demo.entities;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Cart {

	@Id
	@GeneratedValue(strategy= GenerationType.AUTO)
	private int id;
	private int quantity;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "user_id")
	@JsonIgnore
	private UserE user;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "product_id")
	private ProductE product;

	public Cart() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Cart(int id, int quantity, UserE user, ProductE product) {
		super();
		this.id = id;
		this.quantity = quantity;
		this.user = user;
		this.product = product;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public UserE getUser() {
		return user;
	}

	public void setUser(UserE user) {
		this.user = user;
	}

	public ProductE getProduct() {
		return product;
	}

	public void setProduct(ProductE product) {
		this.product = product;
	}

	@Override
	public String toString() {
		return "Cart [id=" + id + ", quantity=" + quantity + ", user=" + user + ", product=" + product + "]";
	}
	
	
	
}
