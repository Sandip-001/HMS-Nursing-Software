// lib/bed-data.ts

import { FloorGroup } from "@/types/admission-types";

export const FLOOR_DATA: FloorGroup[] = [
  {
    floor: "3rd Floor",
    wards: [
      {
        wardName: "General Ward",
        rooms: [
          { roomNo: "301", beds: [
            { id: "301-B01", roomNo: "301", bedNo: "B-01", status: "Occupied" },
            { id: "301-B02", roomNo: "301", bedNo: "B-02", status: "Available" },
            { id: "301-B03", roomNo: "301", bedNo: "B-03", status: "Occupied" },
            { id: "301-B04", roomNo: "301", bedNo: "B-04", status: "Available" },
          ]},
          { roomNo: "302", beds: [
            { id: "302-B01", roomNo: "302", bedNo: "B-01", status: "Available" },
            { id: "302-B02", roomNo: "302", bedNo: "B-02", status: "Available" },
            { id: "302-B03", roomNo: "302", bedNo: "B-03", status: "Available" },
            { id: "302-B04", roomNo: "302", bedNo: "B-04", status: "Reserved" },
          ]},
          { roomNo: "303", beds: [
            { id: "303-B01", roomNo: "303", bedNo: "B-01", status: "Occupied" },
            { id: "303-B02", roomNo: "303", bedNo: "B-02", status: "Occupied" },
            { id: "303-B03", roomNo: "303", bedNo: "B-03", status: "Available" },
            { id: "303-B04", roomNo: "303", bedNo: "B-04", status: "Available" },
          ]},
        ],
      },
      {
        wardName: "Semi Private Room",
        rooms: [
          { roomNo: "304", beds: [
            { id: "304-B01", roomNo: "304", bedNo: "B-01", status: "Available" },
            { id: "304-B02", roomNo: "304", bedNo: "B-02", status: "Available" },
          ]},
          { roomNo: "305", beds: [
            { id: "305-B01", roomNo: "305", bedNo: "B-01", status: "Available" },
            { id: "305-B02", roomNo: "305", bedNo: "B-02", status: "Reserved" },
          ]},
          { roomNo: "306", beds: [
            { id: "306-B01", roomNo: "306", bedNo: "B-01", status: "Occupied" },
            { id: "306-B02", roomNo: "306", bedNo: "B-02", status: "Available" },
          ]},
        ],
      },
    ],
  },
];

export const GENERAL_BED_RATE = 15000;