import { z } from 'zod';
declare const CreateTaskDTO_base: import("@anatine/zod-nestjs").ZodDtoStatic<z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    status: z.ZodEnum<["PENDING", "IN_PROGRESS", "DONE"]>;
}, "strip", z.ZodTypeAny, {
    title: string;
    description: string;
    status: "PENDING" | "IN_PROGRESS" | "DONE";
}, {
    title: string;
    description: string;
    status: "PENDING" | "IN_PROGRESS" | "DONE";
}>>;
export declare class CreateTaskDTO extends CreateTaskDTO_base {
}
export {};
