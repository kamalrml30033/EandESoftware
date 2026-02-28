package com.ee.software.controller;

import com.ee.software.entity.ServiceEntity;
import com.ee.software.repository.ServiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/services")
@RequiredArgsConstructor
public class ServiceController {

    private final ServiceRepository serviceRepository;

    @GetMapping
    public List<ServiceEntity> list() {
        return serviceRepository.findByActiveTrue();
    }

    @GetMapping("/{id}")
    public ServiceEntity getById(@PathVariable Long id) {
        return serviceRepository.findById(id).orElseThrow();
    }
}
