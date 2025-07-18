import { cn } from "@rallly/ui";
import { Button } from "@rallly/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@rallly/ui/card";
import { CommandDialog } from "@rallly/ui/command";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  useDialog,
} from "@rallly/ui/dialog";
import { FormField, FormMessage } from "@rallly/ui/form";
import { Label } from "@rallly/ui/label";
import { Switch } from "@rallly/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@rallly/ui/tabs";
import { Tooltip, TooltipContent, TooltipTrigger } from "@rallly/ui/tooltip";
import { CalendarIcon, GlobeIcon, InfoIcon, TableIcon } from "lucide-react";
import * as React from "react";
import { useFormContext } from "react-hook-form";

import { TimeZoneCommand } from "@/components/time-zone-picker/time-zone-select";
import { Trans } from "@/components/trans";
import { useTranslation } from "@/i18n/client";

import { getBrowserTimeZone } from "../../../utils/date-time-utils";
import type { NewEventData } from "../types";
import MonthCalendar from "./month-calendar";
import type { DateTimeOption } from "./types";
import WeekCalendar from "./week-calendar";

export type PollOptionsData = {
  navigationDate: string; // used to navigate to the right part of the calendar
  duration: number; // duration of the event in minutes
  timeZone: string;
  view: string;
  options: DateTimeOption[];
};

const PollOptionsForm = ({
  children,
  disableTimeZoneChange,
}: React.PropsWithChildren<{ disableTimeZoneChange?: boolean }>) => {
  const { t } = useTranslation();
  const form = useFormContext<NewEventData>();

  const [isTimeZoneCommandModalOpen, showTimeZoneCommandModal] =
    React.useState(false);
  const { watch, setValue, getValues, formState } = form;

  const views = React.useMemo(() => {
    const res = [
      {
        label: t("monthView"),
        value: "month",
        Component: MonthCalendar,
      },
      {
        label: t("weekView"),
        value: "week",
        Component: WeekCalendar,
      },
    ];
    return res;
  }, [t]);

  const watchView = watch("view");

  const selectedView = React.useMemo(
    () => views.find((view) => view.value === watchView) ?? views[0],
    [views, watchView],
  );

  const watchOptions = watch("options", []);
  const watchDuration = watch("duration");
  const watchTimeZone = watch("timeZone");

  const options = getValues("options");
  const datesOnly =
    options.length === 0 ||
    options.some((option) => option.type !== "timeSlot");

  const dateOrTimeRangeDialog = useDialog();

  React.useEffect(() => {
    if (watchOptions.length > 1) {
      const optionType = watchOptions[0].type;
      // all options needs to be the same type
      if (watchOptions.some((option) => option.type !== optionType)) {
        dateOrTimeRangeDialog.trigger();
      }
    }
  }, [watchOptions, dateOrTimeRangeDialog]);

  const watchNavigationDate = watch("navigationDate");
  const navigationDate = new Date(watchNavigationDate ?? Date.now());

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col justify-between gap-4 sm:flex-row">
          <div>
            <CardTitle>
              <Trans i18nKey="calendar">Calendar</Trans>
            </CardTitle>
            <CardDescription>
              <Trans i18nKey="selectPotentialDates">
                Select potential dates for your event
              </Trans>
            </CardDescription>
          </div>
          <div>
            <FormField
              control={form.control}
              name="view"
              render={({ field }) => (
                <Tabs value={field.value} onValueChange={field.onChange}>
                  <TabsList className="w-full">
                    <TabsTrigger className="grow" value="month">
                      <CalendarIcon className="mr-2 size-4" />
                      <Trans i18nKey="monthView" />
                    </TabsTrigger>
                    <TabsTrigger className="grow" value="week">
                      <TableIcon className="mr-2 size-4" />
                      <Trans i18nKey="weekView" />
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              )}
            />
          </div>
        </div>
      </CardHeader>
      <Dialog {...dateOrTimeRangeDialog.dialogProps}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <Trans i18nKey="mixedOptionsTitle" />
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm">
            <Trans i18nKey="mixedOptionsDescription" />
          </p>
          <DialogFooter>
            <Button
              onClick={() => {
                setValue(
                  "options",
                  watchOptions.filter((option) => option.type === "date"),
                );
                setValue("timeZone", "");
                dateOrTimeRangeDialog.dismiss();
              }}
            >
              <Trans i18nKey="mixedOptionsKeepDates" />
            </Button>
            <Button
              onClick={() => {
                setValue(
                  "options",
                  watchOptions.filter((option) => option.type === "timeSlot"),
                );
                if (!watchTimeZone) {
                  setValue("timeZone", getBrowserTimeZone());
                }
                dateOrTimeRangeDialog.dismiss();
              }}
              variant="primary"
            >
              <Trans i18nKey="mixedOptionsKeepTimes" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div>
        <FormField
          control={form.control}
          name="options"
          rules={{
            validate: (options) => {
              return options.length > 0
                ? true
                : t("calendarHelp", {
                    defaultValue:
                      "You can't create a poll without any options. Add at least one option to continue.",
                  });
            },
          }}
          render={({ field }) => (
            <div>
              <selectedView.Component
                options={field.value}
                date={navigationDate}
                onNavigate={(date) => {
                  setValue("navigationDate", date.toISOString());
                }}
                onChange={(options) => {
                  field.onChange(options);
                }}
                duration={watchDuration}
                onChangeDuration={(duration) => {
                  setValue("duration", duration);
                }}
              />
              {formState.errors.options ? (
                <div className="border-t bg-red-50 p-3 text-center">
                  <FormMessage />
                </div>
              ) : null}
            </div>
          )}
        />
      </div>
      {!datesOnly ? (
        <FormField
          control={form.control}
          name="timeZone"
          render={({ field }) => (
            <div
              className={cn(
                "grid items-center justify-between gap-2.5 border-t bg-gray-50 p-4 md:flex",
              )}
            >
              <div className="flex h-9 items-center gap-x-2.5 p-2">
                <Switch
                  id="timeZone"
                  disabled={disableTimeZoneChange}
                  checked={!!field.value}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      field.onChange(getBrowserTimeZone());
                    } else {
                      field.onChange("");
                    }
                  }}
                />
                <Label htmlFor="timeZone">
                  <Trans
                    i18nKey="autoTimeZone"
                    defaults="Automatic Time Zone Conversion"
                  />
                </Label>
                <Tooltip>
                  <TooltipTrigger type="button">
                    <InfoIcon className="size-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent className="w-72">
                    <Trans
                      i18nKey="autoTimeZoneHelp"
                      defaults="Enable this setting to automatically adjust event times to each participant's local time zone."
                    />
                  </TooltipContent>
                </Tooltip>
              </div>
              {field.value ? (
                <div>
                  <Button
                    disabled={disableTimeZoneChange}
                    onClick={() => {
                      showTimeZoneCommandModal(true);
                    }}
                    variant="ghost"
                  >
                    <GlobeIcon className="size-4 text-muted-foreground" />
                    {field.value}
                  </Button>
                  <CommandDialog
                    open={isTimeZoneCommandModalOpen}
                    onOpenChange={showTimeZoneCommandModal}
                  >
                    <TimeZoneCommand
                      value={field.value}
                      onSelect={(newValue) => {
                        field.onChange(newValue);
                        showTimeZoneCommandModal(false);
                      }}
                    />
                  </CommandDialog>
                </div>
              ) : null}
            </div>
          )}
        />
      ) : null}
      {children}
    </Card>
  );
};

export default React.memo(PollOptionsForm);
