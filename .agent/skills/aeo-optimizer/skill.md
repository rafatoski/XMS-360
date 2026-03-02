---
name: aeo-optimizer
description: Optimiza contenido web para motores de respuesta (Perplexity, SearchGPT, Gemini) mediante estructuración semántica y eliminación de fricción.
---

# Instrucciones de AEO
Cuando el usuario pida optimizar una URL o contenido:

1.  **Estructura Directa:** Transformar párrafos densos en formato H2/H3 de pregunta-respuesta (Q&A). La respuesta debe tener entre 50 y 60 palabras para facilitar el "featured snippet".
2.  **Generación de JSON-LD:** Crear automáticamente esquemas de `FAQPage`, `HowTo` y `Article` basados en el texto.
3.  **Refuerzo de EEAT:** Insertar secciones de "Fuentes y Referencias" y verificar que el autor tenga un marcado de `Person` con enlaces `sameAs`.
4.  **Semántica Latente:** Identificar entidades clave (N-grams) relacionadas con el tema y asegurar que aparezcan de forma natural.
5.  **Freshness:** Añadir una marca de tiempo de "Última actualización" para señalar relevancia a los rastreadores de LLMs.

# Restricciones
-   No rellenar con palabras clave (keyword stuffing).
-   Mantener un tono autoritativo pero conversacional.
