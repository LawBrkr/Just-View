---
name: UI Performance Guidelines
description: Best practices for React and Next.js performance.
---

# UI Performance rules

- Priorizar animaciones por GPU (transform, opacity) sobre propiedades que disparen repaints (width, height, top).
- Todo componente interactivo debe ser 'use client' y estar aislado para no deshidratar el layout superior.
