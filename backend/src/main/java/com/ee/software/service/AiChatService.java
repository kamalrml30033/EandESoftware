package com.ee.software.service;

import com.ee.software.ai.CompanyKnowledgeBase;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class AiChatService {

    private static final String GROQ_CHAT_URL = "https://api.groq.com/openai/v1/chat/completions";
    private static final String GROQ_MODEL = "llama-3.1-8b-instant";

    private final String groqApiKey;
    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public AiChatService(@Value("${GROQ_API_KEY:}") String groqApiKey) {
        this.groqApiKey = groqApiKey != null && !groqApiKey.isBlank() ? groqApiKey : null;
    }

    public String chat(String userQuery) {
        if (userQuery == null || userQuery.isBlank()) {
            return "Please ask a question about our courses, services, or contact details.";
        }
        String matched = CompanyKnowledgeBase.matchAnswer(userQuery);
        // Prefer local KB when we have a match so "what is java" etc. get the right answer
        if (matched != null) return matched;
        if (groqApiKey != null) {
            try {
                return callGroq(userQuery, null);
            } catch (Exception e) {
                // fallback to default
            }
        }
        return defaultAnswer(userQuery);
    }

    private String callGroq(String userQuery, String localHint) throws Exception {
        String systemPrompt = "You are the assistant for E and E Software Solution (enterprise software development, consulting, training). "
                + "Answer briefly and professionally based on this knowledge: " + CompanyKnowledgeBase.asContext()
                + (localHint != null ? " Relevant info: " + localHint : "");
        ObjectNode root = objectMapper.createObjectNode();
        root.put("model", GROQ_MODEL);
        root.put("max_tokens", 256);
        ArrayNode messages = root.putArray("messages");
        messages.addObject().put("role", "system").put("content", systemPrompt);
        messages.addObject().put("role", "user").put("content", userQuery);
        String body = objectMapper.writeValueAsString(root);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(groqApiKey);
        ResponseEntity<String> res = restTemplate.postForEntity(GROQ_CHAT_URL, new HttpEntity<>(body, headers), String.class);
        if (!res.getStatusCode().is2xxSuccessful() || res.getBody() == null) return defaultAnswer(userQuery);
        JsonNode resRoot = objectMapper.readTree(res.getBody());
        JsonNode choices = resRoot.get("choices");
        if (choices != null && choices.isArray() && choices.size() > 0) {
            JsonNode msg = choices.get(0).get("message");
            if (msg != null) {
                JsonNode content = msg.get("content");
                if (content != null) return content.asText().trim();
            }
        }
        return defaultAnswer(userQuery);
    }

    private String defaultAnswer(String query) {
        return "I can help with: courses (Java, Spring, React), services (web apps, APIs), and contact info. Try asking e.g. \"What courses do you offer?\" or \"How do I contact you?\"";
    }
}
