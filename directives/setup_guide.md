# Setup and Development Guide

This project follows a **3-Layer Architecture** as defined in `CLAUDE.md`.

## Layer 1: Directives (`directives/`)
- Store all Standard Operating Procedures (SOPs) here.
- Directives should describe *what* to do and *which* tools to use.
- Example: `directives/scrape_restaurant.md`.

## Layer 2: Orchestration (Agent)
- As the AI Agent, I read the directives and execute the necessary scripts in order.
- I handle logic that requires decision-making or error recovery.

## Layer 3: Execution (`execution/`)
- Deterministic Python scripts that perform specific tasks.
- No business logic that requires "guessing" should be here.
- Scripts should be well-commented and handle errors gracefully.

## Configuration (`env/`)
- Store `.env` files and API templates here.
- Never commit actual secrets; use `.env.example` as a template.

---
Created on: 2026-05-04
