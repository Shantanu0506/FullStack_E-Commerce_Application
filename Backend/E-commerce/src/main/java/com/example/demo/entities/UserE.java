package com.example.demo.entities;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@EntityListeners(AuditingEntityListener.class)
public class UserE {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	
	private int id;
	@NotNull(message = "Username is must!")
	private String username;
	@Email(message = "Enter proper email! ")
	private String email;
	@Size(min=4, max=9, message = "Password length min=4, max=9")
	private String password;
	@Size(min=4, max=9,  message="Password length min=4, max=9")
	private String cfnpassword;
	
	@CreatedDate
	private LocalDateTime createdDate;
	@LastModifiedDate
	private LocalDateTime lastModifiedDate;
	
	@OneToMany(mappedBy = "user" , cascade = CascadeType.ALL)
	@JsonIgnore
	private List<Cart> CartItems =  new ArrayList<>();

	public UserE() {
		super();
		// TODO Auto-generated constructor stub
	}

	public UserE(int id, @NotNull(message = "Username is must!") String username,
			@Email(message = "Enter proper email! ") String email,
			@Size(min = 4, max = 9, message = "Password length min=4, max=9") String password,
			@Size(min = 4, max = 9, message = "Password length min=4, max=9") String cfnpassword,
			LocalDateTime createdDate, LocalDateTime lastModifiedDate, List<Cart> cartItems) {
		super();
		this.id = id;
		this.username = username;
		this.email = email;
		this.password = password;
		this.cfnpassword = cfnpassword;
		this.createdDate = createdDate;
		this.lastModifiedDate = lastModifiedDate;
		CartItems = cartItems;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getCfnpassword() {
		return cfnpassword;
	}

	public void setCfnpassword(String cfnpassword) {
		this.cfnpassword = cfnpassword;
	}

	public LocalDateTime getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(LocalDateTime createdDate) {
		this.createdDate = createdDate;
	}

	public LocalDateTime getLastModifiedDate() {
		return lastModifiedDate;
	}

	public void setLastModifiedDate(LocalDateTime lastModifiedDate) {
		this.lastModifiedDate = lastModifiedDate;
	}

	public List<Cart> getCartItems() {
		return CartItems;
	}

	public void setCartItems(List<Cart> cartItems) {
		CartItems = cartItems;
	}

	@Override
	public String toString() {
		return "UserE [id=" + id + ", username=" + username + ", email=" + email + ", password=" + password
				+ ", cfnpassword=" + cfnpassword + ", createdDate=" + createdDate + ", lastModifiedDate="
				+ lastModifiedDate + ", CartItems=" + CartItems + "]";
	}

	
	
	
	
	
	
}
