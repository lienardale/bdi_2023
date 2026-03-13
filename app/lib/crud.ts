import prisma from './prisma';

export const createAuthor = async (data: { name: string }) => {
  return prisma.author.create({ data });
};

export const getAuthors = async () => {
  return prisma.author.findMany();
};

export const getAuthorById = async (id: string) => {
  return prisma.author.findUnique({ where: { id } });
};

export const updateAuthor = async (id: string, data: { name: string }) => {
  return prisma.author.update({ where: { id }, data });
};

export const deleteAuthor = async (id: string) => {
  return prisma.author.delete({ where: { id } });
};
