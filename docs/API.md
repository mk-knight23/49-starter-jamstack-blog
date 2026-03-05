# 🔌 API Documentation - JAMstack Blog

> Complete API reference for developers

## 📋 Table of Contents

1. [Getting Started](#getting-started)
2. [Authentication](#authentication)
3. [Endpoints](#endpoints)
4. [Error Handling](#error-handling)
5. [Rate Limiting](#rate-limiting)

---

## Getting Started

### Base URL

```
Production:  https://api.example.com
Development: http://localhost:3000/api
```

### Content Type

All requests should include:

```http
Content-Type: application/json
Accept: application/json
```

---

## Authentication

### API Key Authentication

```http
Authorization: Bearer YOUR_API_KEY
```

---

## Endpoints

### Health Check

```http
GET /api/health
```

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2025-03-06T00:00:00Z",
  "version": "1.0.0"
}
```

### Get All Items

```http
GET /api/items
```

**Response:**
```json
{
  "data": [],
  "meta": {
    "total": 0,
    "page": 1,
    "limit": 10
  }
}
```

---

## Error Handling

### HTTP Status Codes

| Code | Meaning | Description |
|------|---------|-------------|
| 200 | OK | Successful request |
| 201 | Created | Resource created |
| 400 | Bad Request | Invalid input |
| 401 | Unauthorized | Missing authentication |
| 404 | Not Found | Resource not found |
| 500 | Server Error | Internal server error |

---

🦾 **Evolved with OpenClaw**
