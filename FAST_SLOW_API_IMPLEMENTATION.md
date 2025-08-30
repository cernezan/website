# Fast Slow Events API - iOS Implementation Guide

## 📡 **API Endpoint**
```
GET https://cernezan.com/api/fast-slow-events
```

## 🔑 **Required Parameters**
| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `event` | string | Event type | `onboarding_start` |
| `user_id` | string | Anonymous user ID | `abc123` |
| `timestamp` | string | ISO 8601 timestamp | `2025-01-27T10:30:00Z` |

## 📋 **Event Types**
- `onboarding_start` - User starts onboarding
- `onboarding_complete` - User completes setup
- `app_launch` - App opens
- `fast_start` - User starts a fast
- `goal_achieved` - Fasting/eating goal reached
- `fast_end` - User ends a fast

## 🛠 **iOS Implementation**

### Swift Function
```swift
import Foundation

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
        if let error = error {
            print("Logging error: \(error)")
            return
        }
        
        if let data = data {
            do {
                let json = try JSONSerialization.jsonObject(with: data)
                print("Event logged: \(json)")
            } catch {
                print("JSON parsing error: \(error)")
            }
        }
    }.resume()
}
```

### Usage Examples
```swift
// 1. Onboarding Start
logEvent(event: "onboarding_start", userId: userManager.userId)

// 2. Onboarding Complete
logEvent(event: "onboarding_complete", userId: userManager.userId, parameters: [
    "goals": "weight_loss,energy,health",
    "experience": "beginner",
    "fasting_plan": "16:8"
])

// 3. App Launch
logEvent(event: "app_launch", userId: userManager.userId, parameters: [
    "is_first_launch": "false",
    "days_since_install": "5"
])

// 4. Start Fast
logEvent(event: "fast_start", userId: userManager.userId, parameters: [
    "fasting_mode": "16:8",
    "planned_duration_hours": "16",
    "start_time": ISO8601DateFormatter().string(from: fastStartTime)
])

// 5. Goal Achievement
logEvent(event: "goal_achieved", userId: userManager.userId, parameters: [
    "goal_type": "fasting",
    "planned_hours": "16",
    "actual_hours": "16.2",
    "exceeded_by_minutes": "12"
])

// 6. Fast End
logEvent(event: "fast_end", userId: userManager.userId, parameters: [
    "planned_hours": "16",
    "actual_hours": "18.5",
    "exceeded_goal": "true",
    "exceeded_by_hours": "2.5",
    "start_time": ISO8601DateFormatter().string(from: fastStart),
    "end_time": ISO8601DateFormatter().string(from: Date())
])
```

## 📱 **User ID Management**
```swift
class UserManager {
    static let shared = UserManager()
    
    var userId: String {
        if let savedId = UserDefaults.standard.string(forKey: "anonymous_user_id") {
            return savedId
        }
        
        // Generate new anonymous ID
        let newId = UUID().uuidString
        UserDefaults.standard.set(newId, forKey: "anonymous_user_id")
        return newId
    }
}
```

## ✅ **API Response**
### Success (200)
```json
{
  "success": true,
  "message": "Event logged successfully",
  "event_id": "fast_start_1738074000000_abc12345"
}
```

### Error (400/500)
```json
{
  "success": false,
  "error": "Missing required parameters: event, user_id, timestamp"
}
```

## 🔒 **Privacy & Security**
- ✅ **No personal data** - Only anonymous user IDs
- ✅ **HTTPS only** - Encrypted transmission
- ✅ **No authentication** - Simple GET requests
- ✅ **CORS enabled** - Works from web/app contexts

## 🎯 **Key Features**
- **Fire & forget** - No need to wait for responses
- **Offline resilient** - Queue events and send when online
- **Daily log rotation** - Automatic file management
- **Persistent storage** - Logs survive deployments
- **Real-time monitoring** - Events logged immediately

## 🚀 **Quick Start**
1. Copy the `logEvent` function to your app
2. Set up `UserManager` for anonymous IDs
3. Call `logEvent` at key user actions
4. Events automatically appear in server logs

## 📊 **What Gets Logged**
- Event data (your parameters)
- Timestamp (server & client)
- User agent & IP (for analytics)
- App version (for debugging)

That's it! Simple GET requests that help you understand user behavior without compromising privacy. 🎉
