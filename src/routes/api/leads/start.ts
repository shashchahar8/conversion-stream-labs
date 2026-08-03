import { createFileRoute } from "@tanstack/react-router";
import { handleLeadStartRequest } from "@/lib/lead-start-handler.server";

export const Route = createFileRoute("/api/leads/start")({
  server: {
    handlers: {
      POST: ({ request }) => handleLeadStartRequest(request),
    },
  },
});
