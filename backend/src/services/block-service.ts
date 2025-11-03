import * as BlockRepository from "../repositories/block-repository";

export const getAllBlocks = async () => {
    return await BlockRepository.getAllBlocks();
};

export const getBlockById = async (id: string) => {
    const block = await BlockRepository.getBlockById(id);
    if (!block) throw new Error("Block not found");
    return block;
};

export const createBlock = async (data: any) => {
    return await BlockRepository.createBlock(data);
};

export const updateBlock = async (id: string, data: any) => {
    const existing = await BlockRepository.getBlockById(id);
    if (!existing) throw new Error("Block not found");
    return await BlockRepository.updateBlock(id, data);
};

export const deleteBlock = async (id: string) => {
    const existing = await BlockRepository.getBlockById(id);
    if (!existing) throw new Error("Block not found");
    return await BlockRepository.deleteBlock(id);
};
