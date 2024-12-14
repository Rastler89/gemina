export interface Cast {
    id: number;
    title: string;
    description: string;
}

export interface Material {
    id: number;
    name: string;
}

export interface Cast {
    id: number;
    title: string;
    description: string;
    image_cast?: string;
    image_result?: string;
    reference: string;
    cost: number;
}