package com.AccelKeys.service;

import com.AccelKeys.dto.LoginRequest;
import com.AccelKeys.dto.RegisterRequest;
import com.AccelKeys.entity.User;
import com.AccelKeys.exception.EmailAlreadyExistsException;
import com.AccelKeys.repository.UserRepository;
import com.AccelKeys.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    UserRepository userRepo;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtUtil jwtUtil;

    public String register(RegisterRequest req) {
        if (userRepo.existsByEmail(req.getEmail())) {
            throw new EmailAlreadyExistsException("Email already registered");
        }//checking if email already exists then throw a exception

        User user = new User();
        user.setUser(req.getUserName());
        user.setEmail(req.getEmail());
        user.setPassword(passwordEncoder.encode(req.getPassword()));
        userRepo.save(user);
        return jwtUtil.generateToken(Optional.of(user));
    }

    public String login(LoginRequest loginRequest){
        Optional<User> user = userRepo.findByEmail(loginRequest.getEmail());
        if (user.isEmpty()) {
            throw new UsernameNotFoundException("User not found");
        }

        if (!passwordEncoder.matches(loginRequest.getPassword(), user.get().getPassword())) {
            throw new BadCredentialsException("Invalid password");
        }

        return jwtUtil.generateToken(user);
    }
}
