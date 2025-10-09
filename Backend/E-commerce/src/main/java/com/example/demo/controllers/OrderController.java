package com.example.demo.controllers;

import java.util.HashMap;
import java.util.Map;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

import org.apache.commons.codec.binary.Hex;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.services.CartSer;
import com.example.demo.services.EmailService;
import com.example.demo.services.UserESer;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;

@RestController
@RequestMapping("/order")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {

    @Autowired
    private EmailService emailService;

    @Autowired
    private UserESer userService;
    
    @Autowired
    private CartSer cartservice;
    
    

    @Value("${razorpay.key.id}")
    private String razorpayKeyId;

    @Value("${razorpay.key.secret}")
    private String razorpayKeySecret;

        
    @PostMapping("/create-razorpay-order")
    public ResponseEntity<?> createRazorpayOrder(@RequestParam double amount) {
        try {
            RazorpayClient client = new RazorpayClient(razorpayKeyId, razorpayKeySecret);

            JSONObject options = new JSONObject();
            options.put("amount", (int) (amount * 100)); // paise
            options.put("currency", "INR");
            options.put("payment_capture", 1);

            Order order = client.Orders.create(options);

            return ResponseEntity.ok(order.toString());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Order creation failed");
        }
    }

    @PostMapping("/verify-razorpay")
    public ResponseEntity<?> verifyPayment(@RequestBody Map<String, String> data) {
        try {
            String orderId = data.get("orderId");
            String paymentId = data.get("paymentId");
            String signature = data.get("signature");
            int userId = Integer.parseInt(data.get("userId"));
            double total = Double.parseDouble(data.get("amount"));
            String receiverEmail = data.get("email");

            String payload = orderId + "|" + paymentId;

            Mac mac = Mac.getInstance("HmacSHA256");
            SecretKeySpec secretKeySpec = new SecretKeySpec(razorpayKeySecret.getBytes(), "HmacSHA256");
            mac.init(secretKeySpec);
            byte[] hash = mac.doFinal(payload.getBytes());
            String generatedSignature = Hex.encodeHexString(hash);

            Map<String, Object> result = new HashMap<>();
            result.put("status", "success");
            result.put("message", "Payment verified & mail sent successfully!");

            String subject = "Payment Confirmation - E-commerce App";
            String message = "Hello,\n\n" +
                    "Your payment was successful! 🎉\n" +
                    "Order ID: " + orderId + "\n" +
                    "Payment ID: " + paymentId + "\n" +
                    "Amount Paid: ₹" + total + "\n\n" +
                    "Thank you for shopping with us.\n\n" +
                    "Regards,\nTeam E-commerce";

            emailService.sendEmail(receiverEmail, subject, message);

            return ResponseEntity.ok(result);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Verification error");
        }
    }
    
    @PostMapping("/clear-cart")
    public ResponseEntity<?> clearCart(@RequestParam int userId) {
        try {
            cartservice.clearCartByUserId(userId);
            return ResponseEntity.ok("Cart cleared successfully!");
        } catch(Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Failed to clear cart");
        }
    }

   
}
