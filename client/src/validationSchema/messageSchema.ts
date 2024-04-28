import { z } from "zod";

const messageSchema = {
  MessageSchema: z.object({
    message: z
      .string({
        required_error: "Message is required",
        invalid_type_error: "message must be a string",
      })
      .min(2, {
        message: "message must be at least 2 characters.",
      }),
  }),
};

export default messageSchema;
