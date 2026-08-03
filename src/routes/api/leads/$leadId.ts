import { createFileRoute } from "@tanstack/react-router";
import { handleLeadQualificationRequest } from "@/lib/lead-qualification-handler.server";

export const Route = createFileRoute("/api/leads/$leadId")({
  server: {
    handlers: {
      PATCH: ({ request, params }) => handleLeadQualificationRequest(request, params.leadId),
    },
  },
});
