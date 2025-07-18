"use client";
import { cn } from "@rallly/ui";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@rallly/ui/page-tabs";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

import { Trans } from "@/components/trans";

export function EventsTabbedView({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const name = "status";
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();
  const [tab, setTab] = React.useState(searchParams.get(name) ?? "upcoming");
  const handleTabChange = React.useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      params.delete("page");

      setTab(value);

      startTransition(() => {
        const newUrl = `?${params.toString()}`;
        router.replace(newUrl, { scroll: false });
      });
    },
    [router, searchParams],
  );

  return (
    <Tabs value={tab} onValueChange={handleTabChange}>
      <TabsList>
        <TabsTrigger value="upcoming">
          <Trans i18nKey="upcoming" defaults="Upcoming" />
        </TabsTrigger>
        <TabsTrigger value="past">
          <Trans i18nKey="past" defaults="Past" />
        </TabsTrigger>
        <TabsTrigger value="canceled">
          <Trans i18nKey="canceled" defaults="Canceled" />
        </TabsTrigger>
      </TabsList>
      <TabsContent
        tabIndex={-1}
        value={tab}
        key={tab}
        className={cn(
          "transition-opacity",
          isPending ? "pointer-events-none opacity-50 delay-200" : "",
        )}
      >
        {children}
      </TabsContent>
    </Tabs>
  );
}
