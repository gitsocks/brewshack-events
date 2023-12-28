import { formatDate } from "@/utils/format-date";
import { PrismaClient } from "@prisma/client";

interface IEventSummary {
    createdAt: Date;
    event: string;
    count: number;
}

interface IEventSummaryDataSet {
    label: string;
    data: number[];
    backgroundColor: string;
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

    /*
    "result": [
        {
            "createdAt": "2023-12-27T00:00:00.000Z",
            "event": "test_event",
            "count": 1
        },
        {
            "createdAt": "2023-12-28T00:00:00.000Z",
            "event": "another_event",
            "count": 1
        },
        {
            "createdAt": "2023-12-28T00:00:00.000Z",
            "event": "test_event",
            "count": 3
        }
    ],
    */

    /*
    labels: data.labels,
    datasets: [
        {
            data: data.datasets,
            backgroundColor: "purple",
        }
    ],
    */

    const labels = result.map(item => formatDate(item.createdAt)).filter((value, index, array) => array.indexOf(value) === index);
    const datasets: IEventSummaryDataSet[] = [];

    for (let index = 0; index < result.length; index++) {
        const item = result[index];
        const dataset = datasets.find(set => set.label === item.event);

        if (dataset) {
            const datasetIndex = datasets.indexOf(dataset);
            dataset.data.push(item.count);
            datasets[datasetIndex] = dataset;
        } else {
            datasets.push({
                label: item.event,
                data: [item.count],
                backgroundColor: 'purple'
            });
        }
    }

    datasets.forEach(set => {
        labels.forEach((label, index) => {
            const resultTimestamp = result.find(r => r.event === set.label && formatDate(r.createdAt) === label);

            if (!resultTimestamp) {
                set.data[index + 1] = set.data[index];
                set.data[index] = 0;
            }
        });
    });

    return { labels, datasets };
};