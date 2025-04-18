"use client";
import { CalendarPlusIcon } from "lucide-react";

import {
  EmptyState,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
} from "@/components/empty-state";
import { Spinner } from "@/components/spinner";
import { Trans } from "@/components/trans";
import { trpc } from "@/trpc/client";

import { EventList } from "./event-list";

export function PastEvents() {
  const { data } = trpc.scheduledEvents.list.useQuery({
    period: "past",
  });

  if (!data) {
    return <Spinner />;
  }

  if (data.length === 0) {
    return (
      <EmptyState className="h-96">
        <EmptyStateIcon>
          <CalendarPlusIcon />
        </EmptyStateIcon>
        <EmptyStateTitle>
          <Trans
            i18nKey="pastEventsEmptyStateTitle"
            defaults="No Past Events"
          />
        </EmptyStateTitle>
        <EmptyStateDescription>
          <Trans
            i18nKey="pastEventsEmptyStateDescription"
            defaults="When you schedule events, they will appear here."
          />
        </EmptyStateDescription>
      </EmptyState>
    );
  }

  return <EventList data={data} />;
}
