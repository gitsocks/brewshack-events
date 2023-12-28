import { ApplicationEvent } from "@prisma/client";

export type CreateApplicationEvent = Pick<ApplicationEvent, 'applicationId' | 'event'>;