package com.ee.software.config;

import com.ee.software.entity.Course;
import com.ee.software.entity.ServiceEntity;
import com.ee.software.repository.CourseRepository;
import com.ee.software.repository.ServiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class DataInitializer {

    private final CourseRepository courseRepository;
    private final ServiceRepository serviceRepository;

    @Bean
    public CommandLineRunner initData() {
        return args -> {
            if (courseRepository.count() == 0) {
                courseRepository.save(Course.builder()
                        .title("Java Fundamentals")
                        .description("Core Java programming and OOP.")
                        .durationHours(40)
                        .active(true)
                        .build());
                courseRepository.save(Course.builder()
                        .title("Spring Boot 3")
                        .description("Building REST APIs and microservices with Spring Boot.")
                        .durationHours(24)
                        .active(true)
                        .build());
                courseRepository.save(Course.builder()
                        .title("React and Vite")
                        .description("Modern frontend development with React and Vite.")
                        .durationHours(20)
                        .active(true)
                        .build());
            }
            if (serviceRepository.count() == 0) {
                serviceRepository.save(ServiceEntity.builder()
                        .name("Custom Web Development")
                        .description("Full-stack web applications tailored to your business.")
                        .price(5000.0)
                        .active(true)
                        .build());
                serviceRepository.save(ServiceEntity.builder()
                        .name("API Development")
                        .description("REST and integration services.")
                        .price(3500.0)
                        .active(true)
                        .build());
            }
        };
    }
}
