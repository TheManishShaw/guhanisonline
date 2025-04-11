"use client";
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
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getBeatsById } from "@/lib/hooks/services/universalFetch";

const BeatsUpdatePage = () => {
  const params = useParams();

  const {
    isPending,
    isError,
    data: beatsByIdData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["getBeatsById", params],
    queryFn: () => getBeatsById(params),
    enabled: params !== null,
  });

  return (
    <div>
      <Card>
        <CardHeader className="space-y-1.5">
          <CardTitle className="text-2xl font-semibold">Update Beats</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Manage your beats details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UpdateBeatForm type="edit" existingData={beatsByIdData} />
        </CardContent>
      </Card>
    </div>
  );
};

export default BeatsUpdatePage;
