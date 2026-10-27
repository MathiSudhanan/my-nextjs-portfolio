type Availability = {
  status?: "available" | "booking" | "unavailable";
  from?: string;
  targetRoles?: string[];
  note?: string;
} | null;

export type AvailabilityDisplay = {
  status: "available" | "booking" | "unavailable";
  label: string;
};

/** The availability line for the hero and contact page, or null when none is set. */
export function describeAvailability(availability: Availability | undefined): AvailabilityDisplay | null {
  if (!availability?.status) return null;
  const roles = availability.targetRoles?.filter(Boolean) ?? [];

  switch (availability.status) {
    case "available":
      return {
        status: "available",
        label: roles.length ? `Open to ${roles.slice(0, 2).join(" and ")} roles` : "Open to roles and consulting",
      };
    case "booking": {
      const from = availability.from
        ? new Date(availability.from).toLocaleDateString("en", { month: "long", year: "numeric", timeZone: "UTC" })
        : null;
      return { status: "booking", label: from ? `Booking consulting from ${from}` : "Booking consulting" };
    }
    case "unavailable":
      return { status: "unavailable", label: availability.note || "Not currently available" };
  }
}
