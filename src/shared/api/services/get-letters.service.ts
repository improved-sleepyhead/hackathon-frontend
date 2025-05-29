import { axiosWithAuth } from "@/shared/api/interceptors/interceptors";
import { ILetter } from "@/shared/api/types/letters.types";

export const letterService = {
  async getFilteredLetters(filters: {
    letter_id?: string | null;
    author?: string | null;
    sender?: string | null;
    recipient?: string | null;
    destination?: string | null;
    min_length?: number | null;
    max_length?: number | null;
    start_date?: string | null;
    end_date?: string | null;
    text_length?: number | null;
    limit?: number | null;
    offset?: number | null;
  }): Promise<ILetter[]> {
    const response = await axiosWithAuth.get<ILetter[]>("https://yamata-no-orochi.nktkln.com/letters/letters", {
      params: filters,
    });
    return response.data;
  },
};
