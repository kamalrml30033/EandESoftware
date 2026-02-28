package com.ee.software.controller;

import com.ee.software.service.AiChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AiChatController {

    private final AiChatService aiChatService;

    @PostMapping("/chat")
    public ResponseEntity<Map<String, String>> chat(@RequestBody Map<String, String> body) {
        String userQuery = body.getOrDefault("query", "");
        String response = aiChatService.chat(userQuery);
        return ResponseEntity.ok(Map.of("response", response));
    }
}
