package com.ee.software.controller;

import com.ee.software.entity.ServiceEntity;
import com.ee.software.repository.ServiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/services")
@RequiredArgsConstructor
public class AdminServiceController {

    private final ServiceRepository serviceRepository;

    @GetMapping
    public List<ServiceEntity> listAll() {
        return serviceRepository.findAll();
    }

    @PostMapping
    public ServiceEntity create(@RequestBody ServiceEntity service) {
        if (service.getActive() == null) service.setActive(true);
        return serviceRepository.save(service);
    }

    @PutMapping("/{id}")
    public ServiceEntity update(@PathVariable Long id, @RequestBody ServiceEntity service) {
        ServiceEntity existing = serviceRepository.findById(id).orElseThrow();
        if (service.getName() != null) existing.setName(service.getName());
        if (service.getDescription() != null) existing.setDescription(service.getDescription());
        if (service.getPrice() != null) existing.setPrice(service.getPrice());
        if (service.getActive() != null) existing.setActive(service.getActive());
        return serviceRepository.save(existing);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        serviceRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
