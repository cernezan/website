# Fast Slow Events API

A simple GET-based event collection system for the Fast Slow iOS app analytics.

## Endpoint

```
GET https://cernezan.com/api/fast-slow-events
```

## Authentication

No authentication required - uses anonymous user tracking via `user_id`.

## Required Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `event` | string | Event type (see supported events below) |
| `user_id` | string | Anonymous user identifier |
| `timestamp` | string | ISO 8601 timestamp (e.g., 2025-01-27T10:30:00Z) |

## Optional Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `app_version` | string | App version (e.g., 1.0.0) |

## Supported Event Types

### 1. Onboarding Start
```
GET /api/fast-slow-events?event=onboarding_start&user_id=abc123&timestamp=2025-01-27T10:30:00Z&app_version=1.0.0
```

### 2. Onboarding Complete
```
GET /api/fast-slow-events?event=onboarding_complete&user_id=abc123&goals=weight_loss,energy,health&experience=beginner&fasting_plan=16:8&timestamp=2025-01-27T10:35:00Z
```

**Additional Parameters:**
- `goals` - Comma-separated list of user goals
- `experience` - User experience level (beginner, intermediate, advanced)
- `fasting_plan` - Selected fasting plan (16:8, 18:6, 20:4, OMAD)

### 3. App Launch
```
GET /api/fast-slow-events?event=app_launch&user_id=abc123&is_first_launch=false&days_since_install=5&timestamp=2025-01-27T10:29:00Z
```

**Additional Parameters:**
- `is_first_launch` - Boolean (true/false)
- `days_since_install` - Number of days since app installation

### 4. Start Fast
```
GET /api/fast-slow-events?event=fast_start&user_id=abc123&fasting_mode=16:8&planned_duration_hours=16&start_time=2025-01-27T18:00:00Z&timestamp=2025-01-27T18:00:00Z
```

**Additional Parameters:**
- `fasting_mode` - Fasting schedule (16:8, 18:6, etc.)
- `planned_duration_hours` - Planned fasting duration in hours
- `start_time` - ISO 8601 timestamp of fast start

### 5. Goal Achievement
```
GET /api/fast-slow-events?event=goal_achieved&user_id=abc123&goal_type=fasting&planned_hours=16&actual_hours=16.2&exceeded_by_minutes=12&timestamp=2025-01-28T10:00:00Z
```

**Additional Parameters:**
- `goal_type` - Type of goal (fasting, eating)
- `planned_hours` - Planned duration in hours
- `actual_hours` - Actual duration in hours
- `exceeded_by_minutes` - Minutes exceeded (for fasting goals)
- `exceeded_by_hours` - Hours exceeded (for fasting goals)
- `eating_start` - Start of eating window (for eating goals)
- `eating_end` - End of eating window (for eating goals)

### 6. Fast End
```
GET /api/fast-slow-events?event=fast_end&user_id=abc123&planned_hours=16&actual_hours=18.5&exceeded_goal=true&exceeded_by_hours=2.5&start_time=2025-01-27T18:00:00Z&end_time=2025-01-28T12:30:00Z&timestamp=2025-01-28T12:30:00Z
```

**Additional Parameters:**
- `planned_hours` - Planned fasting duration
- `actual_hours` - Actual fasting duration
- `exceeded_goal` - Boolean (true/false)
- `exceeded_by_hours` - Hours exceeded beyond goal
- `start_time` - Fast start timestamp
- `end_time` - Fast end timestamp

## Response Format

### Success Response (200)
```json
{
  "success": true,
  "message": "Event logged successfully",
  "event_id": "fast_start_1738074000000_abc12345"
}
```

### Error Response (400/500)
```json
{
  "success": false,
  "error": "Missing required parameters: event, user_id, timestamp"
}
```

## Error Codes

| Code | Description |
|------|-------------|
| 400 | Missing required parameters |
| 400 | Invalid event type |
| 400 | Invalid timestamp format |
| 500 | Internal server error |

## Data Storage

- Events are stored in daily log files: `logs/fast-slow-events-YYYY-MM-DD.log`
- Each log entry is a JSON object with timestamp, event data, and metadata
- Log files are automatically rotated daily
- Compatible with Hostinger file-based hosting

## Security Features

- Input sanitization removes special characters
- Field length limits prevent abuse
- IP address and user agent logging for analysis
- CORS headers for web requests

## Example iOS Implementation

```swift
func logEvent(event: String, userId: String, parameters: [String: String] = [:]) {
    var urlComponents = URLComponents(string: "https://cernezan.com/api/fast-slow-events")!
    
    var queryItems = [
        URLQueryItem(name: "event", value: event),
        URLQueryItem(name: "user_id", value: userId),
        URLQueryItem(name: "timestamp", value: ISO8601DateFormatter().string(from: Date())),
        URLQueryItem(name: "app_version", value: Bundle.main.infoDictionary?["CFBundleShortVersionString"] as? String)
    ]
    
    // Add event-specific parameters
    for (key, value) in parameters {
        queryItems.append(URLQueryItem(name: key, value: value))
    }
    
    urlComponents.queryItems = queryItems
    
    guard let url = urlComponents.url else { return }
    
    URLSession.shared.dataTask(with: url) { data, response, error in
        // Handle response
    }.resume()
}

// Usage examples
logEvent(event: "onboarding_start", userId: userManager.userId)

logEvent(event: "fast_start", userId: userManager.userId, parameters: [
    "fasting_mode": "16:8",
    "planned_duration_hours": "16",
    "start_time": ISO8601DateFormatter().string(from: fastStartTime)
])
```

## Log File Format

Each log entry contains:
```json
{
  "timestamp": "2025-01-27T10:30:00.123Z",
  "received_at": 1738074000123,
  "event_data": {
    "event": "fast_start",
    "user_id": "abc123",
    "timestamp": "2025-01-27T10:30:00Z",
    "app_version": "1.0.0",
    "fasting_mode": "16:8",
    "planned_duration_hours": "16"
  },
  "metadata": {
    "ip_address": "192.168.1.1",
    "user_agent": "FastSlow/1.0.0 (iOS 17.0)",
    "headers": {
      "origin": null,
      "referer": null,
      "accept-language": "en-US"
    }
  }
}
```
