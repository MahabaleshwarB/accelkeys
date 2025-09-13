package com.AccelKeys.controller;

import com.AccelKeys.security.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    JwtUtil jwtUtil;

    @GetMapping("/me")
    public Map<String, Object> getLoggedInUser(HttpServletRequest request,
                                               @AuthenticationPrincipal UserDetails user) {

        String authHeader = request.getHeader("Authorization");
        String token = authHeader != null && authHeader.startsWith("Bearer ")
                ? authHeader.substring(7) : null;

        Map<String, Object> response = new HashMap<>();

        if (token != null) {
            Long userId = jwtUtil.extractUserId(token);
            String email = jwtUtil.extractUserName(token); //  email from token
            response.put("id", userId);
            response.put("email", email);
        }

        return response;
    }


}
