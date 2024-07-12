"use client";
import ClienteleForm from "@/components/forms/ClienteleForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  getBlogById,
  getClienteleById,
} from "@/lib/hooks/services/universalFetch";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";

const ClienteleUpdatePage = () => {
  const params = useParams();
  console.log("params", params);
  const {
    isPending,
    isError,
    data: ClienteleByIdData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["getClienteleById", params],
    queryFn: () => getClienteleById(params.clientele_Id),
    enabled: params !== null,
  });
  console.log("data", ClienteleByIdData);
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Update Clientele</CardTitle>
          <CardDescription>Manage your clientele details.</CardDescription>
        </CardHeader>
        <CardContent>
          <ClienteleForm type="update" existingData={""} />
        </CardContent>
      </Card>
    </div>
  );
};

export default ClienteleUpdatePage;
