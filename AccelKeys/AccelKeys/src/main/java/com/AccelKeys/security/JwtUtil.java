package com.AccelKeys.security;

import com.AccelKeys.entity.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.Optional;

@Component
public class JwtUtil {

    final String SECRET = "my-super-secret-key-for-jwt-signing-256-bit";
    final long expirationTime = 86400000;  // 24 hrs
    private final Key signingKey = Keys.hmacShaKeyFor(SECRET.getBytes());

    public String generateToken(Optional<User> user){
        return Jwts.builder()
                .setSubject(user.get().getEmail())
                .claim("username", user.get().getUserName())
                .claim("id", user.get().getId())
                .claim("role", "USER") // hardcoded USER role
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
                .signWith(signingKey, SignatureAlgorithm.HS256) // use same key
                .compact();
    }

    public String extractUserName(String token){
        return Jwts.parserBuilder()
                .setSigningKey(signingKey) // same key used for validation
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public String extractRole(String token){
        return Jwts.parserBuilder()
                .setSigningKey(signingKey) // same key here too
                .build()
                .parseClaimsJws(token)
                .getBody()
                .get("role", String.class);
    }

    public Long extractUserId(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(signingKey)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .get("id", Long.class);
    }


    public boolean isTokenValid(String token, UserDetails userDetails){
        return extractUserName(token).equals(userDetails.getUsername());
    }
}
