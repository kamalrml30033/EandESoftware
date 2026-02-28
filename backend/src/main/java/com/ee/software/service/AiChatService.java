package com.ee.software.service;

import com.ee.software.ai.CompanyKnowledgeBase;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AiChatService {

    private final ChatModel chatModel;

    public AiChatService(@Autowired(required = false) ChatModel chatModel) {
        this.chatModel = chatModel;
    }

    public String chat(String userQuery) {
        String context = CompanyKnowledgeBase.asContext();
        if (chatModel != null) {
            String promptText = "Based on the following company knowledge base, answer the user question concisely. "
                    + "If the answer is not in the knowledge base, say so.\n\nKnowledge base:\n" + context
                    + "\n\nUser question: " + userQuery;
            return chatModel.call(new Prompt(promptText)).getResult().getOutput().getContent();
        }
        return answerFromKnowledgeBaseOnly(userQuery, context);
    }

    private String answerFromKnowledgeBaseOnly(String query, String context) {
        String q = query.toLowerCase();
        if (q.contains("contact") || q.contains("email") || q.contains("support")) {
            return "You can reach us at support@ee-software.com. Office hours: Mon–Fri 9–17.";
        }
        if (q.contains("course") || q.contains("training")) {
            return "We offer courses in Java, Spring Boot, React, and cloud technologies.";
        }
        if (q.contains("service") || q.contains("development")) {
            return "Our services include custom web applications, API development, and system integration.";
        }
        return "E and E Software Solution provides enterprise software development, consulting, and training. " + context;
    }
}
