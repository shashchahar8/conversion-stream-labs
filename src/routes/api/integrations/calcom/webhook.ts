import { createFileRoute } from "@tanstack/react-router";
import { handleCalcomWebhook } from "@/lib/calcom-webhook.server";

export const Route = createFileRoute("/api/integrations/calcom/webhook")({
  server: { handlers: { POST: ({ request }) => handleCalcomWebhook(request) } },
});
