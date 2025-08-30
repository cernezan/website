import type { APIRoute } from 'astro';
import { appendFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

// Define event types for better type safety
type EventType = 
  | 'onboarding_start'
  | 'onboarding_complete'
  | 'app_launch'
  | 'fast_start'
  | 'goal_achieved'
  | 'fast_end';

interface BaseEvent {
  event: EventType;
  user_id: string;
  timestamp: string;
  app_version?: string;
  ip_address?: string;
  user_agent?: string;
}

interface OnboardingStartEvent extends BaseEvent {
  event: 'onboarding_start';
}

interface OnboardingCompleteEvent extends BaseEvent {
  event: 'onboarding_complete';
  goals?: string;
  experience?: string;
  fasting_plan?: string;
}

interface AppLaunchEvent extends BaseEvent {
  event: 'app_launch';
  is_first_launch?: string;
  days_since_install?: string;
}

interface FastStartEvent extends BaseEvent {
  event: 'fast_start';
  fasting_mode?: string;
  planned_duration_hours?: string;
  start_time?: string;
}

interface GoalAchievedEvent extends BaseEvent {
  event: 'goal_achieved';
  goal_type?: string;
  planned_hours?: string;
  actual_hours?: string;
  exceeded_by_minutes?: string;
  exceeded_by_hours?: string;
  eating_start?: string;
  eating_end?: string;
}

interface FastEndEvent extends BaseEvent {
  event: 'fast_end';
  planned_hours?: string;
  actual_hours?: string;
  exceeded_goal?: string;
  exceeded_by_hours?: string;
  start_time?: string;
  end_time?: string;
}

type FastSlowEvent = 
  | OnboardingStartEvent
  | OnboardingCompleteEvent
  | AppLaunchEvent
  | FastStartEvent
  | GoalAchievedEvent
  | FastEndEvent;

// Utility functions
function sanitizeString(str: string | undefined, maxLength: number = 255): string {
  if (!str) return '';
  return str.replace(/[^\w\-.:@]/g, '').substring(0, maxLength);
}

function validateTimestamp(timestamp: string): boolean {
  const date = new Date(timestamp);
  return !isNaN(date.getTime()) && date.getTime() > 0;
}

function formatLogEntry(event: FastSlowEvent, metadata: any): string {
  const logEntry = {
    timestamp: new Date().toISOString(),
    received_at: Date.now(),
    event_data: event,
    metadata: {
      ip_address: metadata.ip_address,
      user_agent: metadata.user_agent,
      headers: metadata.headers
    }
  };
  
  return JSON.stringify(logEntry) + '\n';
}

function getLogFilePath(): string {
  // For production on Hostinger, use a directory outside the web root
  // This prevents logs from being lost on deploy and keeps them private
  const isProduction = process.env.NODE_ENV === 'production';
  
  let logsDir;
  if (isProduction) {
    // On Hostinger, use a directory outside public_html
    // This path should be outside your deployment directory
    logsDir = '/home/u920584215/fast-slow-logs'; // Your actual Hostinger username
  } else {
    // For local development
    logsDir = join(process.cwd(), 'logs');
  }
  
  // Ensure logs directory exists
  if (!existsSync(logsDir)) {
    mkdirSync(logsDir, { recursive: true });
  }
  
  // Create daily log files for easier management
  const today = new Date().toISOString().split('T')[0];
  return join(logsDir, `fast-slow-events-${today}.log`);
}

export const GET: APIRoute = async ({ request, url }) => {
  try {
    // Debug logging
    console.log('Request URL:', url.toString());
    console.log('Search params:', url.searchParams.toString());
    
    // Parse query parameters
    const searchParams = url.searchParams;
    
    // Extract required fields
    const event = searchParams.get('event') as EventType;
    const user_id = searchParams.get('user_id');
    const timestamp = searchParams.get('timestamp');
    
    // Debug logging
    console.log('Extracted params:', { event, user_id, timestamp });
    
    // Basic validation
    if (!event || !user_id || !timestamp) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Missing required parameters: event, user_id, timestamp' 
        }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
    
    // Validate event type
    const validEvents: EventType[] = [
      'onboarding_start',
      'onboarding_complete', 
      'app_launch',
      'fast_start',
      'goal_achieved',
      'fast_end'
    ];
    
    if (!validEvents.includes(event)) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: `Invalid event type. Must be one of: ${validEvents.join(', ')}` 
        }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
    
    // Validate timestamp
    if (!validateTimestamp(timestamp)) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Invalid timestamp format. Use ISO 8601 format (e.g., 2025-01-27T10:30:00Z)' 
        }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
    
    // Build event object with sanitized data
    const eventData: FastSlowEvent = {
      event,
      user_id: sanitizeString(user_id, 100),
      timestamp: sanitizeString(timestamp, 50),
      app_version: sanitizeString(searchParams.get('app_version') || undefined, 20)
    } as FastSlowEvent;
    
    // Add event-specific fields based on event type
    switch (event) {
      case 'onboarding_complete':
        (eventData as OnboardingCompleteEvent).goals = sanitizeString(searchParams.get('goals') || undefined, 200);
        (eventData as OnboardingCompleteEvent).experience = sanitizeString(searchParams.get('experience') || undefined, 50);
        (eventData as OnboardingCompleteEvent).fasting_plan = sanitizeString(searchParams.get('fasting_plan') || undefined, 20);
        break;
        
      case 'app_launch':
        (eventData as AppLaunchEvent).is_first_launch = sanitizeString(searchParams.get('is_first_launch') || undefined, 10);
        (eventData as AppLaunchEvent).days_since_install = sanitizeString(searchParams.get('days_since_install') || undefined, 10);
        break;
        
      case 'fast_start':
        (eventData as FastStartEvent).fasting_mode = sanitizeString(searchParams.get('fasting_mode') || undefined, 20);
        (eventData as FastStartEvent).planned_duration_hours = sanitizeString(searchParams.get('planned_duration_hours') || undefined, 10);
        (eventData as FastStartEvent).start_time = sanitizeString(searchParams.get('start_time') || undefined, 50);
        break;
        
      case 'goal_achieved':
        (eventData as GoalAchievedEvent).goal_type = sanitizeString(searchParams.get('goal_type') || undefined, 20);
        (eventData as GoalAchievedEvent).planned_hours = sanitizeString(searchParams.get('planned_hours') || undefined, 10);
        (eventData as GoalAchievedEvent).actual_hours = sanitizeString(searchParams.get('actual_hours') || undefined, 10);
        (eventData as GoalAchievedEvent).exceeded_by_minutes = sanitizeString(searchParams.get('exceeded_by_minutes') || undefined, 10);
        (eventData as GoalAchievedEvent).exceeded_by_hours = sanitizeString(searchParams.get('exceeded_by_hours') || undefined, 10);
        (eventData as GoalAchievedEvent).eating_start = sanitizeString(searchParams.get('eating_start') || undefined, 50);
        (eventData as GoalAchievedEvent).eating_end = sanitizeString(searchParams.get('eating_end') || undefined, 50);
        break;
        
      case 'fast_end':
        (eventData as FastEndEvent).planned_hours = sanitizeString(searchParams.get('planned_hours') || undefined, 10);
        (eventData as FastEndEvent).actual_hours = sanitizeString(searchParams.get('actual_hours') || undefined, 10);
        (eventData as FastEndEvent).exceeded_goal = sanitizeString(searchParams.get('exceeded_goal') || undefined, 10);
        (eventData as FastEndEvent).exceeded_by_hours = sanitizeString(searchParams.get('exceeded_by_hours') || undefined, 10);
        (eventData as FastEndEvent).start_time = sanitizeString(searchParams.get('start_time') || undefined, 50);
        (eventData as FastEndEvent).end_time = sanitizeString(searchParams.get('end_time') || undefined, 50);
        break;
    }
    
    // Collect metadata
    const metadata = {
      ip_address: request.headers.get('x-forwarded-for') || 
                  request.headers.get('x-real-ip') || 
                  'unknown',
      user_agent: request.headers.get('user-agent') || 'unknown',
      headers: {
        origin: request.headers.get('origin'),
        referer: request.headers.get('referer'),
        'accept-language': request.headers.get('accept-language')
      }
    };
    
    // Format and save log entry
    const logEntry = formatLogEntry(eventData, metadata);
    const logFilePath = getLogFilePath();
    
    try {
      appendFileSync(logFilePath, logEntry, 'utf8');
    } catch (error) {
      console.error('Failed to write log entry:', error);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Failed to save event data' 
        }),
        { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
    
    // Return success response
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Event logged successfully',
        event_id: `${event}_${Date.now()}_${user_id.substring(0, 8)}`
      }),
      { 
        status: 200,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      }
    );
    
  } catch (error) {
    console.error('Error processing event:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Internal server error' 
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};

// Add OPTIONS method for CORS preflight
export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400'
    }
  });
};
