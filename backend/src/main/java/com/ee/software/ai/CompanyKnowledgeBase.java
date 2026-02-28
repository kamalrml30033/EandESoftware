package com.ee.software.ai;

import java.util.List;

public final class CompanyKnowledgeBase {

    public static final List<String> SECTIONS = List.of(
            "E and E Software Solution provides enterprise software development, consulting, and training.",
            "We offer courses in Java, Spring Boot, React, and cloud technologies.",
            "Services include custom web applications, API development, and system integration.",
            "Contact: support@ee-software.com. Office hours: Mon–Fri 9–17."
    );

    public static String asContext() {
        return String.join(" ", SECTIONS);
    }
}
