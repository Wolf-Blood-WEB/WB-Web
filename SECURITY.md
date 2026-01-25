# Security Policy

Thank you for your interest in the security of this project. Since this repository hosts a static web page (via GitHub Pages), the security scope is primarily focused on the client-side code (HTML/CSS/JS) and the integrity of the served content.

## Supported Versions

As a web deployment, only the current live version is supported.

| Version | Supported          | Notes                                  |
| :-----: | :----------------: | :------------------------------------- |
| Live    | :white_check_mark: | The latest deployment on GitHub Pages. |
| History | :x:                | Older commits are not maintained.      |

## Reporting a Vulnerability

I take security seriously. If you discover a vulnerability (e.g., XSS, dependency issues, or content injection), please report it responsibly.

### How to Report

Please **do not** report security vulnerabilities through public GitHub issues. Instead, strictly follow these steps:

1.  **Email**: Send a detailed description of the issue to **[Insert Your Email Address Here]**.
2.  **Subject Line**: Please use `[SECURITY] - Vulnerability Report` as your subject.
3.  **Details**: Include the steps to reproduce the issue, the browser/environment used, and the potential impact.

### Response Timeline

* I will acknowledge receipt of your report within **48 hours**.
* I will provide an estimated timeline for the fix if the vulnerability is confirmed.
* Please allow me reasonable time to patch the issue before publicly disclosing it.

## Scope of Security

This project is a static site. The following are generally considered **out of scope** unless they demonstrate a significant risk to visitors:
* Clickjacking on pages with no sensitive actions.
* Attacks requiring physical access to the user's device.
* Automated scanner reports (unless a specific valid vector is identified).

## Safe Harbor

If you conduct security research on this repository in good faith and follow this policy, I will:
* Not pursue legal action against you.
* Publicly acknowledge your contribution (with your permission) once the issue is resolved.
