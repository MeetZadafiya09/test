import documentApi from "@/api/document.api";
import { QUERY_KEY } from "@/lib/constants";
import { loadingMessage } from "@/lib/messages";
import { ApiResponse } from "@/types/common.types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDocumentUpload = () => {
    return useMutation<ApiResponse, Error, FormData>({
        mutationFn: async (values) => {
            const data = toast.promise(documentApi.uploadDocument(values), {
                loading: loadingMessage.UPLOAD_DOCUMENT,
                success: (res) => res.message,
                error: (err) => err.message
            });
            return await data.unwrap();
        },
    });
};

export const useUpdateDocument = () => {
    return useMutation<ApiResponse, Error, { id: string, values: FormData }>({
        mutationFn: async ({ id, values }) => {
            const data = toast.promise(documentApi.updateDocument(id, values), {
                loading: loadingMessage.UPDATE_DOCUMENT,
                success: (res) => res.message,
                error: (err) => err.message
            });
            return await data.unwrap();
        },
    });
};

export const useGetDocument = () => {
    return useQuery({
        queryKey: [QUERY_KEY.DOCUMENT],
        queryFn: async () => {
            try {
                const response = toast.promise(documentApi.getDocument(), {
                    error: (err) => err.message
                });
                const data = await response.unwrap();
                return {
                    document: data.data
                }
            } catch {
                return {
                    document: null
                }
            }
        },
        placeholderData: {
            document: null
        }
    });
}