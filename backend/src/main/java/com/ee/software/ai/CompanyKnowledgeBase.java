package com.ee.software.ai;

import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Company knowledge base for free AI chat (no external API required).
 * Optional: set GROQ_API_KEY for enhanced responses via Groq's free tier.
 */
public final class CompanyKnowledgeBase {

    private static final String INTRO = "E and E Software Solution provides enterprise software development, consulting, and training. ";

    /** Keyword/phrase -> answer. Longer keys checked first so "hello" matches before "who". */
    private static final Map<String, String> QA = new LinkedHashMap<>();
    static {
        QA.put("what should I ask", "Try asking: \"What courses do you offer?\", \"What is Java?\", \"Tell me about Spring Boot\", \"How do I contact you?\", or \"What services do you provide?\"");
        QA.put("what can I ask", QA.get("what should I ask"));
        QA.put("suggest", QA.get("what should I ask"));
        QA.put("hello", "Hello! How can I help you today? Ask about our courses, services, or contact information.");
        QA.put("hi", "Hello! How can I help you today? Ask about our courses, services, or contact information.");
        QA.put("help", "I can answer questions about E and E Software Solution: courses (Java, Spring, React), services (web apps, APIs), and contact details. What would you like to know?");
        QA.put("details", "Here are the main details: We offer courses (Java, Spring Boot, React, cloud). Services: custom web apps, API development, system integration. Contact: support@ee-software.com, Mon–Fri 9–17. Ask me about a specific topic for more.");
        QA.put("provide details", QA.get("details"));
        QA.put("more info", QA.get("details"));
        QA.put("information", QA.get("details"));
        QA.put("contact", "You can reach us at support@ee-software.com. Office hours: Mon–Fri 9–17. For urgent matters, mention your project in the subject line.");
        QA.put("email", QA.get("contact"));
        QA.put("support", QA.get("contact"));
        QA.put("phone", "For phone support, please email support@ee-software.com to schedule a call. We typically respond within 24 hours.");
        QA.put("course", "We offer courses in Java, Spring Boot, React, cloud technologies (AWS basics), and REST API design. Each course includes hands-on projects and certificates.");
        QA.put("courses", QA.get("course"));
        QA.put("training", QA.get("course"));
        QA.put("what is java", "Our Java course covers fundamentals, OOP, collections, and Spring Boot. Duration is typically 40 hours with optional advanced modules.");
        QA.put("java", "Our Java course covers fundamentals, OOP, collections, and Spring Boot. Duration is typically 40 hours with optional advanced modules.");
        QA.put("spring", "Spring Boot training includes REST APIs, security (JWT), JPA, and deployment. Great for backend developers.");
        QA.put("react", "React and Vite frontend course covers components, state management, and modern tooling. Around 20 hours.");
        QA.put("service", "Our services include custom web applications, API development, system integration, and legacy modernization. We work with Java, React, and cloud.");
        QA.put("services", QA.get("service"));
        QA.put("development", QA.get("service"));
        QA.put("price", "Course and service pricing depends on scope. Contact support@ee-software.com with your requirements for a quote.");
        QA.put("cost", QA.get("price"));
        QA.put("pricing", QA.get("price"));
        QA.put("hour", "Course durations vary: Java Fundamentals ~40h, Spring Boot ~24h, React & Vite ~20h. Custom training can be tailored.");
        QA.put("duration", QA.get("hour"));
        QA.put("about", INTRO + "We specialize in full-stack development and upskilling teams. Visit our Courses and Services sections for details.");
        QA.put("who", QA.get("about"));
    }

    public static String asContext() {
        StringBuilder sb = new StringBuilder(INTRO);
        QA.forEach((k, v) -> sb.append(" ").append(k).append(": ").append(v));
        return sb.toString();
    }

    /** Get best matching answer: longest matching key first so 'hello' doesn't match 'who'. */
    public static String matchAnswer(String query) {
        if (query == null || query.isBlank()) return null;
        String q = query.toLowerCase().trim();
        return QA.entrySet().stream()
                .filter(e -> q.contains(e.getKey()))
                .max(Comparator.comparingInt(e -> e.getKey().length()))
                .map(Map.Entry::getValue)
                .orElse(null);
    }
}
