import { PrismaClient } from "@prisma/client";

interface IEventSummary {
    createdAt: Date;
    event: string;
    count: number;
}

export const getApplicationEventsSummary = async (prisma: PrismaClient, applicationId: number) => {
    const result: IEventSummary[] = await prisma.$queryRaw`
        SELECT DATE("E"."createdAt") as "createdAt", "AE"."event", count("AE"."event")::integer
        FROM "events"."Event" "E"
        INNER JOIN "events"."ApplicationEvent" "AE"
        ON "E"."applicationEventId" = "AE"."id"
        WHERE "E"."applicationId" = ${applicationId}
        GROUP BY DATE("E"."createdAt"), "AE"."event"
        ORDER BY DATE("E"."createdAt") ASC
  `;

    const labels = result.map(item => item.createdAt);
    const data = result.map(item => item.count);

    return { labels, data };
};