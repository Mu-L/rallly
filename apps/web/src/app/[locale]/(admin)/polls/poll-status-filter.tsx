import { RadioCards, RadioCardsItem } from "@rallly/ui/radio-pills";
import { Trans } from "react-i18next";

import { Spinner } from "@/components/spinner";
import { trpc } from "@/utils/trpc/client";

export type PollStatus = "live" | "paused" | "finalized";

export function PollStatusFilter({
  status = "live",
  onStatusChange,
}: {
  status?: PollStatus;
  onStatusChange?: (status: PollStatus) => void;
}) {
  const { data: countByStatus, isFetching } =
    trpc.polls.getCountByStatus.useQuery();

  if (!countByStatus) {
    return null;
  }

  return (
    <RadioCards value={status} onValueChange={onStatusChange}>
      <RadioCardsItem className="flex items-center gap-2.5" value="live">
        <Trans i18nKey="pollStatusOpen" />
        <PollCount count={countByStatus.live} />
      </RadioCardsItem>
      <RadioCardsItem className="flex items-center gap-2.5" value="paused">
        <Trans i18nKey="pollStatusPaused" />
        <PollCount count={countByStatus.paused} />
      </RadioCardsItem>
      <RadioCardsItem className="flex items-center gap-2.5" value="finalized">
        <Trans i18nKey="pollStatusFinalized" />
        <PollCount count={countByStatus.finalized} />
      </RadioCardsItem>
      {isFetching && <Spinner />}
    </RadioCards>
  );
}

function PollCount({ count }: { count?: number }) {
  return <span className="font-semibold">{count || 0}</span>;
}
