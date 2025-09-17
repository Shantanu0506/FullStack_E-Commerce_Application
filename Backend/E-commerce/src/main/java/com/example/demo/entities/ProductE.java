package com.example.demo.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class ProductE {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	
	private int id;
	private String title;
	private String category;
	private String des;
	private String productUrl;
	private Double price;
	
	@OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
	@JsonIgnore
	private List<Cart> cartItems = new ArrayList<>();

	public ProductE() {
		super();
		// TODO Auto-generated constructor stub
	}

	public ProductE(int id, String title, String category, String des, String productUrl, Double price,
			List<Cart> cartItems) {
		super();
		this.id = id;
		this.title = title;
		this.category = category;
		this.des = des;
		this.productUrl = productUrl;
		this.price = price;
		this.cartItems = cartItems;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getDes() {
		return des;
	}

	public void setDes(String des) {
		this.des = des;
	}

	public String getProductUrl() {
		return productUrl;
	}

	public void setProductUrl(String productUrl) {
		this.productUrl = productUrl;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public List<Cart> getCartItems() {
		return cartItems;
	}

	public void setCartItems(List<Cart> cartItems) {
		this.cartItems = cartItems;
	}

	@Override
	public String toString() {
		return "ProductE [id=" + id + ", title=" + title + ", category=" + category + ", des=" + des + ", productUrl="
				+ productUrl + ", price=" + price + ", cartItems=" + cartItems + "]";
	}
	
	
	
	
}
