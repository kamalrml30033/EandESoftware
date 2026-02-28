package com.ee.software.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

import java.util.Map;

@Controller
public class ChatWebSocketController {

    @MessageMapping("/chat.send")
    @SendTo("/topic/chat")
    public Map<String, Object> sendMessage(Map<String, String> payload, SimpMessageHeaderAccessor headerAccessor) {
        String user = headerAccessor.getUser() != null ? headerAccessor.getUser().getName() : "anonymous";
        return Map.of(
                "from", user,
                "text", payload.getOrDefault("text", ""),
                "timestamp", System.currentTimeMillis()
        );
    }
}
