# 📡 API Documentation

## Base URL

```
Development: http://localhost:4000/api
Production: https://api.aiagentbuilder.com/api
```

## Interactive Documentation

Once the backend is running, access the interactive Swagger documentation at:

```
http://localhost:4000/api/docs
```

## Authentication

All authenticated endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Endpoints

### Authentication

#### POST /auth/register
Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "name": "John Doe"
}
```

**Response:**
```json
{
  "user": {
    "id": "cuid123",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "USER",
    "plan": "FREE"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### POST /auth/login
Login with email and password.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

**Response:**
```json
{
  "user": {
    "id": "cuid123",
    "email": "user@example.com",
    "name": "John Doe"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### GET /auth/me
Get current user profile (requires authentication).

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "id": "cuid123",
  "email": "user@example.com",
  "name": "John Doe",
  "role": "USER",
  "plan": "FREE"
}
```

### Agents

#### GET /agents
List all agents for the authenticated user.

**Response:**
```json
{
  "data": [
    {
      "id": "agent123",
      "name": "Sales Assistant",
      "description": "Helps with sales inquiries",
      "specialty": "SALES",
      "complexity": "INTERMEDIATE",
      "status": "ACTIVE",
      "createdAt": "2025-01-01T00:00:00Z"
    }
  ]
}
```

#### POST /agents
Create a new agent.

**Request Body:**
```json
{
  "name": "Customer Support Bot",
  "description": "24/7 customer support",
  "specialty": "SUPPORT",
  "complexity": "ADVANCED",
  "systemPrompt": "You are a helpful customer support assistant..."
}
```

#### GET /agents/:id
Get agent details.

#### PUT /agents/:id
Update an agent.

#### DELETE /agents/:id
Delete an agent.

#### POST /agents/:id/execute
Execute an agent with input.

**Request Body:**
```json
{
  "input": {
    "message": "Hello, I need help with..."
  }
}
```

**Response:**
```json
{
  "success": true,
  "output": "I'd be happy to help...",
  "tokens": 150,
  "duration": 1200
}
```

### Licenses

#### POST /agents/:id/licenses
Generate a new license for an agent.

**Request Body:**
```json
{
  "type": "MONTHLY",
  "maxExecutions": 10000
}
```

**Response:**
```json
{
  "id": "license123",
  "key": "XXXX-YYYY-ZZZZ-WWWW",
  "type": "MONTHLY",
  "status": "ACTIVE",
  "expiresAt": "2025-02-01T00:00:00Z"
}
```

### Payments (Stripe)

#### POST /payments/create-checkout-session
Create a Stripe checkout session for subscription.

**Request Body:**
```json
{
  "plan": "PRO",
  "billingPeriod": "MONTHLY"
}
```

#### POST /payments/webhook
Stripe webhook endpoint (handles payment events).

## Rate Limiting

API endpoints are rate-limited to 100 requests per minute per IP address.

**Rate Limit Headers:**
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200
```

## Error Responses

All errors follow this format:

```json
{
  "statusCode": 400,
  "message": "Error message",
  "error": "Bad Request"
}
```

**Common Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `429` - Too Many Requests
- `500` - Internal Server Error

## Webhooks

### Agent Execution Webhook

Configure a webhook URL to receive notifications when agents are executed.

**Webhook Payload:**
```json
{
  "event": "agent.executed",
  "timestamp": "2025-01-01T00:00:00Z",
  "data": {
    "agentId": "agent123",
    "executionId": "exec456",
    "success": true,
    "tokens": 150
  }
}
```

## SDK Examples

### JavaScript/Node.js

```javascript
const axios = require('axios');

const api = axios.create({
  baseURL: 'http://localhost:4000/api',
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

// Create an agent
const agent = await api.post('/agents', {
  name: 'My Agent',
  specialty: 'CUSTOM',
  complexity: 'BASIC',
  systemPrompt: 'You are a helpful assistant'
});

// Execute agent
const result = await api.post(`/agents/${agent.data.id}/execute`, {
  input: { message: 'Hello' }
});
```

### Python

```python
import requests

API_URL = 'http://localhost:4000/api'
TOKEN = 'your-jwt-token'

headers = {
    'Authorization': f'Bearer {TOKEN}',
    'Content-Type': 'application/json'
}

# Create an agent
response = requests.post(f'{API_URL}/agents', json={
    'name': 'My Agent',
    'specialty': 'CUSTOM',
    'complexity': 'BASIC',
    'systemPrompt': 'You are a helpful assistant'
}, headers=headers)

agent = response.json()

# Execute agent
result = requests.post(f'{API_URL}/agents/{agent["id"]}/execute', json={
    'input': {'message': 'Hello'}
}, headers=headers)
```

## Support

For API support, contact: api-support@aiagentbuilder.com
