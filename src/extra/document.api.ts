import { endpoints } from "@/lib/endpoints";
import { ApiResponse } from "@/types/common.types";
import api from "@/utils/api";

const uploadDocument = async (data: FormData): Promise<ApiResponse> => {
    return await api.post(endpoints.document.uploadDocument, data);
}

const getDocument = async (): Promise<ApiResponse> => {
    return await api.get(endpoints.document.getDocument);
}

const updateDocument = async (id: string, data: FormData): Promise<ApiResponse> => {
    return await api.patch(endpoints.document.updateDocument.replace(':id', id), data);
}

const documentApi = {
    uploadDocument,
    getDocument,
    updateDocument
}

export default documentApi;