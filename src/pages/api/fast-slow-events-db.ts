import type { APIRoute } from 'astro';

// Optional database storage implementation for higher volume
// Uncomment and configure if you want to use MySQL instead of file storage

/*
import mysql from 'mysql2/promise';

// Database configuration for Hostinger MySQL
const dbConfig = {
  host: 'localhost', // or your Hostinger MySQL host
  user: 'your_db_user',
  password: 'your_db_password',
  database: 'your_database_name',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Create connection pool
const pool = mysql.createPool(dbConfig);

// Create events table (run this once)
async function createEventsTable() {
  const connection = await pool.getConnection();
  try {
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS fast_slow_events (
        id INT AUTO_INCREMENT PRIMARY KEY,
        event_type VARCHAR(50) NOT NULL,
        user_id VARCHAR(100) NOT NULL,
        event_data JSON,
        metadata JSON,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        received_at BIGINT,
        INDEX idx_user_id (user_id),
        INDEX idx_event_type (event_type),
        INDEX idx_timestamp (timestamp)
      )
    `);
  } finally {
    connection.release();
  }
}

async function saveEventToDatabase(eventData: any, metadata: any) {
  const connection = await pool.getConnection();
  try {
    await connection.execute(
      'INSERT INTO fast_slow_events (event_type, user_id, event_data, metadata, received_at) VALUES (?, ?, ?, ?, ?)',
      [
        eventData.event,
        eventData.user_id,
        JSON.stringify(eventData),
        JSON.stringify(metadata),
        Date.now()
      ]
    );
  } finally {
    connection.release();
  }
}

export const GET: APIRoute = async ({ request, url }) => {
  try {
    // Parse query parameters (same as file version)
    const searchParams = url.searchParams;
    const event = searchParams.get('event');
    const user_id = searchParams.get('user_id');
    const timestamp = searchParams.get('timestamp');
    
    // Validation (same as file version)
    if (!event || !user_id || !timestamp) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Missing required parameters: event, user_id, timestamp' 
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Build event data (same logic as file version)
    const eventData = {
      event,
      user_id,
      timestamp,
      app_version: searchParams.get('app_version'),
      // ... add other fields based on event type
    };
    
    // Collect metadata
    const metadata = {
      ip_address: request.headers.get('x-forwarded-for') || 'unknown',
      user_agent: request.headers.get('user-agent') || 'unknown',
      headers: {
        origin: request.headers.get('origin'),
        referer: request.headers.get('referer'),
      }
    };
    
    // Save to database instead of file
    await saveEventToDatabase(eventData, metadata);
    
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
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
    
  } catch (error) {
    console.error('Database error:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Database error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
*/

// Placeholder response when database version is not configured
export const GET: APIRoute = async () => {
  return new Response(
    JSON.stringify({ 
      success: false, 
      error: 'Database storage not configured. Use fast-slow-events.ts for file storage.' 
    }),
    { 
      status: 501,
      headers: { 'Content-Type': 'application/json' }
    }
  );
};
