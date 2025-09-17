package com.example.demo.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Cart;
import com.example.demo.entities.ProductE;
import com.example.demo.services.ProductESer;


@RestController
@RequestMapping("/product")
@CrossOrigin(origins = "http://localhost:3000")
public class ControllerE {

	@Autowired
	ProductESer pser;
	
	
	
	@PostMapping("/add")
	public ResponseEntity<?> saveItems(@RequestBody ProductE p){
		pser.saveItems(p);
		return new ResponseEntity<>("Product is saved!", HttpStatus.CREATED);
	}
	
	@GetMapping("/all")
	public ResponseEntity<?> getItems(){
		List<ProductE> li = pser.getItems();
		return new ResponseEntity<>(li, HttpStatus.OK);
	}
	@GetMapping("/{id}")
	public ResponseEntity<?> getItemById(@PathVariable int id){
		Optional<ProductE> li = pser.getItemById(id);
		return new ResponseEntity<>(li, HttpStatus.OK);
	}
	
	//filtering by pr9ice
	@GetMapping("/getAllpriceless")
	public ResponseEntity<?> getAllPriceLess(@RequestParam double price) {
		List<ProductE> li = pser. getAllpriceless(price);
		System.out.println(li);
		return new ResponseEntity<>(li, HttpStatus.OK);
	}
	
	@GetMapping("/getAllpricegreat")
	public ResponseEntity<?> getAllPriceGreat(@RequestParam double price) {
		List<ProductE> li = pser. getAllpricegreat(price);
		System.out.println(li);
		return new ResponseEntity<>(li, HttpStatus.OK);
	}
	
	//searching by title only
	@GetMapping("/search")
	public ResponseEntity<?> getBySearch(@RequestParam String title) {
	    List<ProductE> li = pser.getAllByName(title);
	    return new ResponseEntity<>(li, HttpStatus.OK);
	}
	
	
	//filterinh by category
	@GetMapping("/search/{category}")
	public ResponseEntity<?> getByKeyword(@PathVariable("category") String cat) {
	    List<ProductE> li = pser.getProductEByCatogory(cat);
	    return new ResponseEntity<>(li, HttpStatus.OK);
	}
	

	@DeleteMapping("/deletebyid/{id}")
	public ResponseEntity<?> deleteById(@PathVariable int id){
		pser.deleteItem(id);
		return new ResponseEntity<>("Item deleted Successfully!", HttpStatus.OK);
	}
	
	@PostMapping("/addtocart")
	public ResponseEntity<?> addToCartP(@RequestParam int uid,
			@RequestParam int pid,
			@RequestParam int q) {
		pser.addCart(uid, pid, q);
		return ResponseEntity.ok("Product is added to cart");
				
	}
	
	
	@GetMapping("/showcart")
	public List<Cart> getcData(@RequestParam int id){
		List<Cart> li = pser.getAllc(id);
		return li;
	}
	
	@GetMapping("/showTotal")
	public double getCartTotal(@RequestParam int id) {
		double total = pser.getTotal(id);
		return total;
	}
	
	@DeleteMapping("/cart/delete/{id}")
	public ResponseEntity<?> deleteCartItem(@PathVariable int id) {
	    try {
	        pser.deleteCartItem(id);   
	        return ResponseEntity.ok("Cart item deleted successfully!");
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                             .body("Error deleting cart item: " + e.getMessage());
	    }
	}

	

}
