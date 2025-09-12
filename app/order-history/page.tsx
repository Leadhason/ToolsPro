import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import React from 'react';

export default async function OrderHistoryPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/signin');
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Order History</h1>
      <p className="text-lg text-gray-700 mb-4">Welcome, {user.email}!</p>
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Your Recent Orders</h2>
        <p className="text-gray-600">No orders found. Your shopping history will appear here once you place an order.</p>
        {/* Future: Map through orders and display them here */}
      </div>
    </div>
  );
}
