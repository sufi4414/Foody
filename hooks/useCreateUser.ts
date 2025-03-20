// src/hooks/useCreateUser.ts
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { createUser } from "@/services/apiServices";

export const useCreateUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  const createUserHandler = async (payload: any) => {
    setLoading(true);
    setError(null);
    try {
      // Retrieve the session to get the Supabase UID
      const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();
      if (sessionError || !sessionData.session) {
        throw new Error("Error retrieving session");
      }
      const uid = sessionData.session.user.id;
      console.log("Supabase UID:", uid);
      // Extend payload with UID
      const payloadWithId = { ...payload, id: uid };
      const responseData = await createUser(payloadWithId);
      setData(responseData);
      return responseData;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createUserHandler, loading, error, data };
};