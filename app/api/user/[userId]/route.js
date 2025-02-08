import bcrypt from 'bcryptjs';
import User from "@/models/user"
import { NextResponse } from 'next/server';
import DbConnect from '@/lib/Db/DbConnect';


// GET: Fetch a specific user by ID
export async function GET(request, {params}) {
  try {
    await DbConnect();
    
    // TODO: Implement authentication and authorization check
    const user = await User.findById(params.userId).select('password');
    
    if (!user) {
      return NextResponse.json(
        { message: 'User not found' }, 
        { status: 404 }
      );
    }
    
    
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching user', error: error instanceof Error ? error.message : 'Unknown error' }, 
      { status: 500 }
    );
  }
}

// PUT: Update a specific user
export async function PUT(request, {params}) {
  try {
    await DbConnect();
    
    const body = await request.json();
    
    // TODO: Implement authentication and authorization check
    
    // Prepare update object
    const updateData = {};
    
    if (body.name) updateData.name = body.name;
    if (body.email) updateData.email = body.email;
    
    // Handle password update separately
    if (body.password) {
      const saltRounds = 10;
      updateData.passwordHash = await bcrypt.hash(body.password, saltRounds);
    }
    
    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      params.userId, 
      updateData, 
      { new: true, runValidators: true }
    ).select('-passwordHash');
    
    if (!updatedUser) {
      return NextResponse.json(
        { message: 'User not found' }, 
        { status: 404 }
      );
    }
    
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error updating user', error: error instanceof Error ? error.message : 'Unknown error' }, 
      { status: 500 }
    );
  }
}

// DELETE: Remove a specific user
export async function DELETE(request, {params}) {
  try {
    await DbConnect();
    
    // TODO: Implement authentication and authorization check
    
    const deletedUser = await User.findByIdAndDelete(params.userId);
    
    if (!deletedUser) {
      return NextResponse.json(
        { message: 'User not found' }, 
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { message: 'User deleted successfully' }, 
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Error deleting user', error: error instanceof Error ? error.message : 'Unknown error' }, 
      { status: 500 }
    );
  }
}