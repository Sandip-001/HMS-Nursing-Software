"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


export default function RmoDashboard() {

  return (
    <div className="space-y-4">

      <h1 className="text-2xl font-bold">
        RMO Dashboard
      </h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

        <Card>
          <CardHeader>
            <CardTitle>IPD Patients</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            24
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total In Ward Patient</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            12
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>New Patients</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            8
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pending Reports</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            5
          </CardContent>
        </Card>

      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>

        <CardContent className="space-y-2 text-sm">

          <p>✔ Patient John Doe checked IPD</p>
          <p>✔ Prescription issued to Patient #1023</p>
          <p>✔ New appointment scheduled</p>

        </CardContent>
      </Card>

    </div>
  );
}