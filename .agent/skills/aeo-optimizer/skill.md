---
name: aeo-optimizer
description: Optimizes web content for answer engines (Perplexity, SearchGPT, Gemini) through semantic structuring and friction elimination.
---

# AEO Instructions
When the user requests optimization of a URL or content:

1.  **Direct Structure:** Transform dense paragraphs into H2/H3 question-answer (Q&A) format. Each answer should be 50–60 words to maximize featured snippet eligibility.
2.  **JSON-LD Generation:** Automatically create `FAQPage`, `HowTo`, and `Article` schemas based on the content.
3.  **EEAT Reinforcement:** Insert "Sources & References" sections and verify the author has a `Person` schema markup with `sameAs` links.
4.  **Latent Semantics:** Identify key entities (N-grams) related to the topic and ensure they appear naturally throughout the content.
5.  **Freshness:** Add a "Last updated" timestamp to signal recency to LLM crawlers.

# Restrictions
-   No keyword stuffing.
-   Maintain an authoritative but conversational tone.
