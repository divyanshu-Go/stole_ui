// app/api/[userId]/elements/route.js
import { NextResponse } from 'next/server';
import DbConnect from '@/lib/Db/DbConnect';
import Element from '@/models/element';
import User from '@/models/user';

export async function GET(req, { params }) {
  try {
    // First, we need to establish a database connection
    await DbConnect();

    // Extract the userId from the route parameters
    const { userId } = await params;

    // Validate if the userId is in the correct MongoDB ObjectId format
    if (!userId || userId.length !== 24) {
      return NextResponse.json({ 
        error: "Invalid user ID format" 
      }, { status: 400 });
    }

    // First, verify that the user exists in our database
    const userExists = await User.findById(userId);
    if (!userExists) {
      return NextResponse.json({ 
        error: "User not found" 
      }, { status: 404 });
    }

    // Query the database for all elements created by this user
    // We use the authorId field from our Element model to match the userId
    const userElements = await Element.find({ authorId: userId })
      // Sort by creation date, newest first
      .sort({ createdAt: -1 })
      // Select all fields except unnecessary ones
      .select('-htmlCode -cssCode')
      // If the elements need user info, we could populate author details
      // .populate('authorId', 'name email');

    // Return the elements array
    // Even if no elements are found, we return an empty array rather than an error
    return NextResponse.json({ 
      elements: userElements,
      total: userElements.length 
    }, { status: 200 });

  } catch (error) {
    // Log the error for server-side debugging
    console.error('Error fetching user elements:', error);

    // Return a generic error to the client
    // Avoid sending internal error details in production
    return NextResponse.json({ 
      error: "Failed to fetch elements" 
    }, { status: 500 });
  }
}