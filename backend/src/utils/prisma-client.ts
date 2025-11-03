/**
 * prisma-client.ts
 * 
 * @update 11/03/2025
 */
import { PrismaClient } from '@prisma/client'

export const basePrismaClient = new PrismaClient()

const prismaClient = basePrismaClient

export default prismaClient
