"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


export default function LabDashboard() {
  return (
    <div className="space-y-4">

      <h1 className="text-2xl font-bold">
        Lab Dashboard
      </h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

        <Card>
          <CardHeader>
            <CardTitle>New Patients</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            18
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Tests</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            11
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Processing Tests</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            6
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Reafy to Send</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            22
          </CardContent>
        </Card>

      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>

        <CardContent className="flex gap-3 flex-wrap">

          <button className="px-4 py-2 bg-blue-500 text-white rounded">
            New Patient
          </button>

          <button className="px-4 py-2 bg-green-500 text-white rounded">
            Admit Patient
          </button>

          <button className="px-4 py-2 bg-orange-500 text-white rounded">
            Discharge
          </button>

        </CardContent>
      </Card>

    </div>
  );
}