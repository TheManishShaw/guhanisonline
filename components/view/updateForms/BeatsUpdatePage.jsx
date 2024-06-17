import AddBeatForm from "@/components/forms/AddBeatForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import UpdateBeatForm from "./UpdateBeatForm";

const BeatsUpdatePage = () => {
  const existingData = {
    collection_id: 9,
    title: "Yimmy Yimmy",
    description:
      "Tayc | Shreya Ghoshal | Jacqueline Fernandez | Rajat N | Rana",
    price: 210,
    cover_image_path:
      "http://guhanapi.ivdata.in/storage/uploads/jhomXEbdPn3GjfKgXOelIXmrbDktKIegtxVRSrMe.jpg",
    created_at: "2024-06-09T17:12:57.000000Z",
    updated_at: "2024-06-09T17:12:57.000000Z",
    beats: [
      {
        beat_id: 11,
        title: "Yimmy Yimmy(PagalWorld.com.sb)",
        description: null,
        price: 210,
        bpm: null,
        file_path: "",
        cover_image_path:
          "http://guhanapi.ivdata.in/storage/uploads/4bDyT2mpcVeCGpVMIPhWgU2uTxTsHFHYqrpUXlo5.jpg",
        collection_id: 9,
        created_at: "2024-06-09T17:12:57.000000Z",
        updated_at: "2024-06-09T17:12:57.000000Z",
      },
    ],
  };
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Update Beats</CardTitle>
          <CardDescription>Manage your beats details.</CardDescription>
        </CardHeader>
        <CardContent>
          <UpdateBeatForm type="edit" existingData={existingData} />
        </CardContent>
      </Card>
    </div>
  );
};

export default BeatsUpdatePage;
