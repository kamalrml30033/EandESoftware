package com.ee.software.service;

import com.ee.software.dto.AuthResponse;
import com.ee.software.dto.LoginRequest;
import com.ee.software.dto.RegisterRequest;
import com.ee.software.entity.User;
import com.ee.software.repository.UserRepository;
import com.ee.software.security.JwtTokenProvider;
import com.ee.software.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;
    private final AuthenticationManager authenticationManager;

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already registered");
        }
        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .fullName(request.getFullName())
                .build();
        user.getRoles().add("USER");
        if (request.isAdmin()) {
            user.getRoles().add("ADMIN");
        }
        user = userRepository.save(user);
        String token = tokenProvider.generateToken(
                new UsernamePasswordAuthenticationToken(
                        new UserPrincipal(user), null, new UserPrincipal(user).getAuthorities()));
        return AuthResponse.builder()
                .token(token)
                .email(user.getEmail())
                .id(user.getId())
                .roles(user.getRoles().stream().collect(Collectors.toList()))
                .build();
    }

    public AuthResponse login(LoginRequest request) {
        var auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        UserPrincipal principal = (UserPrincipal) auth.getPrincipal();
        String token = tokenProvider.generateToken(auth);
        return AuthResponse.builder()
                .token(token)
                .email(principal.getEmail())
                .id(principal.getId())
                .roles(principal.getAuthorities().stream()
                        .map(a -> a.getAuthority().replace("ROLE_", ""))
                        .collect(Collectors.toList()))
                .build();
    }
}
