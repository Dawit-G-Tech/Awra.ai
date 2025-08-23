import {z} from "zod";
export const meetingsInsertschema = z.object({
    name: z.string().min(1,{ message: "Name is required"}),
    agentId: z.string().min(1,{ message: "Agent is required"}),
});

export const meetingsUpdateschema = meetingsInsertschema.extend({
    id: z.string().min(1,{ message:"Id is required"}),
});